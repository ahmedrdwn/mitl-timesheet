class TimesheetEntry {
  final int id;
  final String date;
  final String timeIn;
  final String timeOut;
  final String breakMinutes;
  final String task;
  final String day;
  final String hours;

  TimesheetEntry({
    required this.id,
    required this.date,
    required this.timeIn,
    required this.timeOut,
    required this.breakMinutes,
    required this.task,
    required this.day,
    required this.hours,
  });

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'date': date,
      'timeIn': timeIn,
      'timeOut': timeOut,
      'breakMinutes': breakMinutes,
      'task': task,
      'day': day,
      'hours': hours,
    };
  }

  factory TimesheetEntry.fromJson(Map<String, dynamic> json) {
    return TimesheetEntry(
      id: json['id'],
      date: json['date'],
      timeIn: json['timeIn'],
      timeOut: json['timeOut'],
      breakMinutes: json['breakMinutes'],
      task: json['task'],
      day: json['day'],
      hours: json['hours'],
    );
  }
}
