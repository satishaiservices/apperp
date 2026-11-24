#!/usr/bin/env python3
"""
CivilERP Site Submissions API smoke/security test.
Uses only Python's standard library. Requires the API to be running.

Usage:
  python3 test_site_submissions_api.py

Optional environment variables:
  API_BASE_URL, PROJECT_ID, ACTIVITY_ID, PHOTO_PATH, JWT_TOKEN
  OTHER_SUPERVISOR_JWT  (optional: test cross-supervisor upload denial)
  NO_PERMISSION_JWT     (optional: test permission denial)
"""

import getpass
import json
import mimetypes
import os
import sys
import uuid
from pathlib import Path
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen

BASE_URL = os.getenv("API_BASE_URL", "http://localhost:3002").rstrip("/")
PROJECT_ID = os.getenv("PROJECT_ID", "f94e9fcb-bfa0-4d94-b966-0ead0648b17b")
ACTIVITY_ID = os.getenv("ACTIVITY_ID", "856a5bc1-d453-47f3-bb7a-1c5ed43fe47d")
PHOTO_PATH = os.getenv(
    "PHOTO_PATH",
    "/home/embdev/Pictures/Screenshots/Screenshot From 2026-11-12 17-38-52.png",
)

passed = 0
failed = 0
skipped = 0


def request(method, path, token=None, body=None, headers=None, timeout=30):
    hdrs = dict(headers or {})
    if token:
        hdrs["Authorization"] = f"Bearer {token}"
    data = body
    if isinstance(body, (dict, list)):
        data = json.dumps(body).encode()
        hdrs["Content-Type"] = "application/json"
    req = Request(BASE_URL + path, data=data, headers=hdrs, method=method)
    try:
        with urlopen(req, timeout=timeout) as response:
            return response.status, response.headers, response.read()
    except HTTPError as exc:
        return exc.code, exc.headers, exc.read()
    except URLError as exc:
        raise RuntimeError(f"Cannot reach {BASE_URL}: {exc}") from exc


def show_body(raw):
    try:
        return json.dumps(json.loads(raw.decode()), indent=2)[:1800]
    except Exception:
        return raw[:500].decode(errors="replace")


def check(name, expected, actual, detail=""):
    global passed, failed
    ok = actual in expected
    if ok:
        passed += 1
        print(f"[PASS] {name}: HTTP {actual}")
    else:
        failed += 1
        print(f"[FAIL] {name}: expected {sorted(expected)}, got HTTP {actual}")
        if detail:
            print(detail[:1800])


def skip(name, reason):
    global skipped
    skipped += 1
    print(f"[SKIP] {name}: {reason}")


def json_request(method, path, token, payload=None):
    status, headers, raw = request(method, path, token, payload)
    try:
        parsed = json.loads(raw.decode()) if raw else {}
    except Exception:
        parsed = {}
    return status, parsed, raw


def multipart_upload(path, token, file_path, content_override=None, declared_mime=None):
    boundary = "----CivilERP" + uuid.uuid4().hex
    filename = Path(file_path).name if file_path else "fake.png"
    mime = declared_mime or (mimetypes.guess_type(filename)[0] or "application/octet-stream")
    content = content_override if content_override is not None else Path(file_path).read_bytes()
    body = (
        f"--{boundary}\r\n"
        f'Content-Disposition: form-data; name="file"; filename="{filename}"\r\n'
        f"Content-Type: {mime}\r\n\r\n"
    ).encode() + content + f"\r\n--{boundary}--\r\n".encode()
    return request(
        "POST",
        path,
        token,
        body,
        {"Content-Type": f"multipart/form-data; boundary={boundary}"},
    )


def main():
    global passed, failed
    print("CivilERP Site Submissions API test")
    print(f"API: {BASE_URL}")
    print(f"Project: {PROJECT_ID}")
    print(f"Activity: {ACTIVITY_ID}")
    print("-" * 58)

    token = os.getenv("JWT_TOKEN") or getpass.getpass("Access JWT (input hidden): ").strip()
    if not token:
        print("A JWT is required.")
        sys.exit(2)

    # 1. Create a fresh test submission.
    payload = {
        "activityIds": [ACTIVITY_ID],
        "startChainage": "12+500",
        "endChainage": "13+200",
        "latitude": 28.4595,
        "longitude": 77.0266,
        "locationAccuracyM": 12.5,
        "locationCapturedAt": "2026-11-12T18:00:00.000Z",
        "remarks": "Automated API verification - safe to delete after testing",
    }
    status, created, raw = json_request(
        "POST", f"/projects/{PROJECT_ID}/submissions", token, payload
    )
    check("Create site submission", {200, 201}, status, show_body(raw))
    submission_id = created.get("id") if isinstance(created, dict) else None
    if status not in (200, 201) or not submission_id:
        print("\nCannot continue without a created submission.")
        print("Response:", show_body(raw))
        sys.exit(1)
    print(f"       Submission ID: {submission_id}")

    # 2. List project submissions.
    status, parsed, raw = json_request(
        "GET", f"/projects/{PROJECT_ID}/submissions", token
    )
    check("List project submissions", {200}, status, show_body(raw))
    if status == 200:
        rows = parsed if isinstance(parsed, list) else parsed.get("data", [])
        found = any(
            isinstance(row, dict) and row.get("id") == submission_id
            for row in rows
        ) if isinstance(rows, list) else False
        check("New submission appears in list", {True}, found)

    # 3. Read submission details.
    status, detail, raw = json_request(
        "GET", f"/submissions/{submission_id}", token
    )
    check("Get submission details", {200}, status, show_body(raw))
    if status == 200:
        check("Detail includes correct submission ID", {True},
              isinstance(detail, dict) and detail.get("id") == submission_id)
        check("Detail includes activity association", {True},
              isinstance(detail, dict) and bool(detail.get("activities")))

    # 4. Upload a real image.
    photo_id = None
    photo_path = Path(PHOTO_PATH).expanduser()
    if photo_path.is_file():
        status, headers, raw = multipart_upload(
            f"/submissions/{submission_id}/photos", token, str(photo_path)
        )
        check("Upload real photo", {200, 201}, status, show_body(raw))
        try:
            uploaded = json.loads(raw.decode())
            photo_id = uploaded.get("id") or uploaded.get("photo", {}).get("id")
        except Exception:
            pass
        if not photo_id:
            # In some APIs the upload response may wrap its result differently.
            status, detail, raw = json_request(
                "GET", f"/submissions/{submission_id}", token
            )
            if status == 200:
                photos = detail.get("photos", [])
                if photos:
                    photo_id = photos[-1].get("id")
        if photo_id:
            print(f"       Photo ID: {photo_id}")
            # 5. Download image and validate file signature.
            status, headers, raw = request(
                "GET",
                f"/submissions/{submission_id}/photos/{photo_id}",
                token,
            )
            valid_png = raw.startswith(b"\x89PNG\r\n\x1a\n")
            valid_jpeg = raw.startswith(b"\xff\xd8\xff")
            valid_webp = raw[:4] == b"RIFF" and raw[8:12] == b"WEBP"
            check("Download photo", {200}, status)
            check("Downloaded content has image signature", {True},
                  valid_png or valid_jpeg or valid_webp)
            if status == 200:
                out = Path("/tmp/civil-erp-api-photo-test")
                out.write_bytes(raw)
                print(f"       Download saved to: {out}")
        else:
            skip("Download photo", "Could not extract photo ID from upload response/detail")
    else:
        skip("Upload real photo", f"Photo file not found: {photo_path}")
        skip("Download photo", "No photo was uploaded")

    # 6. Invalid JWT should be rejected.
    status, _, raw = json_request(
        "GET", f"/submissions/{submission_id}", "invalid.jwt.token"
    )
    check("Reject invalid JWT", {401, 403}, status, show_body(raw))

    # 7. Unknown submission should return 404.
    missing_id = str(uuid.uuid4())
    status, _, raw = json_request(
        "GET", f"/submissions/{missing_id}", token
    )
    check("Unknown submission returns 404", {404}, status, show_body(raw))

    # 8. Fake PNG: MIME says image/png, bytes are plain text.
    status, headers, raw = multipart_upload(
        f"/submissions/{submission_id}/photos",
        token,
        None,
        content_override=b"this is not a real PNG image",
        declared_mime="image/png",
    )
    check("Reject fake image with PNG MIME", {400, 415}, status, show_body(raw))

    # Optional: verify cross-supervisor upload denial.
    other_token = os.getenv("OTHER_SUPERVISOR_JWT")
    if other_token and photo_path.is_file():
        status, headers, raw = multipart_upload(
            f"/submissions/{submission_id}/photos",
            other_token,
            str(photo_path),
        )
        check("Block another supervisor uploading to this submission",
              {403}, status, show_body(raw))
    else:
        skip("Cross-supervisor upload restriction",
             "Set OTHER_SUPERVISOR_JWT to a different supervisor's token")

    # Optional: permission guard test.
    no_permission_token = os.getenv("NO_PERMISSION_JWT")
    if no_permission_token:
        status, _, raw = json_request(
            "GET", f"/submissions/{submission_id}", no_permission_token
        )
        check("Permission guard rejects user without submissions.view",
              {403}, status, show_body(raw))
    else:
        skip("Permission guard", "Set NO_PERMISSION_JWT to a valid token lacking submissions.view")

    print("-" * 58)
    print(f"Results: {passed} passed, {failed} failed, {skipped} skipped")
    print(f"Created test submission: {submission_id}")
    print("This script does not delete test records.")
    sys.exit(1 if failed else 0)


if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\nInterrupted.")
        sys.exit(130)
    except Exception as exc:
        print(f"\nERROR: {exc}", file=sys.stderr)
        sys.exit(2)
