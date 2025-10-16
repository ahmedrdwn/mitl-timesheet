import 'dart:io';
import 'package:excel/excel.dart';
import 'package:path_provider/path_provider.dart';
import 'package:share_plus/share_plus.dart';
import '../models/timesheet_entry.dart';

class ExcelService {
  static Future<void> exportToExcel(
    List<TimesheetEntry> entries,
    String employeeName,
    String studentNumber,
  ) async {
    if (entries.isEmpty) {
      throw Exception('No entries to export');
    }

    final excel = Excel.createExcel();
    final sheet = excel['Timesheet'];

    // Header information
    sheet.cell(CellIndex.indexByString('A1')).value = TextCellValue('McMaster University');
    sheet.cell(CellIndex.indexByString('A2')).value = TextCellValue('Manufacturing Innovation Technology Lab (MITL)');
    sheet.cell(CellIndex.indexByString('A3')).value = TextCellValue('Student Employee Timesheet');
    sheet.cell(CellIndex.indexByString('A5')).value = TextCellValue('Student Name: ${employeeName.isEmpty ? 'N/A' : employeeName}');
    sheet.cell(CellIndex.indexByString('A6')).value = TextCellValue('Student Number: ${studentNumber.isEmpty ? 'N/A' : studentNumber}');
    
    final startDate = entries.isNotEmpty ? entries.last.date : 'N/A';
    final endDate = entries.isNotEmpty ? entries.first.date : 'N/A';
    sheet.cell(CellIndex.indexByString('A7')).value = TextCellValue('Pay Period: $startDate to $endDate');
    sheet.cell(CellIndex.indexByString('A8')).value = TextCellValue('Generated: ${DateTime.now().toString()}');

    // Column headers
    final headers = ['Date', 'Day', 'Time In', 'Time Out', 'Break (min)', 'Total Hours', 'Task/Project Description'];
    for (int i = 0; i < headers.length; i++) {
      sheet.cell(CellIndex.indexByString('A${10 + i}')).value = TextCellValue(headers[i]);
    }

    // Data rows
    final reversedEntries = entries.reversed.toList();
    for (int i = 0; i < reversedEntries.length; i++) {
      final entry = reversedEntries[i];
      final rowIndex = 11 + i;
      
      sheet.cell(CellIndex.indexByString('A$rowIndex')).value = TextCellValue(entry.date);
      sheet.cell(CellIndex.indexByString('B$rowIndex')).value = TextCellValue(entry.day);
      sheet.cell(CellIndex.indexByString('C$rowIndex')).value = TextCellValue(entry.timeIn);
      sheet.cell(CellIndex.indexByString('D$rowIndex')).value = TextCellValue(entry.timeOut);
      sheet.cell(CellIndex.indexByString('E$rowIndex')).value = TextCellValue(entry.breakMinutes);
      sheet.cell(CellIndex.indexByString('F$rowIndex')).value = TextCellValue(entry.hours);
      sheet.cell(CellIndex.indexByString('G$rowIndex')).value = TextCellValue(entry.task);
    }

    // Total hours
    final totalHours = entries.fold(0.0, (sum, entry) => sum + (double.tryParse(entry.hours) ?? 0.0));
    final totalRowIndex = 11 + entries.length + 1;
    sheet.cell(CellIndex.indexByString('F$totalRowIndex')).value = TextCellValue('TOTAL HOURS:');
    sheet.cell(CellIndex.indexByString('G$totalRowIndex')).value = TextCellValue(totalHours.toStringAsFixed(2));

    // Signatures
    final signatureRowIndex = totalRowIndex + 2;
    sheet.cell(CellIndex.indexByString('A$signatureRowIndex')).value = TextCellValue('Student Signature: _________________________');
    sheet.cell(CellIndex.indexByString('E$signatureRowIndex')).value = TextCellValue('Date: _________________________');
    
    final supervisorRowIndex = signatureRowIndex + 1;
    sheet.cell(CellIndex.indexByString('A$supervisorRowIndex')).value = TextCellValue('Supervisor Signature: _________________________');
    sheet.cell(CellIndex.indexByString('E$supervisorRowIndex')).value = TextCellValue('Date: _________________________');

    // Save file
    final directory = await getApplicationDocumentsDirectory();
    final fileName = 'MITL_Timesheet_${employeeName.replaceAll(' ', '_').isEmpty ? 'Student' : employeeName.replaceAll(' ', '_')}_${DateTime.now().toIso8601String().split('T')[0]}.xlsx';
    final filePath = '${directory.path}/$fileName';
    
    final fileBytes = excel.save();
    if (fileBytes != null) {
      final file = File(filePath);
      await file.writeAsBytes(fileBytes);
      
      // Share the file
      await Share.shareXFiles([XFile(filePath)], text: 'Please find attached your timesheet');
    }
  }
}
