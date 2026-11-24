import 'package:flutter_secure_storage/flutter_secure_storage.dart';

class SecureStorageService {
  static const _tokenKey = 'auth_token';
  static const _refreshTokenKey = 'auth_refresh_token';
  static const _userKey = 'auth_user_json';
  static const _tenantKey = 'auth_tenant_json';
  static const _rememberEmailKey = 'remember_email';

  final FlutterSecureStorage _storage = const FlutterSecureStorage();

  final Map<String, String> _memoryCache = {};

  Future<void> saveToken(String token) async {
    _memoryCache[_tokenKey] = token;
    try {
      await _storage.write(key: _tokenKey, value: token);
    } catch (_) {}
  }

  Future<String?> getToken() async {
    if (_memoryCache.containsKey(_tokenKey)) {
      return _memoryCache[_tokenKey];
    }
    try {
      final token = await _storage.read(key: _tokenKey);
      if (token != null) _memoryCache[_tokenKey] = token;
      return token;
    } catch (_) {
      return _memoryCache[_tokenKey];
    }
  }

  Future<void> saveRefreshToken(String token) async {
    _memoryCache[_refreshTokenKey] = token;
    try {
      await _storage.write(key: _refreshTokenKey, value: token);
    } catch (_) {}
  }

  Future<String?> getRefreshToken() async {
    if (_memoryCache.containsKey(_refreshTokenKey)) {
      return _memoryCache[_refreshTokenKey];
    }
    try {
      final token = await _storage.read(key: _refreshTokenKey);
      if (token != null) _memoryCache[_refreshTokenKey] = token;
      return token;
    } catch (_) {
      return _memoryCache[_refreshTokenKey];
    }
  }

  Future<void> saveUserData(String userJson) async {
    _memoryCache[_userKey] = userJson;
    try {
      await _storage.write(key: _userKey, value: userJson);
    } catch (_) {}
  }

  Future<String?> getUserData() async {
    if (_memoryCache.containsKey(_userKey)) {
      return _memoryCache[_userKey];
    }
    try {
      final data = await _storage.read(key: _userKey);
      if (data != null) _memoryCache[_userKey] = data;
      return data;
    } catch (_) {
      return _memoryCache[_userKey];
    }
  }

  Future<void> saveTenantData(String tenantJson) async {
    _memoryCache[_tenantKey] = tenantJson;
    try {
      await _storage.write(key: _tenantKey, value: tenantJson);
    } catch (_) {}
  }

  Future<String?> getTenantData() async {
    if (_memoryCache.containsKey(_tenantKey)) {
      return _memoryCache[_tenantKey];
    }
    try {
      final data = await _storage.read(key: _tenantKey);
      if (data != null) _memoryCache[_tenantKey] = data;
      return data;
    } catch (_) {
      return _memoryCache[_tenantKey];
    }
  }

  Future<void> saveRememberedEmail(String email) async {
    _memoryCache[_rememberEmailKey] = email;
    try {
      await _storage.write(key: _rememberEmailKey, value: email);
    } catch (_) {}
  }

  Future<String?> getRememberedEmail() async {
    if (_memoryCache.containsKey(_rememberEmailKey)) {
      return _memoryCache[_rememberEmailKey];
    }
    try {
      final email = await _storage.read(key: _rememberEmailKey);
      if (email != null) _memoryCache[_rememberEmailKey] = email;
      return email;
    } catch (_) {
      return _memoryCache[_rememberEmailKey];
    }
  }

  Future<void> clearRememberedEmail() async {
    _memoryCache.remove(_rememberEmailKey);
    try {
      await _storage.delete(key: _rememberEmailKey);
    } catch (_) {}
  }

  Future<void> writeString(String key, String value) async {
    _memoryCache[key] = value;
    try {
      await _storage.write(key: key, value: value);
    } catch (_) {}
  }

  Future<String?> readString(String key) async {
    if (_memoryCache.containsKey(key)) {
      return _memoryCache[key];
    }
    try {
      final val = await _storage.read(key: key);
      if (val != null) _memoryCache[key] = val;
      return val;
    } catch (_) {
      return _memoryCache[key];
    }
  }

  Future<void> deleteString(String key) async {
    _memoryCache.remove(key);
    try {
      await _storage.delete(key: key);
    } catch (_) {}
  }

  Future<void> clearSession() async {
    _memoryCache.remove(_tokenKey);
    _memoryCache.remove(_refreshTokenKey);
    _memoryCache.remove(_userKey);
    _memoryCache.remove(_tenantKey);
    try {
      await _storage.delete(key: _tokenKey);
      await _storage.delete(key: _refreshTokenKey);
      await _storage.delete(key: _userKey);
      await _storage.delete(key: _tenantKey);
    } catch (_) {}
  }
}
