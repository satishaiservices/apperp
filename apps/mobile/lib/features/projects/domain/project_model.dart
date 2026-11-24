class ProjectModel {
  final String id;
  final String projectCode;
  final String name;
  final String? description;
  final String? siteAddress;
  final String? status;

  const ProjectModel({
    required this.id,
    required this.projectCode,
    required this.name,
    this.description,
    this.siteAddress,
    this.status,
  });

  factory ProjectModel.fromJson(Map<String, dynamic> json) {
    return ProjectModel(
      id: json['id'] as String,
      projectCode: (json['projectCode'] ?? json['project_code'] ?? '') as String,
      name: (json['name'] ?? '') as String,
      description: json['description'] as String?,
      siteAddress: (json['siteAddress'] ?? json['site_address']) as String?,
      status: json['status'] as String?,
    );
  }

  Map<String, dynamic> toJson() => {
        'id': id,
        'projectCode': projectCode,
        'name': name,
        'description': description,
        'siteAddress': siteAddress,
        'status': status,
      };

  String get displayName => '$name ($projectCode)';

  @override
  bool operator ==(Object other) =>
      identical(this, other) ||
      other is ProjectModel &&
          runtimeType == other.runtimeType &&
          id == other.id;

  @override
  int get hashCode => id.hashCode;
}
