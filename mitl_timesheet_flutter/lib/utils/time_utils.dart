import '../models/timesheet_entry.dart';

class TimeUtils {
  static double calculateHours(String timeIn, String timeOut, String breakMins) {
    if (timeIn.isEmpty || timeOut.isEmpty) return 0;
    
    final inParts = timeIn.split(':');
    final outParts = timeOut.split(':');
    
    if (inParts.length != 2 || outParts.length != 2) return 0;
    
    final inH = int.tryParse(inParts[0]) ?? 0;
    final inM = int.tryParse(inParts[1]) ?? 0;
    final outH = int.tryParse(outParts[0]) ?? 0;
    final outM = int.tryParse(outParts[1]) ?? 0;
    
    final startMinutes = inH * 60 + inM;
    final endMinutes = outH * 60 + outM;
    final breakMinutes = int.tryParse(breakMins) ?? 0;
    final totalMinutes = endMinutes - startMinutes - breakMinutes;
    
    return (totalMinutes / 60).clamp(0, double.infinity);
  }

  static double getWeekSummary(List<TimesheetEntry> entries) {
    final today = DateTime.now();
    final weekStart = DateTime(today.year, today.month, today.day - today.weekday);
    
    final thisWeekEntries = entries.where((e) {
      final entryDate = DateTime.parse(e.date);
      return entryDate.isAfter(weekStart) || entryDate.isAtSameMomentAs(weekStart);
    }).toList();
    
    return thisWeekEntries.fold(0.0, (sum, entry) => sum + double.tryParse(entry.hours) ?? 0);
  }

  static double getTotalHours(List<TimesheetEntry> entries) {
    return entries.fold(0.0, (sum, entry) => sum + double.tryParse(entry.hours) ?? 0);
  }
}
