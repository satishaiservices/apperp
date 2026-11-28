import 'package:flutter/foundation.dart';

class ApiConfig {
  static const String _compileTimeApiUrl = String.fromEnvironment('API_URL');
  static String _customBaseUrl = '';

  static void setCustomBaseUrl(String url) {
    _customBaseUrl = url.trim().replaceAll(RegExp(r'/+$'), '');
  }

  static String get baseUrl {
    if (_customBaseUrl.isNotEmpty) {
      return _customBaseUrl;
    }

    if (_compileTimeApiUrl.isNotEmpty) {
      return _compileTimeApiUrl.trim().replaceAll(RegExp(r'/+$'), '');
    }

    if (kIsWeb) {
      return 'http://localhost:3001';
    }

    // Default for Android (via adb reverse tcp:3001 tcp:3001), Linux desktop & iOS simulator
    return 'http://127.0.0.1:3001';
  }

  // Endpoints
  static String get login => '$baseUrl/auth/login';
  static String get forgotPassword => '$baseUrl/auth/forgot-password';
  static String get resetPassword => '$baseUrl/auth/reset-password';
  static String get me => '$baseUrl/auth/me';
  static String get updateProfile => '$baseUrl/auth/profile';

  static String get projects => '$baseUrl/projects';
  static String projectActivities(String projectId) =>
      '$baseUrl/projects/$projectId/activities';

  static String projectSubmissions(String projectId) =>
      '$baseUrl/projects/$projectId/submissions';
  static String get allSubmissions => '$baseUrl/submissions';
  static String submissionDetail(String id) => '$baseUrl/submissions/$id';
  static String submissionPhotos(String id) => '$baseUrl/submissions/$id/photos';
  /// Photo URL. The token is sent in the Authorization header by
  /// [AuthenticatedImage] (via ApiClient), never in the URL, where it would be
  /// written to proxy access logs. The [token] parameter is kept for call-site
  /// compatibility and ignored.
  static String submissionPhotoFile(String id, String photoId, [String? token]) =>
      '$baseUrl/submissions/$id/photos/$photoId';

  static String get attendanceCheckIn => '$baseUrl/attendance/check-in';
  static String get attendanceCheckOut => '$baseUrl/attendance/check-out';
  static String get attendanceCurrent => '$baseUrl/attendance/current';
  static String get attendanceHistory => '$baseUrl/attendance/history';
}
