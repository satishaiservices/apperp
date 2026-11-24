import 'package:flutter_test/flutter_test.dart';
import 'package:civil_erp/core/offline/sync_queue_service.dart';
import 'package:civil_erp/core/storage/secure_storage_service.dart';

class MockStorageService extends SecureStorageService {
  final Map<String, String> _fakeStorage = {};

  @override
  Future<void> writeString(String key, String value) async {
    _fakeStorage[key] = value;
  }

  @override
  Future<String?> readString(String key) async {
    return _fakeStorage[key];
  }

  @override
  Future<void> deleteString(String key) async {
    _fakeStorage.remove(key);
  }
}

void main() {
  late MockStorageService mockStorage;
  late SyncQueueService syncQueue;

  setUp(() {
    mockStorage = MockStorageService();
    syncQueue = SyncQueueService(storage: mockStorage);
  });

  tearDown(() {
    syncQueue.dispose();
  });

  test('SyncQueueService starts empty and counts correctly', () async {
    final count = await syncQueue.getCount();
    expect(count, 0);
  });

  test('SyncQueueService enqueues and retrieves tasks', () async {
    final task = SyncTask(
      id: 'task-1',
      endpoint: '/api/v1/attendance/check-in',
      method: 'POST',
      payload: {'lat': 18.52, 'lng': 73.85},
      createdAt: DateTime.now(),
    );

    await syncQueue.enqueue(task);

    final tasks = await syncQueue.getPendingTasks();
    expect(tasks.length, 1);
    expect(tasks.first.id, 'task-1');
    expect(tasks.first.endpoint, '/api/v1/attendance/check-in');
    expect(tasks.first.payload['lat'], 18.52);

    final count = await syncQueue.getCount();
    expect(count, 1);
  });

  test('SyncQueueService removes task after successful execution', () async {
    final task = SyncTask(
      id: 'task-success',
      endpoint: '/api/v1/submissions',
      method: 'POST',
      payload: {'notes': 'Done'},
      createdAt: DateTime.now(),
    );

    await syncQueue.enqueue(task);

    await syncQueue.processQueue((t) async {
      return true; // execution successful
    });

    final pending = await syncQueue.getPendingTasks();
    expect(pending.isEmpty, true);
    expect(await syncQueue.getCount(), 0);
  });

  test('SyncQueueService increments retryCount when execution fails', () async {
    final task = SyncTask(
      id: 'task-fail',
      endpoint: '/api/v1/submissions',
      method: 'POST',
      payload: {'notes': 'Failed attempt'},
      createdAt: DateTime.now(),
    );

    await syncQueue.enqueue(task);

    await syncQueue.processQueue((t) async {
      return false; // execution failed
    });

    final pending = await syncQueue.getPendingTasks();
    expect(pending.length, 1);
    expect(pending.first.retryCount, 1);
  });

  test('SyncTask serializes and deserializes photoPaths correctly', () async {
    final task = SyncTask(
      id: 'task-photo',
      endpoint: '/api/v1/projects/prj-1/submissions',
      method: 'POST',
      payload: {'startChainage': '1000', 'endChainage': '1200'},
      createdAt: DateTime.now(),
      photoPaths: ['/local/cache/photo1.jpg', '/local/cache/photo2.jpg'],
    );

    await syncQueue.enqueue(task);

    final pending = await syncQueue.getPendingTasks();
    expect(pending.length, 1);
    expect(pending.first.photoPaths, contains('/local/cache/photo1.jpg'));
    expect(pending.first.photoPaths.length, 2);
  });
}
