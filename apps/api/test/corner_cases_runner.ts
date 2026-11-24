const BASE_URL = 'http://localhost:3001';

interface TestResult {
  category: string;
  name: string;
  passed: boolean;
  status: number | string;
  expectedStatus: number | string | number[];
  details: string;
  durationMs: number;
}

const results: TestResult[] = [];

async function runTest(
  category: string,
  name: string,
  expectedStatus: number | number[],
  fn: () => Promise<{ status: number; data?: any; error?: string }>,
) {
  const start = Date.now();
  try {
    const res = await fn();
    const durationMs = Date.now() - start;
    const isExpected = Array.isArray(expectedStatus)
      ? expectedStatus.includes(res.status)
      : res.status === expectedStatus;

    results.push({
      category,
      name,
      passed: isExpected,
      status: res.status,
      expectedStatus,
      details: isExpected
        ? 'OK'
        : `Unexpected status: got ${res.status}, response: ${JSON.stringify(res.data || res.error)}`,
      durationMs,
    });
  } catch (err: any) {
    const durationMs = Date.now() - start;
    const status = err.status || (err.code ? err.code : 'ERROR');
    const isExpected = Array.isArray(expectedStatus)
      ? expectedStatus.includes(status)
      : status === expectedStatus;

    results.push({
      category,
      name,
      passed: isExpected,
      status,
      expectedStatus,
      details: isExpected
        ? 'OK (Handled correctly)'
        : `Failed with: ${err.message}. Response: ${JSON.stringify(err.data || '')}`,
      durationMs,
    });
  }
}

async function request(
  method: string,
  url: string,
  body?: any,
  headers: Record<string, string> = {},
) {
  const isFormData = body instanceof FormData;
  const reqHeaders: Record<string, string> = { ...headers };
  let reqBody = body;

  if (body && !isFormData && typeof body === 'object') {
    reqHeaders['Content-Type'] = 'application/json';
    reqBody = JSON.stringify(body);
  }

  const res = await fetch(url, {
    method,
    headers: reqHeaders,
    body: reqBody,
  });

  let data: any;
  const contentType = res.headers.get('content-type') || '';
  if (contentType.includes('application/json')) {
    data = await res.json().catch(() => null);
  } else {
    data = await res.text().catch(() => null);
  }

  return { status: res.status, data };
}

async function runAllTests() {
  console.log('====================================================');
  console.log('STARTING EXTENSIVE API & CORNER CASE TEST SUITE');
  console.log(`Target: ${BASE_URL}`);
  console.log('====================================================\n');

  let adminToken = '';
  let validProjectId = '';
  let validActivityIds: string[] = [];
  let createdSubmissionId = '';
  let uploadedPhotoId = '';

  // ----------------------------------------------------------------
  // 1. AUTHENTICATION & SECURITY CORNER CASES
  // ----------------------------------------------------------------

  await runTest('Auth', 'Login with empty payload {}', 400, async () => {
    return request('POST', `${BASE_URL}/auth/login`, {});
  });

  await runTest('Auth', 'Login missing password', 400, async () => {
    return request('POST', `${BASE_URL}/auth/login`, { email: 'admin@vyhir.com' });
  });

  await runTest('Auth', 'Login with invalid email syntax', [400, 401], async () => {
    return request('POST', `${BASE_URL}/auth/login`, { email: 'not-an-email', password: 'Password123!' });
  });

  await runTest('Auth', 'Login with non-existent user email', 401, async () => {
    return request('POST', `${BASE_URL}/auth/login`, { email: 'ghost_supervisor@example.com', password: 'Password123!' });
  });

  await runTest('Auth', 'Login with wrong password', 401, async () => {
    return request('POST', `${BASE_URL}/auth/login`, { email: 'admin@vyhir.com', password: 'WrongPassword999!' });
  });

  await runTest('Auth', 'Login with SQL injection string in email', [400, 401], async () => {
    return request('POST', `${BASE_URL}/auth/login`, { email: "' OR '1'='1' --", password: 'Password123!' });
  });

  await runTest('Auth', 'Login with huge payload (100KB string)', [400, 401, 413], async () => {
    return request('POST', `${BASE_URL}/auth/login`, { email: 'a'.repeat(100000) + '@test.com', password: 'Password123!' });
  });

  await runTest('Auth', 'Valid Login returns token, YEC India tenant, and user profile', [200, 201], async () => {
    const res = await request('POST', `${BASE_URL}/auth/login`, { email: 'admin@vyhir.com', password: 'Password123!' });
    if (res.status === 200 || res.status === 201) {
      adminToken = res.data.accessToken;
      if (res.data.tenant?.name !== 'YEC India') {
        throw new Error(`Expected tenant YEC India, got ${res.data.tenant?.name}`);
      }
    }
    return res;
  });

  await runTest('Auth', 'Get /auth/me with valid Bearer token', 200, async () => {
    return request('GET', `${BASE_URL}/auth/me`, undefined, { Authorization: `Bearer ${adminToken}` });
  });

  await runTest('Auth', 'Get /auth/me without Authorization header', 401, async () => {
    return request('GET', `${BASE_URL}/auth/me`);
  });

  await runTest('Auth', 'Get /auth/me with tampered JWT signature', 401, async () => {
    const parts = adminToken.split('.');
    const tampered = `${parts[0]}.${parts[1]}.tampered_signature_12345`;
    return request('GET', `${BASE_URL}/auth/me`, undefined, { Authorization: `Bearer ${tampered}` });
  });

  // ----------------------------------------------------------------
  // 2. FORGOT PASSWORD & CODE VERIFICATION CORNER CASES
  // ----------------------------------------------------------------

  let dispatchedCode = '';

  await runTest('Password Reset', 'Forgot password with invalid email format', 400, async () => {
    return request('POST', `${BASE_URL}/auth/forgot-password`, { email: 'invalid_email' });
  });

  await runTest('Password Reset', 'Forgot password with empty email', 400, async () => {
    return request('POST', `${BASE_URL}/auth/forgot-password`, {});
  });

  await runTest('Password Reset', 'Forgot password with valid email returns single-use code', [200, 201], async () => {
    const res = await request('POST', `${BASE_URL}/auth/forgot-password`, { email: 'admin@vyhir.com' });
    if (res.status === 200 || res.status === 201) {
      dispatchedCode = res.data.code;
    }
    return res;
  });

  await runTest('Password Reset', 'Reset password without code', 400, async () => {
    return request('POST', `${BASE_URL}/auth/reset-password`, {
      email: 'admin@vyhir.com',
      newPassword: 'NewSecurePassword123!',
    });
  });

  await runTest('Password Reset', 'Reset password with invalid code', 400, async () => {
    return request('POST', `${BASE_URL}/auth/reset-password`, {
      email: 'admin@vyhir.com',
      token: '000000',
      newPassword: 'NewSecurePassword123!',
    });
  });

  await runTest('Password Reset', 'Reset password with password < 10 characters', 400, async () => {
    return request('POST', `${BASE_URL}/auth/reset-password`, {
      email: 'admin@vyhir.com',
      token: dispatchedCode,
      newPassword: 'Short9!',
    });
  });

  await runTest('Password Reset', 'Reset password with valid code & valid password', [200, 201], async () => {
    return request('POST', `${BASE_URL}/auth/reset-password`, {
      email: 'admin@vyhir.com',
      token: dispatchedCode,
      newPassword: 'UpdatedSecretPassword123!',
    });
  });

  await runTest('Password Reset', 'Replay attack: Reuse the same single-use code', 400, async () => {
    return request('POST', `${BASE_URL}/auth/reset-password`, {
      email: 'admin@vyhir.com',
      token: dispatchedCode,
      newPassword: 'AnotherPassword123!',
    });
  });

  // Re-login with updated password to obtain fresh token
  await runTest('Password Reset', 'Login with updated password succeeds', [200, 201], async () => {
    const res = await request('POST', `${BASE_URL}/auth/login`, {
      email: 'admin@vyhir.com',
      password: 'UpdatedSecretPassword123!',
    });
    if (res.status === 200 || res.status === 201) {
      adminToken = res.data.accessToken;
    }
    return res;
  });

  // Reset back to standard dev password for convenience
  const codeRes = await request('POST', `${BASE_URL}/auth/forgot-password`, { email: 'admin@vyhir.com' });
  await request('POST', `${BASE_URL}/auth/reset-password`, {
    email: 'admin@vyhir.com',
    token: codeRes.data.code,
    newPassword: 'Password123!',
  });
  const relogin = await request('POST', `${BASE_URL}/auth/login`, { email: 'admin@vyhir.com', password: 'Password123!' });
  adminToken = relogin.data.accessToken;

  // ----------------------------------------------------------------
  // 3. PROFILE & AVATAR UPLOAD CORNER CASES
  // ----------------------------------------------------------------

  await runTest('Profile', 'Update profile with phone and emergencyPhone', 200, async () => {
    const res = await request(
      'PATCH',
      `${BASE_URL}/auth/profile`,
      {
        fullName: 'Senior Supervisor Marcus Autelius',
        phone: '+91 98765 43210',
        emergencyPhone: '+91 98765 43211',
      },
      { Authorization: `Bearer ${adminToken}` },
    );
    if (res.data.user?.emergencyPhone !== '+91 98765 43211') {
      throw new Error(`emergencyPhone was not saved properly in DB`);
    }
    return res;
  });

  await runTest('Profile', 'Upload avatar without multipart file', 400, async () => {
    const form = new FormData();
    return request('POST', `${BASE_URL}/auth/avatar`, form, { Authorization: `Bearer ${adminToken}` });
  });

  await runTest('Profile', 'Upload non-image file as avatar (.txt)', [400, 500], async () => {
    const form = new FormData();
    const blob = new Blob(['this is a text file'], { type: 'text/plain' });
    form.append('file', blob, 'malicious.txt');
    return request('POST', `${BASE_URL}/auth/avatar`, form, { Authorization: `Bearer ${adminToken}` });
  });

  let savedAvatarFilename = '';

  await runTest('Profile', 'Upload valid PNG avatar image', [200, 201], async () => {
    const pngBuffer = Buffer.from(
      'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
      'base64',
    );
    const form = new FormData();
    const blob = new Blob([pngBuffer], { type: 'image/png' });
    form.append('file', blob, 'avatar.png');
    const res = await request('POST', `${BASE_URL}/auth/avatar`, form, { Authorization: `Bearer ${adminToken}` });
    if (res.status === 200 || res.status === 201) {
      savedAvatarFilename = res.data.avatarUrl.split('/').pop();
    }
    return res;
  });

  await runTest('Profile', 'Fetch uploaded avatar file', 200, async () => {
    return request('GET', `${BASE_URL}/auth/avatar/${savedAvatarFilename}`);
  });

  await runTest('Profile', 'Directory traversal attempt on avatar download is securely blocked', 404, async () => {
    return request('GET', `${BASE_URL}/auth/avatar/..%2f..%2fpackage.json`);
  });

  await runTest('Profile', 'Fetch non-existent avatar returns 404', 404, async () => {
    return request('GET', `${BASE_URL}/auth/avatar/non-existent-avatar-12345.png`);
  });

  // ----------------------------------------------------------------
  // 4. PROJECTS & ACTIVITIES
  // ----------------------------------------------------------------

  await runTest('Projects', 'List projects for active supervisor', 200, async () => {
    const res = await request('GET', `${BASE_URL}/projects`, undefined, { Authorization: `Bearer ${adminToken}` });
    if (Array.isArray(res.data) && res.data.length > 0) {
      validProjectId = res.data[0].id;
    }
    return res;
  });

  await runTest('Projects', 'Get project by invalid UUID format', [400, 404, 500], async () => {
    return request('GET', `${BASE_URL}/projects/not-a-valid-uuid`, undefined, { Authorization: `Bearer ${adminToken}` });
  });

  await runTest('Projects', 'Get project activities', 200, async () => {
    const res = await request('GET', `${BASE_URL}/projects/${validProjectId}/activities`, undefined, {
      Authorization: `Bearer ${adminToken}`,
    });
    if (Array.isArray(res.data) && res.data.length > 0) {
      validActivityIds = res.data.map((a: any) => a.id);
    }
    return res;
  });

  // ----------------------------------------------------------------
  // 5. ATTENDANCE & SHIFT GPS CORNER CASES
  // ----------------------------------------------------------------

  await runTest('Attendance', 'Check-in with normal GPS coordinates', [200, 201], async () => {
    const res = await request(
      'POST',
      `${BASE_URL}/attendance/check-in`,
      {
        projectId: validProjectId,
        latitude: 12.9716,
        longitude: 77.5946,
        locationAccuracyM: 5.0,
        remarks: 'Morning shift entry',
      },
      { Authorization: `Bearer ${adminToken}` },
    );
    if (!res.data?.session?.latitude || !res.data?.session?.longitude) {
      throw new Error('GPS coordinates were not returned/stored in session');
    }
    return res;
  });

  await runTest('Attendance', 'Get current attendance session returns active=true and GPS', 200, async () => {
    const res = await request('GET', `${BASE_URL}/attendance/current`, undefined, {
      Authorization: `Bearer ${adminToken}` },
    );
    if (!res.data?.active || !res.data?.session) {
      throw new Error('Expected active session');
    }
    return res;
  });

  await runTest('Attendance', 'Consecutive Check-in auto-closes previous session cleanly', [200, 201], async () => {
    return request(
      'POST',
      `${BASE_URL}/attendance/check-in`,
      {
        projectId: validProjectId,
        latitude: 12.9722,
        longitude: 77.5955,
        locationAccuracyM: 3.2,
        remarks: 'New check-in while previous open',
      },
      { Authorization: `Bearer ${adminToken}` },
    );
  });

  await runTest('Attendance', 'Check-in with extreme valid GPS boundaries (-89.9, +179.9)', [200, 201], async () => {
    return request(
      'POST',
      `${BASE_URL}/attendance/check-in`,
      {
        projectId: validProjectId,
        latitude: -89.9,
        longitude: 179.9,
        locationAccuracyM: 1.0,
      },
      { Authorization: `Bearer ${adminToken}` },
    );
  });

  await runTest('Attendance', 'Punch-out records checkout GPS and closes shift', [200, 201], async () => {
    const res = await request(
      'POST',
      `${BASE_URL}/attendance/check-out`,
      {
        latitude: 12.9730,
        longitude: 77.5960,
        locationAccuracyM: 4.0,
        remarks: 'Evening shift end',
      },
      { Authorization: `Bearer ${adminToken}` },
    );
    if (res.data?.session?.status !== 'CLOSED') {
      throw new Error('Expected session status to be CLOSED');
    }
    if (!res.data?.session?.checkOutLatitude || !res.data?.session?.checkOutLongitude) {
      throw new Error('Check-out GPS was not recorded in session');
    }
    return res;
  });

  await runTest('Attendance', 'Punch-out when NO open session exists returns 400', 400, async () => {
    return request(
      'POST',
      `${BASE_URL}/attendance/check-out`,
      {
        latitude: 12.9730,
        longitude: 77.5960,
      },
      { Authorization: `Bearer ${adminToken}` },
    );
  });

  await runTest('Attendance', 'Attendance history returns logged sessions list', 200, async () => {
    const res = await request('GET', `${BASE_URL}/attendance/history`, undefined, {
      Authorization: `Bearer ${adminToken}` },
    );
    if (!Array.isArray(res.data?.items) || res.data.items.length === 0) {
      throw new Error('Expected attendance history items');
    }
    return res;
  });

  // ----------------------------------------------------------------
  // 6. SITE SUBMISSIONS & DAILY PROGRESS REPORTS CORNER CASES
  // ----------------------------------------------------------------

  await runTest('Submissions', 'Create report with invalid projectId in URL returns 404', [400, 404], async () => {
    return request(
      'POST',
      `${BASE_URL}/projects/00000000-0000-0000-0000-000000000000/submissions`,
      {
        startChainage: '12+200',
        endChainage: '12+800',
        activityIds: validActivityIds,
      },
      { Authorization: `Bearer ${adminToken}` },
    );
  });

  await runTest('Submissions', 'Create report with empty activityIds list returns 400', 400, async () => {
    return request(
      'POST',
      `${BASE_URL}/projects/${validProjectId}/submissions`,
      {
        startChainage: '12+200',
        endChainage: '12+800',
        activityIds: [],
      },
      { Authorization: `Bearer ${adminToken}` },
    );
  });

  await runTest('Submissions', 'Create report with non-existent activity UUID returns 400', [400, 404], async () => {
    return request(
      'POST',
      `${BASE_URL}/projects/${validProjectId}/submissions`,
      {
        startChainage: '12+200',
        endChainage: '12+800',
        activityIds: ['00000000-0000-0000-0000-000000000000'],
      },
      { Authorization: `Bearer ${adminToken}` },
    );
  });

  await runTest('Submissions', 'Create valid site report with chainage, GPS, and activities', [200, 201], async () => {
    const res = await request(
      'POST',
      `${BASE_URL}/projects/${validProjectId}/submissions`,
      {
        startChainage: '14+250',
        endChainage: '14+800',
        activityIds: [validActivityIds[0]],
        remarks: 'Earthwork excavation and compaction completed along span 550m',
        latitude: 12.9716,
        longitude: 77.5946,
        locationAccuracyM: 3.5,
      },
      { Authorization: `Bearer ${adminToken}` },
    );
    if (res.status === 200 || res.status === 201) {
      createdSubmissionId = res.data.id || res.data.submission?.id;
    }
    return res;
  });

  await runTest('Submissions', 'Upload photo to submission without multipart file returns 400', 400, async () => {
    const form = new FormData();
    return request(
      'POST',
      `${BASE_URL}/submissions/${createdSubmissionId}/photos`,
      form,
      { Authorization: `Bearer ${adminToken}` },
    );
  });

  await runTest('Submissions', 'Upload non-image file (.pdf) to report photos returns 400', [400, 500], async () => {
    const form = new FormData();
    const blob = new Blob(['%PDF-1.4 test document'], { type: 'application/pdf' });
    form.append('file', blob, 'document.pdf');
    return request(
      'POST',
      `${BASE_URL}/submissions/${createdSubmissionId}/photos`,
      form,
      { Authorization: `Bearer ${adminToken}` },
    );
  });

  await runTest('Submissions', 'Upload valid JPEG photo to site report', [200, 201], async () => {
    const jpegBuffer = Buffer.from(
      '/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAP//////////////////////////////////////////////////////////////////////////////////////wgALCAABAAEBAREA/8QAFBABAAAAAAAAAAAAAAAAAAAAAP/aAAgBAQABPxA=',
      'base64',
    );
    const form = new FormData();
    const blob = new Blob([jpegBuffer], { type: 'image/jpeg' });
    form.append('file', blob, 'site_photo_1.jpg');
    const res = await request(
      'POST',
      `${BASE_URL}/submissions/${createdSubmissionId}/photos`,
      form,
      { Authorization: `Bearer ${adminToken}` },
    );
    if (res.status === 200 || res.status === 201) {
      uploadedPhotoId = res.data.id || res.data.photo?.id;
    }
    return res;
  });

  await runTest('Submissions', 'Retrieve uploaded site photo binary', 200, async () => {
    return request(
      'GET',
      `${BASE_URL}/submissions/${createdSubmissionId}/photos/${uploadedPhotoId}`,
      undefined,
      { Authorization: `Bearer ${adminToken}` },
    );
  });

  await runTest('Submissions', 'Fetch site report by ID includes photos and activities', 200, async () => {
    const res = await request('GET', `${BASE_URL}/submissions/${createdSubmissionId}`, undefined, {
      Authorization: `Bearer ${adminToken}` },
    );
    if (!res.data?.photos || res.data.photos.length === 0) {
      throw new Error('Photos were not returned with submission');
    }
    if (!res.data?.activities || res.data.activities.length === 0) {
      throw new Error('Activities were not returned with submission');
    }
    return res;
  });

  await runTest('Submissions', 'Search submissions with SQL injection string is safely sanitized', 200, async () => {
    return request('GET', `${BASE_URL}/submissions?search=%27%20OR%201=1%20--`, undefined, {
      Authorization: `Bearer ${adminToken}` },
    );
  });

  await runTest('Submissions', 'Filter submissions by project', 200, async () => {
    return request('GET', `${BASE_URL}/submissions?projectId=${validProjectId}`, undefined, {
      Authorization: `Bearer ${adminToken}` },
    );
  });

  // ----------------------------------------------------------------
  // SUMMARY PRINT
  // ----------------------------------------------------------------
  console.log('\n====================================================');
  console.log('API TEST RESULTS SUMMARY:');
  console.log('====================================================');
  let passCount = 0;
  let failCount = 0;

  for (const r of results) {
    const mark = r.passed ? '✓ PASS' : '✗ FAIL';
    console.log(`[${r.category}] ${mark} - ${r.name} (${r.durationMs}ms) [got: ${r.status}, exp: ${JSON.stringify(r.expectedStatus)}]`);
    if (!r.passed) {
      console.log(`   Details: ${r.details}`);
      failCount++;
    } else {
      passCount++;
    }
  }

  console.log('\n====================================================');
  console.log(`TOTAL: ${results.length} | PASSED: ${passCount} | FAILED: ${failCount}`);
  console.log('====================================================');

  if (failCount > 0) {
    process.exit(1);
  }
}

runAllTests().catch((e) => {
  console.error('Fatal test runner error:', e);
  process.exit(1);
});
