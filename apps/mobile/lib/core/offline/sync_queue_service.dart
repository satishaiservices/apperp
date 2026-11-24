import 'dart:async';
import 'dart:convert';
import 'package:connectivity_plus/connectivity_plus.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../storage/secure_storage_service.dart';

class SyncTask {
  final String id;
  final String endpoint;
  final String method; // 'POST', 'PATCH', 'PUT', 'DELETE'
  final Map<String, dynamic> payload;
  final List<String> photoPaths;
  final DateTime createdAt;
  int retryCount;

  SyncTask({
    required this.id,
    required this.endpoint,
    required this.method,
    required this.payload,
    required this.createdAt,
    this.photoPaths = const [],
    this.retryCount = 0,
  });

  Map<String, dynamic> toJson() => {
        'id': id,
        'endpoint': endpoint,
        'method': method,
        'payload': payload,
        'photoPaths': photoPaths,
        'createdAt': createdAt.toIso8601String(),
        'retryCount': retryCount,
      };

  factory SyncTask.fromJson(Map<String, dynamic> json) {
    return SyncTask(
      id: json['id'] as String,
      endpoint: json['endpoint'] as String,
      method: json['method'] as String? ?? 'POST',
      payload: (json['payload'] as Map<String, dynamic>?) ?? {},
      photoPaths: (json['photoPaths'] as List?)?.map((e) => e.toString()).toList() ?? const [],
      createdAt:
          DateTime.tryParse(json['createdAt'] as String? ?? '') ?? DateTime.now(),
      retryCount: json['retryCount'] as int? ?? 0,
    );
  }
}

class SyncQueueService {
  static const String _storageKey = 'offline_sync_tasks_v1';
  final SecureStorageService _storage;
  final Connectivity _connectivity;

  final StreamController<int> _queueCountController =
      StreamController<int>.broadcast();
  Stream<int> get queueCountStream => _queueCountController.stream;

  StreamSubscription<List<ConnectivityResult>>? _connectivitySub;
  bool _isProcessing = false;

  SyncQueueService({
    SecureStorageService? storage,
    Connectivity? connectivity,
  })  : _storage = storage ?? SecureStorageService(),
        _connectivity = connectivity ?? Connectivity();

  Future<List<SyncTask>> getPendingTasks() async {
    final raw = await _storage.readString(_storageKey);
    if (raw == null || raw.trim().isEmpty) return [];
    try {
      final list = jsonDecode(raw) as List;
      return list
          .map((e) => SyncTask.fromJson(Map<String, dynamic>.from(e as Map)))
          .toList();
    } catch (_) {
      return [];
    }
  }

  Future<void> enqueue(SyncTask task) async {
    final tasks = await getPendingTasks();
    tasks.add(task);
    await _saveTasks(tasks);
    _queueCountController.add(tasks.length);
  }

  Future<void> remove(String taskId) async {
    final tasks = await getPendingTasks();
    tasks.removeWhere((t) => t.id == taskId);
    await _saveTasks(tasks);
    _queueCountController.add(tasks.length);
  }

  Future<void> clear() async {
    await _storage.deleteString(_storageKey);
    _queueCountController.add(0);
  }

  Future<int> getCount() async {
    final tasks = await getPendingTasks();
    return tasks.length;
  }

  Future<void> _saveTasks(List<SyncTask> tasks) async {
    final raw = jsonEncode(tasks.map((t) => t.toJson()).toList());
    await _storage.writeString(_storageKey, raw);
  }

  /// Automatically trigger sync whenever network transitions from offline to online
  void startAutoSync(Future<bool> Function(SyncTask task) executor) {
    _connectivitySub?.cancel();
    _connectivitySub = _connectivity.onConnectivityChanged.listen((results) {
      final isOnline = results.any((r) => r != ConnectivityResult.none);
      if (isOnline) {
        processQueue(executor);
      }
    });
  }

  Future<void> processQueue(Future<bool> Function(SyncTask task) executor) async {
    if (_isProcessing) return;
    _isProcessing = true;

    try {
      final tasks = await getPendingTasks();
      for (final task in tasks) {
        try {
          final success = await executor(task);
          if (success) {
            await remove(task.id);
          } else {
            task.retryCount++;
            await _saveTasks(tasks);
          }
        } catch (_) {
          task.retryCount++;
          await _saveTasks(tasks);
        }
      }
    } finally {
      _isProcessing = false;
      final current = await getCount();
      _queueCountController.add(current);
    }
  }

  void dispose() {
    _connectivitySub?.cancel();
    _queueCountController.close();
  }
}

final syncQueueServiceProvider = Provider<SyncQueueService>((ref) {
  final service = SyncQueueService();
  ref.onDispose(() => service.dispose());
  return service;
});

final pendingSyncCountProvider = StreamProvider<int>((ref) async* {
  final service = ref.watch(syncQueueServiceProvider);
  yield await service.getCount();
  yield* service.queueCountStream;
});
