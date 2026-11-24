import 'dart:io';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:image_picker/image_picker.dart';

import 'package:civil_erp/core/config/api_config.dart';
import 'package:civil_erp/core/theme/app_theme.dart';
import 'package:civil_erp/features/auth/data/auth_repository.dart';

class SupervisorIdScreen extends ConsumerStatefulWidget {
  const SupervisorIdScreen({super.key});

  @override
  ConsumerState<SupervisorIdScreen> createState() => _SupervisorIdScreenState();
}

class _SupervisorIdScreenState extends ConsumerState<SupervisorIdScreen> {
  final ImagePicker _picker = ImagePicker();

  Future<void> _pickProfilePicture(BuildContext context) async {
    final source = await showModalBottomSheet<ImageSource>(
      context: context,
      backgroundColor: Colors.white,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
      ),
      builder: (ctx) => SafeArea(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 16),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Container(
                width: 40,
                height: 4,
                margin: const EdgeInsets.only(bottom: 16),
                decoration: BoxDecoration(
                  color: Colors.grey.shade300,
                  borderRadius: BorderRadius.circular(2),
                ),
              ),
              const Text(
                'Update Profile Photo',
                style: TextStyle(
                  fontSize: 16,
                  fontWeight: FontWeight.w800,
                  color: AppTheme.textDark,
                ),
              ),
              const SizedBox(height: 16),
              ListTile(
                leading: const CircleAvatar(
                  backgroundColor: AppTheme.emeraldLight,
                  child: Icon(Icons.camera_alt_rounded,
                      color: AppTheme.primaryEmerald),
                ),
                title: const Text('Take Photo with Camera',
                    style: TextStyle(fontWeight: FontWeight.w700)),
                subtitle: const Text('Capture a live profile photo',
                    style: TextStyle(fontSize: 12)),
                onTap: () => Navigator.pop(ctx, ImageSource.camera),
              ),
              ListTile(
                leading: const CircleAvatar(
                  backgroundColor: AppTheme.emeraldLight,
                  child: Icon(Icons.photo_library_rounded,
                      color: AppTheme.primaryEmerald),
                ),
                title: const Text('Choose from Gallery',
                    style: TextStyle(fontWeight: FontWeight.w700)),
                subtitle: const Text('Select photo from gallery',
                    style: TextStyle(fontSize: 12)),
                onTap: () => Navigator.pop(ctx, ImageSource.gallery),
              ),
              const SizedBox(height: 8),
            ],
          ),
        ),
      ),
    );

    if (source == null) return;

    try {
      final pickedFile = await _picker.pickImage(
        source: source,
        maxWidth: 600,
        maxHeight: 600,
        imageQuality: 85,
      );

      if (pickedFile != null) {
        await ref
            .read(authProvider.notifier)
            .updateAvatar(pickedFile.path);

        if (context.mounted) {
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(
              content: Text('Profile photo updated and saved to database'),
              behavior: SnackBarBehavior.floating,
              backgroundColor: AppTheme.primaryEmerald,
            ),
          );
        }
      }
    } catch (e) {
      if (context.mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text('Failed to update picture: $e'),
            backgroundColor: AppTheme.redDanger,
            behavior: SnackBarBehavior.floating,
          ),
        );
      }
    }
  }

  void _openEditProfileSheet(BuildContext context, UserModel user) {
    final formKey = GlobalKey<FormState>();
    final nameController = TextEditingController(text: user.fullName);
    final phoneController =
        TextEditingController(text: user.phone ?? '');
    final emergencyPhoneController = TextEditingController(
        text: user.emergencyPhone ?? '');

    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.white,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
      ),
      builder: (ctx) => StatefulBuilder(
        builder: (ctx, setModalState) => SafeArea(
          child: Padding(
            padding: EdgeInsets.only(
              left: 20,
              right: 20,
              top: 20,
              bottom: MediaQuery.of(ctx).viewInsets.bottom + 20,
            ),
            child: SingleChildScrollView(
              child: Form(
                key: formKey,
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  crossAxisAlignment: CrossAxisAlignment.stretch,
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        const Text(
                          'Edit Profile Details',
                          style: TextStyle(
                            fontSize: 18,
                            fontWeight: FontWeight.w800,
                            color: AppTheme.textDark,
                          ),
                        ),
                        IconButton(
                          icon: const Icon(Icons.close),
                          onPressed: () => Navigator.pop(ctx),
                        ),
                      ],
                    ),
                    const SizedBox(height: 16),

                    // 1. Full Name
                    const Text(
                      'FULL NAME',
                      style: TextStyle(
                        fontSize: 11,
                        fontWeight: FontWeight.w800,
                        color: AppTheme.primaryEmerald,
                        letterSpacing: 0.5,
                      ),
                    ),
                    const SizedBox(height: 6),
                    TextFormField(
                      controller: nameController,
                      decoration: const InputDecoration(
                        prefixIcon: Icon(Icons.person_outline,
                            color: AppTheme.textMuted),
                        hintText: 'Enter full name',
                      ),
                      validator: (val) {
                        if (val == null || val.trim().isEmpty) {
                          return 'Full name cannot be empty';
                        }
                        return null;
                      },
                    ),
                    const SizedBox(height: 14),

                    // 2. Mobile Number Field
                    const Text(
                      'MOBILE NUMBER',
                      style: TextStyle(
                        fontSize: 11,
                        fontWeight: FontWeight.w800,
                        color: AppTheme.primaryEmerald,
                        letterSpacing: 0.5,
                      ),
                    ),
                    const SizedBox(height: 6),
                    TextFormField(
                      controller: phoneController,
                      keyboardType: TextInputType.phone,
                      decoration: const InputDecoration(
                        prefixIcon: Icon(Icons.phone_android_rounded,
                            color: AppTheme.textMuted),
                        hintText: '+91 98765 43210',
                      ),
                      validator: (val) {
                        if (val == null || val.trim().isEmpty) {
                          return 'Mobile number is required';
                        }
                        return null;
                      },
                    ),
                    const SizedBox(height: 14),

                    // 3. Emergency Contact Phone Number Field
                    const Text(
                      'EMERGENCY CONTACT PHONE NUMBER',
                      style: TextStyle(
                        fontSize: 11,
                        fontWeight: FontWeight.w800,
                        color: AppTheme.primaryEmerald,
                        letterSpacing: 0.5,
                      ),
                    ),
                    const SizedBox(height: 6),
                    TextFormField(
                      controller: emergencyPhoneController,
                      keyboardType: TextInputType.phone,
                      decoration: const InputDecoration(
                        prefixIcon: Icon(Icons.phone_in_talk_rounded,
                            color: AppTheme.redDanger),
                        hintText: '+91 98765 43211',
                      ),
                      validator: (val) {
                        if (val == null || val.trim().isEmpty) {
                          return 'Emergency contact phone number is required';
                        }
                        return null;
                      },
                    ),
                    const SizedBox(height: 14),

                    // 4. Read-only Email ID
                    const Text(
                      'REGISTERED EMAIL (READ-ONLY)',
                      style: TextStyle(
                        fontSize: 11,
                        fontWeight: FontWeight.w800,
                        color: AppTheme.textMuted,
                        letterSpacing: 0.5,
                      ),
                    ),
                    const SizedBox(height: 6),
                    TextFormField(
                      initialValue: (user.email != null && user.email!.isNotEmpty)
                          ? user.email!
                          : (user.username != null && user.username!.isNotEmpty ? user.username! : 'Field Worker'),
                      enabled: false,
                      decoration: const InputDecoration(
                        prefixIcon: Icon(Icons.lock_outline_rounded,
                            color: AppTheme.textMuted),
                        suffixIcon: Padding(
                          padding: EdgeInsets.all(12),
                          child: Icon(Icons.info_outline_rounded,
                              size: 18, color: AppTheme.textMuted),
                        ),
                      ),
                    ),
                    const SizedBox(height: 20),

                    // Save Changes Button
                    SizedBox(
                      height: 50,
                      child: FilledButton.icon(
                        onPressed: () async {
                          if (!formKey.currentState!.validate()) return;

                          final newName = nameController.text.trim();
                          final newPhone = phoneController.text.trim();
                          final newEmergency = emergencyPhoneController.text.trim();

                          await ref
                              .read(authProvider.notifier)
                              .updateBasicDetails(
                                fullName: newName,
                                phone: newPhone,
                                emergencyPhone: newEmergency,
                              );

                          if (context.mounted) {
                            Navigator.pop(ctx);
                            ScaffoldMessenger.of(context).showSnackBar(
                              const SnackBar(
                                content: Text('Profile details saved to database'),
                                behavior: SnackBarBehavior.floating,
                                backgroundColor: AppTheme.primaryEmerald,
                              ),
                            );
                          }
                        },
                        style: FilledButton.styleFrom(
                          backgroundColor: AppTheme.primaryEmerald,
                        ),
                        icon: const Icon(Icons.check_rounded),
                        label: const Text(
                          'Save Details',
                          style: TextStyle(
                            fontSize: 15,
                            fontWeight: FontWeight.w800,
                          ),
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final authState = ref.watch(authProvider);
    final user = authState.user;
    final tenant = authState.tenant;

    final phone = user?.phone;
    final mobileNumber = (phone != null && phone.isNotEmpty) ? phone : 'Not set';
    final emergency = user?.emergencyPhone;
    final emergencyPhone =
        (emergency != null && emergency.isNotEmpty) ? emergency : 'Not set';
    final avatarFile = user?.avatarPath != null ? File(user!.avatarPath!) : null;
    final hasLocalAvatar = avatarFile != null && avatarFile.existsSync();
    final avatarUrl = user?.avatarUrl;

    return Scaffold(
      backgroundColor: AppTheme.bgLight,
      appBar: AppBar(
        title: const Text('Profile & Details'),
        actions: [
          IconButton(
            icon: const Icon(Icons.logout_rounded),
            tooltip: 'Sign Out',
            onPressed: () async {
              final confirm = await showDialog<bool>(
                context: context,
                builder: (ctx) => AlertDialog(
                  title: const Text('Sign Out'),
                  content: const Text(
                      'Are you sure you want to end your session and sign out?'),
                  actions: [
                    TextButton(
                      onPressed: () => Navigator.pop(ctx, false),
                      child: const Text('Cancel'),
                    ),
                    ElevatedButton(
                      onPressed: () => Navigator.pop(ctx, true),
                      style: ElevatedButton.styleFrom(
                        backgroundColor: AppTheme.redDanger,
                        foregroundColor: Colors.white,
                      ),
                      child: const Text('Sign Out'),
                    ),
                  ],
                ),
              );

              if (confirm == true) {
                await ref.read(authProvider.notifier).logout();
                if (context.mounted) context.go('/login');
              }
            },
          ),
        ],
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              // 1. Supervisor Profile Card (Clean Profile Header - Digital Pass removed)
              Card(
                child: Padding(
                  padding: const EdgeInsets.all(16),
                  child: LayoutBuilder(
                    builder: (context, constraints) {
                      final isNarrow = constraints.maxWidth < 360;
                      final avatarSize = isNarrow ? 60.0 : 72.0;

                      return Row(
                        children: [
                          // Avatar with update photo button
                          GestureDetector(
                            onTap: () => _pickProfilePicture(context),
                            child: Stack(
                              children: [
                                Container(
                                  height: avatarSize,
                                  width: avatarSize,
                                  decoration: BoxDecoration(
                                    color: AppTheme.primaryEmerald,
                                    borderRadius: BorderRadius.circular(isNarrow ? 14 : 18),
                                  ),
                                  clipBehavior: Clip.antiAlias,
                                  child: hasLocalAvatar
                                      ? Image.file(
                                          avatarFile,
                                          fit: BoxFit.cover,
                                        )
                                      : (avatarUrl != null && avatarUrl.isNotEmpty)
                                          ? Image.network(
                                              avatarUrl.startsWith('http')
                                                  ? avatarUrl
                                                  : '${ApiConfig.baseUrl}$avatarUrl',
                                              fit: BoxFit.cover,
                                              errorBuilder: (_, __, ___) =>
                                                  Icon(
                                                Icons.person_rounded,
                                                color: Colors.white,
                                                size: isNarrow ? 34 : 42,
                                              ),
                                            )
                                          : Icon(
                                              Icons.person_rounded,
                                              color: Colors.white,
                                              size: isNarrow ? 34 : 42,
                                            ),
                                ),
                                Positioned(
                                  bottom: 0,
                                  right: 0,
                                  child: Container(
                                    padding: const EdgeInsets.all(4),
                                    decoration: BoxDecoration(
                                      color: AppTheme.primaryEmerald,
                                      shape: BoxShape.circle,
                                      border: Border.all(
                                          color: Colors.white, width: 2),
                                    ),
                                    child: Icon(
                                      Icons.camera_alt_rounded,
                                      size: isNarrow ? 11 : 13,
                                      color: Colors.white,
                                    ),
                                  ),
                                ),
                              ],
                            ),
                          ),
                          const SizedBox(width: 14),
                          Expanded(
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text(
                                  user?.fullName ?? 'Field Employee',
                                  maxLines: 1,
                                  overflow: TextOverflow.ellipsis,
                                  style: TextStyle(
                                    fontSize: isNarrow ? 16 : 18,
                                    fontWeight: FontWeight.w800,
                                    color: AppTheme.textDark,
                                  ),
                                ),
                                const SizedBox(height: 2),
                                const Text(
                                  'Engineering / Site Operations',
                                  maxLines: 1,
                                  overflow: TextOverflow.ellipsis,
                                  style: TextStyle(
                                    fontSize: 11.5,
                                    fontWeight: FontWeight.w600,
                                    color: AppTheme.textMuted,
                                  ),
                                ),
                                const SizedBox(height: 2),
                                Text(
                                  tenant?.name ?? 'Organization',
                                  maxLines: 1,
                                  overflow: TextOverflow.ellipsis,
                                  style: const TextStyle(
                                    fontSize: 11.5,
                                    fontWeight: FontWeight.w700,
                                    color: AppTheme.primaryEmerald,
                                  ),
                                ),
                                const SizedBox(height: 2),
                                FittedBox(
                                  fit: BoxFit.scaleDown,
                                  alignment: Alignment.centerLeft,
                                  child: Text(
                                    'ID: #${user != null && user.id.length >= 8 ? user.id.substring(0, 8).toUpperCase() : 'ENG-88219'}',
                                    style: const TextStyle(
                                      fontSize: 11,
                                      fontWeight: FontWeight.w700,
                                      color: AppTheme.textMuted,
                                    ),
                                  ),
                                ),
                                const SizedBox(height: 4),
                                InkWell(
                                  onTap: () => _pickProfilePicture(context),
                                  child: const FittedBox(
                                    fit: BoxFit.scaleDown,
                                    alignment: Alignment.centerLeft,
                                    child: Row(
                                      mainAxisSize: MainAxisSize.min,
                                      children: [
                                        Icon(Icons.photo_camera_outlined,
                                            size: 13,
                                            color: AppTheme.primaryEmerald),
                                        SizedBox(width: 4),
                                        Text(
                                          'Change Photo',
                                          style: TextStyle(
                                            fontSize: 11,
                                            fontWeight: FontWeight.w700,
                                            color: AppTheme.primaryEmerald,
                                          ),
                                        ),
                                      ],
                                    ),
                                  ),
                                ),
                              ],
                            ),
                          ),
                        ],
                      );
                    },
                  ),
                ),
              ),
              const SizedBox(height: 16),

              // 2. Basic Contact Details Card with Edit Option
              Card(
                child: Padding(
                  padding: const EdgeInsets.all(16),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Wrap(
                        alignment: WrapAlignment.spaceBetween,
                        crossAxisAlignment: WrapCrossAlignment.center,
                        spacing: 8,
                        runSpacing: 4,
                        children: [
                          const Text(
                            'BASIC PROFILE DETAILS',
                            style: TextStyle(
                              fontSize: 11,
                              fontWeight: FontWeight.w800,
                              color: AppTheme.primaryEmerald,
                              letterSpacing: 0.8,
                            ),
                          ),
                          TextButton.icon(
                            onPressed: () {
                              if (user != null) {
                                _openEditProfileSheet(context, user);
                              }
                            },
                            icon: const Icon(Icons.edit_outlined, size: 16),
                            label: const FittedBox(
                              fit: BoxFit.scaleDown,
                              child: Text(
                                'Edit Details',
                                style: TextStyle(
                                  fontWeight: FontWeight.w800,
                                  fontSize: 13,
                                ),
                              ),
                            ),
                            style: TextButton.styleFrom(
                              foregroundColor: AppTheme.primaryEmerald,
                            ),
                          ),
                        ],
                      ),
                      const SizedBox(height: 12),

                      // Full Name Row
                      _contactTile(
                        icon: Icons.person_outline_rounded,
                        label: 'FULL NAME',
                        value: user?.fullName ?? 'Field Employee',
                      ),
                      const SizedBox(height: 12),

                      // Mobile Number Row
                      _contactTile(
                        icon: Icons.phone_android_rounded,
                        label: 'MOBILE NUMBER',
                        value: mobileNumber,
                      ),
                      const SizedBox(height: 12),

                      // Emergency Contact Phone Number Row
                      _contactTile(
                        icon: Icons.phone_in_talk_rounded,
                        label: 'EMERGENCY CONTACT PHONE NUMBER',
                        value: emergencyPhone,
                        isEmergency: true,
                      ),
                      const SizedBox(height: 12),

                      // Read-only Email / Login ID
                      _contactTile(
                        icon: Icons.person_pin_circle_outlined,
                        label: 'LOGIN USERNAME / IDENTIFIER',
                        value: (user?.username != null && user!.username!.isNotEmpty)
                            ? '@${user.username}'
                            : ((user?.email != null && user!.email!.isNotEmpty)
                                ? user.email!
                                : 'Not set'),
                      ),
                    ],
                  ),
                ),
              ),
              const SizedBox(height: 16),

              // Edit Button (Prominent Action)
              SizedBox(
                height: 50,
                child: FilledButton.icon(
                  onPressed: () {
                    if (user != null) {
                      _openEditProfileSheet(context, user);
                    }
                  },
                  style: FilledButton.styleFrom(
                    backgroundColor: AppTheme.primaryEmerald,
                  ),
                  icon: const Icon(Icons.edit_note_rounded),
                  label: const FittedBox(
                    fit: BoxFit.scaleDown,
                    child: Text(
                      'EDIT BASIC DETAILS',
                      style: TextStyle(
                        fontSize: 14,
                        fontWeight: FontWeight.w800,
                        letterSpacing: 0.5,
                      ),
                    ),
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _contactTile({
    required IconData icon,
    required String label,
    required String value,
    bool isEmergency = false,
  }) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
      decoration: BoxDecoration(
        color: isEmergency ? const Color(0xFFFEF2F2) : AppTheme.bgLight,
        borderRadius: BorderRadius.circular(10),
        border: Border.all(
          color: isEmergency ? const Color(0xFFFECACA) : AppTheme.borderColor,
        ),
      ),
      child: Row(
        children: [
          Icon(
            icon,
            size: 20,
            color: isEmergency ? AppTheme.redDanger : AppTheme.primaryEmerald,
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                FittedBox(
                  fit: BoxFit.scaleDown,
                  alignment: Alignment.centerLeft,
                  child: Text(
                    label,
                    style: TextStyle(
                      fontSize: 9.5,
                      fontWeight: FontWeight.w800,
                      color: isEmergency ? AppTheme.redDanger : AppTheme.textMuted,
                      letterSpacing: 0.5,
                    ),
                  ),
                ),
                const SizedBox(height: 2),
                Text(
                  value,
                  maxLines: 2,
                  overflow: TextOverflow.ellipsis,
                  style: TextStyle(
                    fontSize: 13,
                    fontWeight: FontWeight.w700,
                    color: isEmergency ? const Color(0xFF991B1B) : AppTheme.textDark,
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
