import 'package:geolocator/geolocator.dart';

class LocationData {
  final double latitude;
  final double longitude;
  final double accuracy;
  final DateTime capturedAt;
  final bool isMocked;

  const LocationData({
    required this.latitude,
    required this.longitude,
    required this.accuracy,
    required this.capturedAt,
    this.isMocked = false,
  });

  String get formattedCoordinates =>
      '${latitude.toStringAsFixed(4)}°N, ${longitude.toStringAsFixed(4)}°E';

  String get formattedAccuracy => '${accuracy.toStringAsFixed(1)}m Acc.';
}

class LocationService {
  static const fallbackLatitude = 28.4595;
  static const fallbackLongitude = 77.0266;

  static Future<LocationData> getCurrentLocation() async {
    try {
      bool serviceEnabled = await Geolocator.isLocationServiceEnabled();
      if (!serviceEnabled) {
        return _fallbackLocation('Location services are disabled');
      }

      LocationPermission permission = await Geolocator.checkPermission();
      if (permission == LocationPermission.denied) {
        permission = await Geolocator.requestPermission();
        if (permission == LocationPermission.denied) {
          return _fallbackLocation('Location permission denied');
        }
      }

      if (permission == LocationPermission.deniedForever) {
        return _fallbackLocation('Location permission permanently denied');
      }

      final position = await Geolocator.getCurrentPosition(
        locationSettings: const LocationSettings(
          accuracy: LocationAccuracy.high,
          timeLimit: Duration(seconds: 10),
        ),
      );

      return LocationData(
        latitude: position.latitude,
        longitude: position.longitude,
        accuracy: position.accuracy,
        capturedAt: position.timestamp,
        isMocked: position.isMocked,
      );
    } catch (_) {
      return _fallbackLocation('GPS acquisition error');
    }
  }

  static LocationData _fallbackLocation(String reason) {
    return LocationData(
      latitude: fallbackLatitude,
      longitude: fallbackLongitude,
      accuracy: 12.4,
      capturedAt: DateTime.now(),
      isMocked: true,
    );
  }
}
