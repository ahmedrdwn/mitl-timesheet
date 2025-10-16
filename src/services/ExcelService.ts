import * as XLSX from 'xlsx';
import RNFS from 'react-native-fs';
import Share from 'react-native-share';
import { TimesheetEntry } from './StorageService';

export const ExcelService = {
  async exportToExcel(
    entries: TimesheetEntry[],
    employeeName: string,
    studentNumber: string
  ): Promise<void> {
    if (entries.length === 0) {
      throw new Error('No entries to export');
    }

    const wb = XLSX.utils.book_new();
    
    const startDate = entries.length > 0 ? entries[entries.length - 1].date : 'N/A';
    const endDate = entries.length > 0 ? entries[0].date : 'N/A';
    
    const data = [
      ['McMaster University'],
      ['Manufacturing Innovation Technology Lab (MITL)'],
      ['Student Employee Timesheet'],
      [''],
      [`Student Name: ${employeeName || 'N/A'}`],
      [`Student Number: ${studentNumber || 'N/A'}`],
      [`Pay Period: ${startDate} to ${endDate}`],
      [`Generated: ${new Date().toLocaleString()}`],
      [''],
      ['Date', 'Day', 'Time In', 'Time Out', 'Break (min)', 'Total Hours', 'Task/Project Description']
    ];

    entries.slice().reverse().forEach(entry => {
      data.push([
        entry.date,
        entry.day,
        entry.timeIn,
        entry.timeOut,
        entry.breakMinutes,
        entry.hours,
        entry.task
      ]);
    });

    const totalHours = entries.reduce((sum, entry) => sum + parseFloat(entry.hours || 0), 0);

    data.push(['']);
    data.push(['', '', '', '', '', 'TOTAL HOURS:', totalHours.toFixed(2)]);
    data.push(['']);
    data.push(['Student Signature: _________________________', '', '', 'Date: _________________________']);
    data.push(['']);
    data.push(['Supervisor Signature: _________________________', '', '', 'Date: _________________________']);
    data.push(['']);
    data.push(['Notes/Comments:']);

    const ws = XLSX.utils.aoa_to_sheet(data);

    // Apply styling
    ws['!cols'] = [
      { wch: 12 }, { wch: 10 }, { wch: 10 }, { wch: 10 }, 
      { wch: 12 }, { wch: 12 }, { wch: 45 }
    ];

    XLSX.utils.book_append_sheet(wb, ws, 'Timesheet');
    
    const fileName = `MITL_Timesheet_${employeeName.replace(/\s+/g, '_') || 'Student'}_${new Date().toISOString().split('T')[0]}.xlsx`;
    const filePath = `${RNFS.DocumentDirectoryPath}/${fileName}`;
    
    const wbout = XLSX.write(wb, { type: 'binary', bookType: 'xlsx' });
    
    // Convert to base64
    const base64 = btoa(wbout);
    
    // Write file
    await RNFS.writeFile(filePath, base64, 'base64');
    
    // Share the file
    const shareOptions = {
      title: 'MITL Timesheet',
      message: 'Please find attached your timesheet',
      url: `file://${filePath}`,
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    };
    
    await Share.open(shareOptions);
  },
};


