import 'dart:typed_data';
import 'package:dio/dio.dart';
import '../config/api_config.dart';
import '../storage/secure_storage_service.dart';

class ApiClient {
  late final Dio dio;
  final SecureStorageService storage;
  void Function(String newAccessToken)? onTokenRefreshed;

  ApiClient({
    required this.storage,
    this.onTokenRefreshed,
  }) {
    dio = Dio(
      BaseOptions(
        baseUrl: ApiConfig.baseUrl,
        connectTimeout: const Duration(seconds: 15),
        receiveTimeout: const Duration(seconds: 15),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      ),
    );

    dio.interceptors.add(
      InterceptorsWrapper(
        onRequest: (options, handler) async {
          // Always ensure the latest configured base URL is used
          options.baseUrl = ApiConfig.baseUrl;

          final token = await storage.getToken();
          if (token != null && token.isNotEmpty) {
            options.headers['Authorization'] = 'Bearer $token';
          }
          return handler.next(options);
        },
        onError: (DioException error, handler) async {
          if (error.response?.statusCode == 401 &&
              !error.requestOptions.path.contains('/auth/login') &&
              !error.requestOptions.path.contains('/auth/refresh')) {
            final refreshToken = await storage.getRefreshToken();
            if (refreshToken != null && refreshToken.isNotEmpty) {
              try {
                final refreshResponse = await Dio(
                  BaseOptions(
                    baseUrl: ApiConfig.baseUrl,
                    connectTimeout: const Duration(seconds: 10),
                    headers: {'Content-Type': 'application/json'},
                  ),
                ).post(
                  '/auth/refresh',
                  data: {'refreshToken': refreshToken},
                );

                if (refreshResponse.statusCode == 200 ||
                    refreshResponse.statusCode == 201) {
                  final data = refreshResponse.data as Map<String, dynamic>;
                  final newAccessToken = data['accessToken'] as String?;
                  final newRefreshToken = data['refreshToken'] as String?;

                  if (newAccessToken != null) {
                    await storage.saveToken(newAccessToken);
                    if (newRefreshToken != null) {
                      await storage.saveRefreshToken(newRefreshToken);
                    }
                    onTokenRefreshed?.call(newAccessToken);

                    // Retry original failed request with renewed access token
                    final retryOptions = error.requestOptions;
                    retryOptions.headers['Authorization'] = 'Bearer $newAccessToken';
                    final response = await dio.fetch(retryOptions);
                    return handler.resolve(response);
                  }
                }
              } catch (_) {
                // Refresh failed; clean up stale credentials
                await storage.clearSession();
              }
            }
          }
          return handler.next(error);
        },
      ),
    );
  }

  String extractErrorMessage(dynamic error) {
    if (error is DioException) {
      final responseData = error.response?.data;
      if (responseData is Map && responseData['message'] != null) {
        final msg = responseData['message'];
        if (msg is List) {
          return msg.join(', ');
        }
        return msg.toString();
      }
      if (error.type == DioExceptionType.connectionTimeout ||
          error.type == DioExceptionType.sendTimeout ||
          error.type == DioExceptionType.receiveTimeout) {
        return 'Network connection timed out. Please check your internet connection.';
      }
      if (error.type == DioExceptionType.connectionError) {
        return 'Cannot connect to server at ${ApiConfig.baseUrl}. Ensure server is running.';
      }
      return error.message ?? 'An unexpected network error occurred';
    }
    return error.toString();
  }

  Future<Uint8List> getBytes(
    String path, {
    Map<String, dynamic>? queryParameters,
    CancelToken? cancelToken,
  }) async {
    try {
      final response = await dio.get<List<int>>(
        path,
        queryParameters: queryParameters,
        cancelToken: cancelToken,
        options: Options(
          responseType: ResponseType.bytes,
          headers: {'Accept': 'image/*, application/octet-stream, */*'},
        ),
      );
      if (response.data == null) {
        throw Exception('Empty byte stream returned from $path');
      }
      return Uint8List.fromList(response.data!);
    } catch (e) {
      throw extractErrorMessage(e);
    }
  }
}
