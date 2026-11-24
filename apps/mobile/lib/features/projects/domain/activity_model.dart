class ActivityModel {
  final String id;
  final String? parentId;
  final String activityCode;
  final String name;
  final String? description;
  final String? unit;
  final String? status;

  const ActivityModel({
    required this.id,
    this.parentId,
    required this.activityCode,
    required this.name,
    this.description,
    this.unit,
    this.status,
  });

  factory ActivityModel.fromJson(Map<String, dynamic> json) {
    return ActivityModel(
      id: json['id'] as String,
      parentId: (json['parentId'] ?? json['parent_id']) as String?,
      activityCode:
          (json['activityCode'] ?? json['activity_code'] ?? '') as String,
      name: (json['name'] ?? '') as String,
      description: json['description'] as String?,
      unit: json['unit'] as String?,
      status: json['status'] as String?,
    );
  }

  Map<String, dynamic> toJson() => {
        'id': id,
        'parentId': parentId,
        'activityCode': activityCode,
        'name': name,
        'description': description,
        'unit': unit,
        'status': status,
      };

  @override
  bool operator ==(Object other) =>
      identical(this, other) ||
      other is ActivityModel &&
          runtimeType == other.runtimeType &&
          id == other.id;

  @override
  int get hashCode => id.hashCode;
}
