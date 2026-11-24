import 'package:flutter/material.dart';

class AppTheme {
  // Major Brand Color: Emerald Green (0x0A5C36)
  static const primaryEmerald = Color(0xFF0A5C36);
  static const primaryNavy = primaryEmerald; // Legacy alias for backward compatibility

  // Supporting Emerald Palettes
  static const emeraldDark = Color(0xFF063A22); // Deep forest emerald for dark surfaces
  static const navyCard = emeraldDark;
  static const emeraldAccent = Color(0xFF10B981); // Bright vibrant mint-emerald for accents
  static const emeraldLight = Color(0xFFE8F5E9); // Soft emerald wash for selected chips / tags
  static const emeraldSurface = Color(0xFFF0FDF4); // Mint surface tint

  // Action and Accent Colors
  static const amberAccent = primaryEmerald; // Primary buttons and active controls use Emerald Green
  static const amberLight = Color(0xFFFEF3C7);
  static const warningAmber = Color(0xFFD97706); // For alerts, delays and pending states
  static const greenTag = Color(0xFF0A5C36);
  static const greenLight = Color(0xFFDCFCE7);

  // Background and Surfaces
  static const bgLight = Color(0xFFF4F7F5); // Soft neutral background with subtle emerald undertone
  static const surfaceWhite = Colors.white;
  static const textDark = Color(0xFF0F1E17); // Dark forest slate
  static const textMuted = Color(0xFF52665B);
  static const borderColor = Color(0xFFD1E3D7); // Soft sage border
  static const redDanger = Color(0xFFDC2626);

  static ThemeData get lightTheme {
    return ThemeData(
      useMaterial3: true,
      scaffoldBackgroundColor: bgLight,
      colorScheme: ColorScheme.fromSeed(
        seedColor: primaryEmerald,
        primary: primaryEmerald,
        secondary: emeraldAccent,
        surface: surfaceWhite,
      ),
      fontFamily: 'Roboto',
      appBarTheme: const AppBarTheme(
        backgroundColor: primaryEmerald,
        foregroundColor: Colors.white,
        elevation: 0,
        centerTitle: false,
        titleTextStyle: TextStyle(
          color: Colors.white,
          fontSize: 18,
          fontWeight: FontWeight.w700,
          letterSpacing: 0.3,
        ),
      ),
      cardTheme: CardThemeData(
        color: surfaceWhite,
        elevation: 0,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(14),
          side: const BorderSide(color: borderColor, width: 1),
        ),
      ),
      inputDecorationTheme: InputDecorationTheme(
        filled: true,
        fillColor: Colors.white,
        contentPadding:
            const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
        hintStyle: const TextStyle(color: Color(0xFF8CA395), fontSize: 14),
        labelStyle: const TextStyle(
            color: textDark, fontWeight: FontWeight.w600, fontSize: 13),
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(10),
          borderSide: const BorderSide(color: borderColor),
        ),
        enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(10),
          borderSide: const BorderSide(color: borderColor),
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(10),
          borderSide: const BorderSide(color: primaryEmerald, width: 1.8),
        ),
        errorBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(10),
          borderSide: const BorderSide(color: redDanger),
        ),
      ),
      filledButtonTheme: FilledButtonThemeData(
        style: FilledButton.styleFrom(
          backgroundColor: primaryEmerald,
          foregroundColor: Colors.white,
          shape:
              RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
          padding: const EdgeInsets.symmetric(vertical: 16, horizontal: 20),
          textStyle: const TextStyle(
              fontSize: 15, fontWeight: FontWeight.w700, letterSpacing: 0.5),
        ),
      ),
    );
  }
}
