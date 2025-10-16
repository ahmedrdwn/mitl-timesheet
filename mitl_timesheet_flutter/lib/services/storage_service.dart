import 'dart:convert';
import 'package:shared_preferences/shared_preferences.dart';
import '../models/app_data.dart';
import '../models/timesheet_entry.dart';

class StorageService {
  static const String _storageKey = 'timesheet_app_data';

  static Future<void> saveData(AppData data) async {
    try {
      final prefs = await SharedPreferences.getInstance();
      final jsonString = jsonEncode(data.toJson());
      await prefs.setString(_storageKey, jsonString);
    } catch (error) {
      print('Error saving data: $error');
      throw error;
    }
  }

  static Future<AppData> loadData() async {
    try {
      final prefs = await SharedPreferences.getInstance();
      final jsonString = prefs.getString(_storageKey);
      
      if (jsonString != null) {
        final jsonData = jsonDecode(jsonString);
        return AppData.fromJson(jsonData);
      }
      
      return AppData(
        employeeName: '',
        studentNumber: '',
        entries: [],
        lastSaved: '',
      );
    } catch (error) {
      print('Error loading data: $error');
      return AppData(
        employeeName: '',
        studentNumber: '',
        entries: [],
        lastSaved: '',
      );
    }
  }

  static Future<void> clearAllData() async {
    try {
      final prefs = await SharedPreferences.getInstance();
      await prefs.remove(_storageKey);
    } catch (error) {
      print('Error clearing data: $error');
      throw error;
    }
  }
}
