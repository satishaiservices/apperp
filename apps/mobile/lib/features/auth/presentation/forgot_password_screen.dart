import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import 'package:civil_erp/core/theme/app_theme.dart';
import 'package:civil_erp/features/auth/data/auth_repository.dart';

class ForgotPasswordScreen extends ConsumerStatefulWidget {
  const ForgotPasswordScreen({super.key});

  @override
  ConsumerState<ForgotPasswordScreen> createState() =>
      _ForgotPasswordScreenState();
}

class _ForgotPasswordScreenState extends ConsumerState<ForgotPasswordScreen> {
  final _formKey = GlobalKey<FormState>();
  final _emailController = TextEditingController();
  final _tokenController = TextEditingController();
  final _newPasswordController = TextEditingController();
  final _confirmPasswordController = TextEditingController();

  int _step = 1; // 1: Enter email & request code, 2: Enter code & reset password
  bool _isLoading = false;
  bool _obscureNew = true;
  String? _successMessage;
  String? _errorMessage;

  @override
  void initState() {
    super.initState();
    _loadRememberedEmail();
  }

  Future<void> _loadRememberedEmail() async {
    final storage = ref.read(secureStorageProvider);
    final savedEmail = await storage.getRememberedEmail();
    if (savedEmail != null && savedEmail.isNotEmpty && mounted) {
      setState(() {
        _emailController.text = savedEmail;
      });
    }
  }

  @override
  void dispose() {
    _emailController.dispose();
    _tokenController.dispose();
    _newPasswordController.dispose();
    _confirmPasswordController.dispose();
    super.dispose();
  }

  Future<void> _handleSendResetCode() async {
    if (!_formKey.currentState!.validate()) return;

    setState(() {
      _isLoading = true;
      _errorMessage = null;
      _successMessage = null;
    });

    try {
      final res = await ref
          .read(authProvider.notifier)
          .forgotPassword(_emailController.text.trim());

      setState(() {
        _isLoading = false;
        _step = 2;
        _successMessage = res.devCode != null
            ? '${res.message}\n(Verification code for field testing: ${res.devCode})'
            : res.message;
        if (res.devCode != null) {
          _tokenController.text = res.devCode!;
        }
      });
    } catch (e) {
      setState(() {
        _isLoading = false;
        _errorMessage = e.toString();
      });
    }
  }

  Future<void> _handleVerifyAndReset() async {
    if (!_formKey.currentState!.validate()) return;

    if (_tokenController.text.trim().length != 6) {
      setState(() => _errorMessage = 'Please enter a valid 6-digit verification code');
      return;
    }

    if (_newPasswordController.text != _confirmPasswordController.text) {
      setState(() => _errorMessage = 'Passwords do not match');
      return;
    }

    if (_newPasswordController.text.length < 10) {
      setState(() => _errorMessage =
          'New password must contain at least 10 characters for security');
      return;
    }

    setState(() {
      _isLoading = true;
      _errorMessage = null;
      _successMessage = null;
    });

    try {
      final msg = await ref.read(authProvider.notifier).resetPassword(
            email: _emailController.text.trim(),
            token: _tokenController.text.trim(),
            newPassword: _newPasswordController.text,
          );
      setState(() {
        _isLoading = false;
        _successMessage = '$msg You can now sign in with your new password.';
      });
    } catch (e) {
      setState(() {
        _isLoading = false;
        _errorMessage = e.toString();
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppTheme.bgLight,
      appBar: AppBar(
        title: const Text('Reset Password'),
        leading: IconButton(
          icon: const Icon(Icons.arrow_back),
          onPressed: () => context.pop(),
        ),
      ),
      body: SafeArea(
        child: Center(
          child: SingleChildScrollView(
            padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 24),
            child: ConstrainedBox(
              constraints: const BoxConstraints(maxWidth: 440),
              child: Card(
                child: Padding(
                  padding: const EdgeInsets.all(24),
                  child: Form(
                    key: _formKey,
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.stretch,
                      children: [
                        const Icon(
                          Icons.lock_reset_rounded,
                          size: 52,
                          color: AppTheme.primaryEmerald,
                        ),
                        const SizedBox(height: 14),
                        Text(
                          _step == 1
                              ? 'Forgot Field Password?'
                              : 'Verify & Reset Password',
                          textAlign: TextAlign.center,
                          style: const TextStyle(
                            fontSize: 22,
                            fontWeight: FontWeight.w800,
                            color: AppTheme.textDark,
                          ),
                        ),
                        const SizedBox(height: 6),
                        Text(
                          _step == 1
                              ? 'Enter your registered email to receive a single-use 6-digit verification code.'
                              : 'Enter the 6-digit verification code sent to your email, along with your new password.',
                          textAlign: TextAlign.center,
                          style: const TextStyle(
                            fontSize: 13,
                            color: AppTheme.textMuted,
                            height: 1.4,
                          ),
                        ),
                        const SizedBox(height: 20),

                        // Success Message Banner
                        if (_successMessage != null) ...[
                          Container(
                            padding: const EdgeInsets.all(14),
                            decoration: BoxDecoration(
                              color: AppTheme.emeraldLight,
                              borderRadius: BorderRadius.circular(10),
                              border: Border.all(
                                  color: AppTheme.primaryEmerald.withValues(alpha: 0.3)),
                            ),
                            child: Row(
                              children: [
                                const Icon(Icons.check_circle_rounded,
                                    color: AppTheme.primaryEmerald),
                                const SizedBox(width: 10),
                                Expanded(
                                  child: Text(
                                    _successMessage!,
                                    style: const TextStyle(
                                      color: Color(0xFF063A22),
                                      fontSize: 13,
                                      fontWeight: FontWeight.w600,
                                    ),
                                  ),
                                ),
                              ],
                            ),
                          ),
                          const SizedBox(height: 16),
                        ],

                        // Error Message Banner
                        if (_errorMessage != null) ...[
                          Container(
                            padding: const EdgeInsets.all(12),
                            decoration: BoxDecoration(
                              color: Colors.red.shade50,
                              borderRadius: BorderRadius.circular(8),
                              border: Border.all(color: Colors.red.shade200),
                            ),
                            child: Row(
                              children: [
                                const Icon(Icons.error_outline_rounded,
                                    color: AppTheme.redDanger, size: 20),
                                const SizedBox(width: 10),
                                Expanded(
                                  child: Text(
                                    _errorMessage!,
                                    style: const TextStyle(
                                      color: AppTheme.redDanger,
                                      fontSize: 13,
                                    ),
                                  ),
                                ),
                              ],
                            ),
                          ),
                          const SizedBox(height: 16),
                        ],

                        // Step Indicator
                        Container(
                          padding: const EdgeInsets.symmetric(
                              horizontal: 12, vertical: 8),
                          decoration: BoxDecoration(
                            color: AppTheme.bgLight,
                            borderRadius: BorderRadius.circular(8),
                            border: Border.all(color: AppTheme.borderColor),
                          ),
                          child: Row(
                            children: [
                              Container(
                                padding: const EdgeInsets.symmetric(
                                    horizontal: 8, vertical: 4),
                                decoration: BoxDecoration(
                                  color: AppTheme.primaryEmerald,
                                  borderRadius: BorderRadius.circular(4),
                                ),
                                child: Text(
                                  'STEP $_step OF 2',
                                  style: const TextStyle(
                                    color: Colors.white,
                                    fontSize: 11,
                                    fontWeight: FontWeight.w800,
                                  ),
                                ),
                              ),
                              const SizedBox(width: 10),
                              Expanded(
                                child: Text(
                                  _step == 1
                                      ? 'Request Secure Code'
                                      : 'Verify Code & Set Password',
                                  style: const TextStyle(
                                    fontSize: 12,
                                    fontWeight: FontWeight.w700,
                                    color: AppTheme.textDark,
                                  ),
                                ),
                              ),
                            ],
                          ),
                        ),
                        const SizedBox(height: 16),

                        // Operator Email
                        const Text(
                          'OPERATOR EMAIL',
                          style: TextStyle(
                            fontSize: 11,
                            fontWeight: FontWeight.w800,
                            color: AppTheme.primaryEmerald,
                            letterSpacing: 0.5,
                          ),
                        ),
                        const SizedBox(height: 8),
                        TextFormField(
                          controller: _emailController,
                          enabled: _step == 1,
                          keyboardType: TextInputType.emailAddress,
                          decoration: const InputDecoration(
                            hintText: 'supervisor@company.com',
                            prefixIcon: Icon(Icons.email_outlined,
                                color: AppTheme.textMuted),
                          ),
                          validator: (val) {
                            if (val == null || val.trim().isEmpty) {
                              return 'Please enter your registered email';
                            }
                            if (!val.contains('@')) {
                              return 'Please enter a valid email address';
                            }
                            return null;
                          },
                        ),
                        const SizedBox(height: 16),

                        // Step 2 Fields: Verification Code & Password
                        if (_step == 2) ...[
                          const Text(
                            '6-DIGIT VERIFICATION CODE',
                            style: TextStyle(
                              fontSize: 11,
                              fontWeight: FontWeight.w800,
                              color: AppTheme.primaryEmerald,
                              letterSpacing: 0.5,
                            ),
                          ),
                          const SizedBox(height: 8),
                          TextFormField(
                            controller: _tokenController,
                            keyboardType: TextInputType.number,
                            maxLength: 6,
                            decoration: const InputDecoration(
                              hintText: 'e.g. 583921',
                              prefixIcon: Icon(Icons.verified_outlined,
                                  color: AppTheme.textMuted),
                              counterText: '',
                            ),
                            validator: (val) {
                              if (val == null || val.trim().isEmpty) {
                                return 'Please enter the 6-digit code';
                              }
                              if (val.trim().length != 6) {
                                return 'Code must be 6 digits';
                              }
                              return null;
                            },
                          ),
                          const SizedBox(height: 16),

                          const Text(
                            'NEW PASSWORD (MIN 10 CHARACTERS)',
                            style: TextStyle(
                              fontSize: 11,
                              fontWeight: FontWeight.w800,
                              color: AppTheme.primaryEmerald,
                              letterSpacing: 0.5,
                            ),
                          ),
                          const SizedBox(height: 8),
                          TextFormField(
                            controller: _newPasswordController,
                            obscureText: _obscureNew,
                            decoration: InputDecoration(
                              hintText: 'Enter new secure password',
                              prefixIcon: const Icon(Icons.lock_outline,
                                  color: AppTheme.textMuted),
                              suffixIcon: IconButton(
                                icon: Icon(
                                  _obscureNew
                                      ? Icons.visibility_outlined
                                      : Icons.visibility_off_outlined,
                                  color: AppTheme.textMuted,
                                ),
                                onPressed: () => setState(
                                    () => _obscureNew = !_obscureNew),
                              ),
                            ),
                            validator: (val) {
                              if (val == null || val.isEmpty) {
                                return 'Please enter a new password';
                              }
                              if (val.length < 10) {
                                return 'Must be at least 10 characters';
                              }
                              return null;
                            },
                          ),
                          const SizedBox(height: 16),

                          const Text(
                            'CONFIRM NEW PASSWORD',
                            style: TextStyle(
                              fontSize: 11,
                              fontWeight: FontWeight.w800,
                              color: AppTheme.primaryEmerald,
                              letterSpacing: 0.5,
                            ),
                          ),
                          const SizedBox(height: 8),
                          TextFormField(
                            controller: _confirmPasswordController,
                            obscureText: _obscureNew,
                            decoration: const InputDecoration(
                              hintText: 'Re-enter new password',
                              prefixIcon: Icon(Icons.lock_outline,
                                  color: AppTheme.textMuted),
                            ),
                            validator: (val) {
                              if (val != _newPasswordController.text) {
                                return 'Passwords do not match';
                              }
                              return null;
                            },
                          ),
                          const SizedBox(height: 20),
                        ],

                        // Action Button
                        SizedBox(
                          height: 50,
                          child: FilledButton(
                            onPressed: _isLoading
                                ? null
                                : (_step == 1
                                    ? _handleSendResetCode
                                    : _handleVerifyAndReset),
                            style: FilledButton.styleFrom(
                              backgroundColor: AppTheme.primaryEmerald,
                            ),
                            child: _isLoading
                                ? const SizedBox(
                                    height: 20,
                                    width: 20,
                                    child: CircularProgressIndicator(
                                      strokeWidth: 2,
                                      valueColor:
                                          AlwaysStoppedAnimation(Colors.white),
                                    ),
                                  )
                                : Text(
                                    _step == 1
                                        ? 'Send Verification Code'
                                        : 'Verify Code & Set Password',
                                    style: const TextStyle(
                                      fontSize: 15,
                                      fontWeight: FontWeight.w800,
                                    ),
                                  ),
                          ),
                        ),
                        const SizedBox(height: 12),

                        // Switch Back / Resend Code
                        if (_step == 2)
                          TextButton(
                            onPressed: () {
                              setState(() {
                                _step = 1;
                                _errorMessage = null;
                                _successMessage = null;
                              });
                            },
                            child: const Text(
                              'Change email / Resend Code',
                              style: TextStyle(
                                color: AppTheme.primaryEmerald,
                                fontWeight: FontWeight.w700,
                              ),
                            ),
                          ),

                        // Back to Sign In
                        TextButton.icon(
                          onPressed: () => context.pop(),
                          icon: const Icon(Icons.arrow_back,
                              size: 16, color: AppTheme.primaryEmerald),
                          label: const Text(
                            'Return to Sign In',
                            style: TextStyle(
                              fontWeight: FontWeight.w700,
                              color: AppTheme.primaryEmerald,
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
        ),
      ),
    );
  }
}
