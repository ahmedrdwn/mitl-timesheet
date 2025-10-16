import 'timesheet_entry.dart';

class AppData {
  final String employeeName;
  final String studentNumber;
  final List<TimesheetEntry> entries;
  final String lastSaved;

  AppData({
    required this.employeeName,
    required this.studentNumber,
    required this.entries,
    required this.lastSaved,
  });

  Map<String, dynamic> toJson() {
    return {
      'employeeName': employeeName,
      'studentNumber': studentNumber,
      'entries': entries.map((e) => e.toJson()).toList(),
      'lastSaved': lastSaved,
    };
  }

  factory AppData.fromJson(Map<String, dynamic> json) {
    return AppData(
      employeeName: json['employeeName'] ?? '',
      studentNumber: json['studentNumber'] ?? '',
      entries: (json['entries'] as List<dynamic>?)
          ?.map((e) => TimesheetEntry.fromJson(e))
          .toList() ?? [],
      lastSaved: json['lastSaved'] ?? '',
    );
  }

  AppData copyWith({
    String? employeeName,
    String? studentNumber,
    List<TimesheetEntry>? entries,
    String? lastSaved,
  }) {
    return AppData(
      employeeName: employeeName ?? this.employeeName,
      studentNumber: studentNumber ?? this.studentNumber,
      entries: entries ?? this.entries,
      lastSaved: lastSaved ?? this.lastSaved,
    );
  }
}
