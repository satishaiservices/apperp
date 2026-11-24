import 'dart:convert';
import 'package:dio/dio.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:civil_erp/core/config/api_config.dart';
import 'package:civil_erp/core/network/api_client.dart';
import 'package:civil_erp/core/storage/secure_storage_service.dart';

final secureStorageProvider = Provider<SecureStorageService>((ref) {
  return SecureStorageService();
});

final apiClientProvider = Provider<ApiClient>((ref) {
  final storage = ref.watch(secureStorageProvider);
  return ApiClient(storage: storage);
});

class UserModel {
  final String id;
  final String fullName;
  final String? email;
  final String? username;
  final String? phone;
  final String? emergencyPhone;
  final String? avatarUrl;
  final String? avatarPath;

  UserModel({
    required this.id,
    required this.fullName,
    this.email,
    this.username,
    this.phone,
    this.emergencyPhone,
    this.avatarUrl,
    this.avatarPath,
  });

  // Getter for backward compatibility
  String? get emergencyContact => emergencyPhone;

  UserModel copyWith({
    String? id,
    String? fullName,
    String? email,
    String? username,
    String? phone,
    String? emergencyPhone,
    String? emergencyContact,
    String? avatarUrl,
    String? avatarPath,
  }) {
    return UserModel(
      id: id ?? this.id,
      fullName: fullName ?? this.fullName,
      email: email ?? this.email,
      username: username ?? this.username,
      phone: phone ?? this.phone,
      emergencyPhone: emergencyPhone ?? emergencyContact ?? this.emergencyPhone,
      avatarUrl: avatarUrl ?? this.avatarUrl,
      avatarPath: avatarPath ?? this.avatarPath,
    );
  }

  factory UserModel.fromJson(Map<String, dynamic> json) => UserModel(
        id: json['id'] as String,
        fullName: (json['fullName'] ?? json['full_name'] ?? '') as String,
        email: json['email'] as String?,
        username: json['username'] as String?,
        phone: json['phone'] as String?,
        emergencyPhone: (json['emergencyPhone'] ??
            json['emergency_phone'] ??
            json['emergencyContact']) as String?,
        avatarUrl: (json['avatarUrl'] ?? json['avatar_url']) as String?,
        avatarPath: json['avatarPath'] as String?,
      );

  Map<String, dynamic> toJson() => {
        'id': id,
        'fullName': fullName,
        'email': email,
        'username': username,
        'phone': phone,
        'emergencyPhone': emergencyPhone,
        'avatarUrl': avatarUrl,
        'avatarPath': avatarPath,
      };
}

class TenantModel {
  final String id;
  final String name;
  final String slug;

  TenantModel({
    required this.id,
    required this.name,
    required this.slug,
  });

  factory TenantModel.fromJson(Map<String, dynamic> json) => TenantModel(
        id: json['id'] as String,
        name: (json['name'] ?? '') as String,
        slug: (json['slug'] ?? '') as String,
      );

  Map<String, dynamic> toJson() => {
        'id': id,
        'name': name,
        'slug': slug,
      };
}

class AuthState {
  final bool isAuthenticated;
  final bool isLoading;
  final String? errorMessage;
  final UserModel? user;
  final TenantModel? tenant;
  final List<String> roles;
  final String? token;

  const AuthState({
    this.isAuthenticated = false,
    this.isLoading = false,
    this.errorMessage,
    this.user,
    this.tenant,
    this.roles = const [],
    this.token,
  });

  AuthState copyWith({
    bool? isAuthenticated,
    bool? isLoading,
    String? errorMessage,
    UserModel? user,
    TenantModel? tenant,
    List<String>? roles,
    String? token,
  }) {
    return AuthState(
      isAuthenticated: isAuthenticated ?? this.isAuthenticated,
      isLoading: isLoading ?? this.isLoading,
      errorMessage: errorMessage,
      user: user ?? this.user,
      tenant: tenant ?? this.tenant,
      roles: roles ?? this.roles,
      token: token ?? this.token,
    );
  }
}

class AuthNotifier extends Notifier<AuthState> {
  late final ApiClient apiClient;
  late final SecureStorageService storage;

  @override
  AuthState build() {
    apiClient = ref.watch(apiClientProvider);
    storage = ref.watch(secureStorageProvider);
    apiClient.onTokenRefreshed = (newToken) {
      updateToken(newToken);
    };
    checkAuth();
    return const AuthState();
  }

  void updateToken(String newToken) {
    if (newToken.isNotEmpty && state.token != newToken) {
      state = state.copyWith(token: newToken, isAuthenticated: true);
    }
  }

  Future<void> checkAuth() async {
    final token = await storage.getToken();
    if (token == null || token.isEmpty) {
      state = state.copyWith(isAuthenticated: false);
      return;
    }

    try {
      final userJson = await storage.getUserData();
      final tenantJson = await storage.getTenantData();

      UserModel? user;
      TenantModel? tenant;

      if (userJson != null) {
        user = UserModel.fromJson(
            jsonDecode(userJson) as Map<String, dynamic>);
      }
      if (tenantJson != null) {
        tenant = TenantModel.fromJson(
            jsonDecode(tenantJson) as Map<String, dynamic>);
      }

      state = state.copyWith(
        isAuthenticated: true,
        token: token,
        user: user,
        tenant: tenant,
      );
    } catch (_) {
      state = state.copyWith(isAuthenticated: false);
    }
  }

  Future<bool> login({
    required String email,
    required String password,
    String? tenantId,
    bool remember = true,
  }) async {
    state = state.copyWith(isLoading: true, errorMessage: null);

    try {
      final response = await apiClient.dio.post(
        ApiConfig.login,
        data: {
          'email': email.trim(),
          'password': password,
          if (tenantId != null && tenantId.isNotEmpty) 'tenantId': tenantId,
        },
      );

      final data = response.data as Map<String, dynamic>;
      final token = data['accessToken'] as String;
      final refreshToken = data['refreshToken'] as String?;
      final userData = UserModel.fromJson(data['user'] as Map<String, dynamic>);
      final tenantData =
          TenantModel.fromJson(data['tenant'] as Map<String, dynamic>);
      final rolesList =
          (data['roles'] as List? ?? []).map((e) => e.toString()).toList();

      await storage.saveToken(token);
      if (refreshToken != null && refreshToken.isNotEmpty) {
        await storage.saveRefreshToken(refreshToken);
      }
      await storage.saveUserData(jsonEncode(userData.toJson()));
      await storage.saveTenantData(jsonEncode(tenantData.toJson()));

      if (remember) {
        await storage.saveRememberedEmail(email.trim());
      } else {
        await storage.clearRememberedEmail();
      }

      state = state.copyWith(
        isAuthenticated: true,
        isLoading: false,
        token: token,
        user: userData,
        tenant: tenantData,
        roles: rolesList,
      );
      return true;
    } catch (e) {
      final errorMsg = apiClient.extractErrorMessage(e);
      state = state.copyWith(
        isLoading: false,
        errorMessage: errorMsg,
      );
      return false;
    }
  }

  Future<({String message, String? devCode})> forgotPassword(String email) async {
    try {
      final response = await apiClient.dio.post(
        ApiConfig.forgotPassword,
        data: {'email': email.trim()},
      );
      final data = response.data as Map<String, dynamic>;
      final msg = data['message'] as String? ?? 'Verification code dispatched';
      final code = data['code'] as String?;
      return (message: msg, devCode: code);
    } catch (e) {
      throw apiClient.extractErrorMessage(e);
    }
  }

  Future<String> resetPassword({
    required String email,
    required String token,
    required String newPassword,
  }) async {
    try {
      final response = await apiClient.dio.post(
        ApiConfig.resetPassword,
        data: {
          'email': email.trim(),
          'token': token.trim(),
          'newPassword': newPassword,
        },
      );
      final data = response.data as Map<String, dynamic>;
      return data['message'] as String? ?? 'Password reset successfully';
    } catch (e) {
      throw apiClient.extractErrorMessage(e);
    }
  }

  Future<void> updateBasicDetails({
    required String fullName,
    String? phone,
    String? emergencyPhone,
    String? emergencyContact,
  }) async {
    final currentUser = state.user;
    if (currentUser == null) return;

    final resolvedEmergencyPhone =
        emergencyPhone?.trim() ?? emergencyContact?.trim();

    final updatedUser = currentUser.copyWith(
      fullName: fullName.trim(),
      phone: phone?.trim(),
      emergencyPhone: resolvedEmergencyPhone,
    );

    await storage.saveUserData(jsonEncode(updatedUser.toJson()));
    state = state.copyWith(user: updatedUser);

    try {
      final response = await apiClient.dio.patch(
        ApiConfig.updateProfile,
        data: {
          'fullName': fullName.trim(),
          'phone': phone?.trim(),
          'emergencyPhone': resolvedEmergencyPhone,
        },
      );
      if (response.data != null && response.data['user'] != null) {
        final serverUser = UserModel.fromJson(
            response.data['user'] as Map<String, dynamic>);
        final mergedUser = updatedUser.copyWith(
          avatarUrl: serverUser.avatarUrl,
        );
        await storage.saveUserData(jsonEncode(mergedUser.toJson()));
        state = state.copyWith(user: mergedUser);
      }
    } catch (e) {
      debugPrint('Error syncing profile update to backend: $e');
    }
  }

  Future<void> updateAvatar(String filePath) async {
    final currentUser = state.user;
    if (currentUser == null) return;

    // Immediately update local avatar path so all screens (Roster & ID) update instantly
    var updatedUser = currentUser.copyWith(avatarPath: filePath);
    await storage.saveUserData(jsonEncode(updatedUser.toJson()));
    state = state.copyWith(user: updatedUser);

    // Also upload the avatar to the backend database
    try {
      final fileName = filePath.split('/').last;
      final formData = FormData.fromMap({
        'file': await MultipartFile.fromFile(filePath, filename: fileName),
      });

      final response = await apiClient.dio.post(
        '/auth/avatar',
        data: formData,
      );

      final data = response.data as Map<String, dynamic>;
      final serverAvatarUrl = data['avatarUrl'] as String?;
      if (serverAvatarUrl != null) {
        updatedUser = updatedUser.copyWith(avatarUrl: serverAvatarUrl);
        await storage.saveUserData(jsonEncode(updatedUser.toJson()));
        state = state.copyWith(user: updatedUser);
      }
    } catch (e) {
      debugPrint('Error uploading avatar to backend: $e');
    }
  }

  Future<void> logout() async {
    await storage.clearSession();
    state = const AuthState();
  }
}

final authProvider = NotifierProvider<AuthNotifier, AuthState>(AuthNotifier.new);
