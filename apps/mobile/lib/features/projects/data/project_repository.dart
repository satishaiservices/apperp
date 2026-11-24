import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:civil_erp/core/config/api_config.dart';
import 'package:civil_erp/core/network/api_client.dart';
import 'package:civil_erp/features/auth/data/auth_repository.dart';
import 'package:civil_erp/features/projects/domain/project_model.dart';
import 'package:civil_erp/features/projects/domain/activity_model.dart';

class ProjectRepository {
  final ApiClient apiClient;

  ProjectRepository({required this.apiClient});

  Future<List<ProjectModel>> getProjects() async {
    try {
      final response = await apiClient.dio.get(ApiConfig.projects);
      final list = response.data as List? ?? [];
      return list
          .map((item) => ProjectModel.fromJson(item as Map<String, dynamic>))
          .toList();
    } catch (e) {
      throw apiClient.extractErrorMessage(e);
    }
  }

  Future<List<ActivityModel>> getProjectActivities(String projectId) async {
    try {
      final response =
          await apiClient.dio.get(ApiConfig.projectActivities(projectId));
      final list = response.data as List? ?? [];
      return list
          .map((item) => ActivityModel.fromJson(item as Map<String, dynamic>))
          .toList();
    } catch (e) {
      throw apiClient.extractErrorMessage(e);
    }
  }
}

final projectRepositoryProvider = Provider<ProjectRepository>((ref) {
  final client = ref.watch(apiClientProvider);
  return ProjectRepository(apiClient: client);
});

final projectsFutureProvider =
    FutureProvider.autoDispose<List<ProjectModel>>((ref) async {
  final repo = ref.watch(projectRepositoryProvider);
  return repo.getProjects();
});

final projectActivitiesFamily = FutureProvider.autoDispose
    .family<List<ActivityModel>, String>((ref, projectId) async {
  if (projectId.isEmpty) return [];
  final repo = ref.watch(projectRepositoryProvider);
  return repo.getProjectActivities(projectId);
});

void refreshProjects(Ref ref) {
  ref.invalidate(projectsFutureProvider);
}

void refreshProjectActivities(Ref ref, String projectId) {
  if (projectId.isNotEmpty) {
    ref.invalidate(projectActivitiesFamily(projectId));
  }
}
