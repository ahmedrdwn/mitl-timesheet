import React, { useState, useEffect } from 'react';
import { Download, Plus, Trash2, Clock, Calendar, Save, User, FileText, Menu, Home, BarChart3, Settings, Upload, Check } from 'lucide-react';
import * as XLSX from 'xlsx';

export default function MobileTimesheetApp() {
  const [currentView, setCurrentView] = useState('home');
  const [employeeName, setEmployeeName] = useState('');
  const [studentNumber, setStudentNumber] = useState('');
  const [entries, setEntries] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [currentEntry, setCurrentEntry] = useState({
    date: new Date().toISOString().split('T')[0],
    timeIn: '',
    timeOut: '',
    breakMinutes: '0',
    task: ''
  });

  // Load data on mount
  useEffect(() => {
    loadData();
  }, []);

  const saveData = (data) => {
    window.timesheetAppData = {
      employeeName: data.employeeName || employeeName,
      studentNumber: data.studentNumber || studentNumber,
      entries: data.entries || entries,
      lastSaved: new Date().toISOString()
    };
  };

  const loadData = () => {
    const saved = window.timesheetAppData;
    if (saved) {
      setEmployeeName(saved.employeeName || '');
      setStudentNumber(saved.studentNumber || '');
      setEntries(saved.entries || []);
    }
  };

  const calculateHours = (timeIn, timeOut, breakMins) => {
    if (!timeIn || !timeOut) return 0;
    const [inH, inM] = timeIn.split(':').map(Number);
    const [outH, outM] = timeOut.split(':').map(Number);
    const startMinutes = inH * 60 + inM;
    const endMinutes = outH * 60 + outM;
    const totalMinutes = endMinutes - startMinutes - (parseInt(breakMins) || 0);
    return Math.max(0, totalMinutes / 60);
  };

  const addEntry = () => {
    if (!currentEntry.timeIn || !currentEntry.timeOut) {
      alert('⚠️ Please fill in Time In and Time Out');
      return;
    }

    if (!employeeName) {
      alert('⚠️ Please set your name in Settings first');
      setCurrentView('settings');
      return;
    }

    const hours = calculateHours(currentEntry.timeIn, currentEntry.timeOut, currentEntry.breakMinutes);
    const dayOfWeek = new Date(currentEntry.date).toLocaleDateString('en-US', { weekday: 'short' });
    
    const newEntry = {
      ...currentEntry,
      day: dayOfWeek,
      hours: hours.toFixed(2),
      id: Date.now()
    };

    const updatedEntries = [...entries, newEntry].sort((a, b) => new Date(b.date) - new Date(a.date));
    setEntries(updatedEntries);
    
    saveData({ entries: updatedEntries });

    setCurrentEntry({
      date: new Date().toISOString().split('T')[0],
      timeIn: '',
      timeOut: '',
      breakMinutes: '0',
      task: ''
    });

    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
    setCurrentView('home');
  };

  const deleteEntry = (id) => {
    if (confirm('Delete this entry?')) {
      const updatedEntries = entries.filter(e => e.id !== id);
      setEntries(updatedEntries);
      saveData({ entries: updatedEntries });
    }
  };

  const saveProfile = () => {
    if (!employeeName) {
      alert('⚠️ Please enter your name');
      return;
    }
    saveData({ employeeName, studentNumber });
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  const clearAllData = () => {
    if (confirm('⚠️ Delete all entries? This cannot be undone!')) {
      setEntries([]);
      saveData({ entries: [] });
      alert('✓ All entries cleared');
    }
  };

  const totalHours = entries.reduce((sum, entry) => sum + parseFloat(entry.hours || 0), 0);

  const exportToExcel = () => {
    if (entries.length === 0) {
      alert('⚠️ No entries to export');
      return;
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

    data.push(['']);
    data.push(['', '', '', '', '', 'TOTAL HOURS:', totalHours.toFixed(2)]);
    data.push(['']);
    data.push(['Student Signature: _________________________', '', '', 'Date: _________________________']);
    data.push(['']);
    data.push(['Supervisor Signature: _________________________', '', '', 'Date: _________________________']);
    data.push(['']);
    data.push(['Notes/Comments:']);

    const ws = XLSX.utils.aoa_to_sheet(data);

    ws['!cols'] = [
      { wch: 12 }, { wch: 10 }, { wch: 10 }, { wch: 10 }, 
      { wch: 12 }, { wch: 12 }, { wch: 45 }
    ];

    ws['!merges'] = [
      { s: { r: 0, c: 0 }, e: { r: 0, c: 6 } },
      { s: { r: 1, c: 0 }, e: { r: 1, c: 6 } },
      { s: { r: 2, c: 0 }, e: { r: 2, c: 6 } }
    ];

    for (let R = 0; R < data.length; R++) {
      for (let C = 0; C < 7; C++) {
        const cellRef = XLSX.utils.encode_cell({ r: R, c: C });
        if (!ws[cellRef]) ws[cellRef] = { v: '' };
        
        ws[cellRef].s = { font: {}, fill: {}, alignment: {}, border: {} };

        if (R <= 2) {
          ws[cellRef].s = {
            font: { bold: true, sz: R === 0 ? 16 : 14, color: { rgb: 'FFFFFF' } },
            fill: { fgColor: { rgb: '7F1734' } },
            alignment: { horizontal: 'center', vertical: 'center' }
          };
        } else if (R >= 4 && R <= 7) {
          ws[cellRef].s = {
            font: { sz: 11, bold: true },
            alignment: { horizontal: 'left' }
          };
        } else if (R === 9) {
          ws[cellRef].s = {
            font: { bold: true, sz: 11, color: { rgb: 'FFFFFF' } },
            fill: { fgColor: { rgb: '404040' } },
            alignment: { horizontal: 'center', vertical: 'center' },
            border: {
              top: { style: 'thin' }, bottom: { style: 'thin' },
              left: { style: 'thin' }, right: { style: 'thin' }
            }
          };
        } else if (R > 9 && R < 10 + entries.length) {
          ws[cellRef].s = {
            font: { sz: 10 },
            fill: { fgColor: { rgb: (R - 10) % 2 === 0 ? 'FFFFFF' : 'F9FAFB' } },
            alignment: { horizontal: 'center', vertical: 'center' },
            border: {
              top: { style: 'thin' }, bottom: { style: 'thin' },
              left: { style: 'thin' }, right: { style: 'thin' }
            }
          };
        } else if (R === 10 + entries.length + 1) {
          ws[cellRef].s = {
            font: { bold: true, sz: 12, color: { rgb: 'FFFFFF' } },
            fill: { fgColor: { rgb: '7F1734' } },
            alignment: { horizontal: 'center', vertical: 'center' }
          };
        }
      }
    }

    XLSX.utils.book_append_sheet(wb, ws, 'Timesheet');
    
    const fileName = `MITL_Timesheet_${employeeName.replace(/\s+/g, '_') || 'Student'}_${new Date().toISOString().split('T')[0]}.xlsx`;
    XLSX.writeFile(wb, fileName);
  };

  const getWeekSummary = () => {
    const today = new Date();
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - today.getDay());
    
    const thisWeekEntries = entries.filter(e => {
      const entryDate = new Date(e.date);
      return entryDate >= weekStart;
    });
    
    return thisWeekEntries.reduce((sum, e) => sum + parseFloat(e.hours), 0);
  };

  // Success notification
  const SuccessToast = () => (
    showSuccess && (
      <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2 z-50 animate-bounce">
        <Check size={20} />
        <span className="font-semibold">Saved!</span>
      </div>
    )
  );

  return (
    <div className="min-h-screen bg-gray-100 pb-20">
      <SuccessToast />

      {/* Header */}
      <div className="bg-gradient-to-r from-red-900 to-red-800 text-white p-4 shadow-lg sticky top-0 z-40">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">MITL Timesheet</h1>
            <p className="text-xs text-red-200">McMaster University</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold">{totalHours.toFixed(1)}h</p>
            <p className="text-xs text-red-200">Total</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pb-20">
        {/* HOME VIEW */}
        {currentView === 'home' && (
          <div className="p-4 space-y-4">
            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl p-4 shadow-lg">
                <p className="text-xs uppercase tracking-wide opacity-90">This Week</p>
                <p className="text-3xl font-bold">{getWeekSummary().toFixed(1)}h</p>
              </div>
              <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl p-4 shadow-lg">
                <p className="text-xs uppercase tracking-wide opacity-90">Entries</p>
                <p className="text-3xl font-bold">{entries.length}</p>
              </div>
            </div>

            {/* Recent Entries */}
            <div className="bg-white rounded-xl shadow-md">
              <div className="p-4 border-b border-gray-200">
                <h2 className="font-bold text-gray-800 flex items-center gap-2">
                  <FileText size={18} />
                  Recent Entries
                </h2>
              </div>
              <div className="divide-y divide-gray-200">
                {entries.length === 0 ? (
                  <div className="p-8 text-center text-gray-500">
                    <Clock size={48} className="mx-auto mb-3 opacity-30" />
                    <p>No entries yet</p>
                    <p className="text-sm mt-1">Tap + to add your first entry</p>
                  </div>
                ) : (
                  entries.slice(0, 5).map((entry) => (
                    <div key={entry.id} className="p-4 hover:bg-gray-50 active:bg-gray-100">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <p className="font-semibold text-gray-800">{entry.date} · {entry.day}</p>
                          <p className="text-sm text-gray-600 mt-1">{entry.timeIn} → {entry.timeOut}</p>
                          {entry.task && (
                            <p className="text-sm text-gray-500 mt-1 line-clamp-2">{entry.task}</p>
                          )}
                        </div>
                        <div className="text-right ml-3">
                          <p className="text-2xl font-bold text-green-600">{entry.hours}h</p>
                          <button
                            onClick={() => deleteEntry(entry.id)}
                            className="text-xs text-red-600 font-semibold mt-1"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Export Button */}
            {entries.length > 0 && (
              <button
                onClick={exportToExcel}
                className="w-full bg-gradient-to-r from-red-800 to-red-900 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-transform"
              >
                <Download size={24} />
                Download Excel File
              </button>
            )}
          </div>
        )}

        {/* ADD ENTRY VIEW */}
        {currentView === 'add' && (
          <div className="p-4 space-y-4">
            <div className="bg-white rounded-xl shadow-lg p-5">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Plus size={24} />
                New Entry
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Date</label>
                  <input
                    type="date"
                    value={currentEntry.date}
                    onChange={(e) => setCurrentEntry({...currentEntry, date: e.target.value})}
                    className="w-full p-3 border-2 border-gray-300 rounded-lg text-base"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Time In</label>
                    <input
                      type="time"
                      value={currentEntry.timeIn}
                      onChange={(e) => setCurrentEntry({...currentEntry, timeIn: e.target.value})}
                      className="w-full p-3 border-2 border-gray-300 rounded-lg text-base"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Time Out</label>
                    <input
                      type="time"
                      value={currentEntry.timeOut}
                      onChange={(e) => setCurrentEntry({...currentEntry, timeOut: e.target.value})}
                      className="w-full p-3 border-2 border-gray-300 rounded-lg text-base"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Break (minutes)</label>
                  <input
                    type="number"
                    value={currentEntry.breakMinutes}
                    onChange={(e) => setCurrentEntry({...currentEntry, breakMinutes: e.target.value})}
                    className="w-full p-3 border-2 border-gray-300 rounded-lg text-base"
                    min="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Task Description</label>
                  <textarea
                    value={currentEntry.task}
                    onChange={(e) => setCurrentEntry({...currentEntry, task: e.target.value})}
                    placeholder="What did you work on?"
                    className="w-full p-3 border-2 border-gray-300 rounded-lg text-base"
                    rows="4"
                  />
                </div>

                {currentEntry.timeIn && currentEntry.timeOut && (
                  <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4 text-center">
                    <p className="text-sm text-gray-600">Calculated Hours</p>
                    <p className="text-4xl font-bold text-green-600">
                      {calculateHours(currentEntry.timeIn, currentEntry.timeOut, currentEntry.breakMinutes).toFixed(2)}h
                    </p>
                  </div>
                )}

                <button
                  onClick={addEntry}
                  className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-transform"
                >
                  <Check size={24} />
                  Save Entry
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ALL ENTRIES VIEW */}
        {currentView === 'entries' && (
          <div className="p-4 space-y-4">
            <div className="bg-white rounded-xl shadow-lg">
              <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                <h2 className="font-bold text-gray-800 flex items-center gap-2">
                  <BarChart3 size={20} />
                  All Entries ({entries.length})
                </h2>
                <div className="text-right">
                  <p className="text-2xl font-bold text-red-800">{totalHours.toFixed(2)}h</p>
                </div>
              </div>
              <div className="divide-y divide-gray-200 max-h-[70vh] overflow-y-auto">
                {entries.length === 0 ? (
                  <div className="p-8 text-center text-gray-500">
                    <FileText size={48} className="mx-auto mb-3 opacity-30" />
                    <p>No entries yet</p>
                  </div>
                ) : (
                  entries.map((entry) => (
                    <div key={entry.id} className="p-4 hover:bg-gray-50">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <p className="font-semibold text-gray-800">{entry.date} · {entry.day}</p>
                          <p className="text-sm text-gray-600 mt-1">{entry.timeIn} → {entry.timeOut} (Break: {entry.breakMinutes}min)</p>
                          {entry.task && (
                            <p className="text-sm text-gray-700 mt-2 bg-gray-50 p-2 rounded">{entry.task}</p>
                          )}
                        </div>
                        <div className="text-right ml-3">
                          <p className="text-2xl font-bold text-green-600">{entry.hours}h</p>
                          <button
                            onClick={() => deleteEntry(entry.id)}
                            className="mt-2 p-2 bg-red-100 text-red-700 rounded-lg active:bg-red-200"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* SETTINGS VIEW */}
        {currentView === 'settings' && (
          <div className="p-4 space-y-4">
            <div className="bg-white rounded-xl shadow-lg p-5">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <User size={24} />
                Your Profile
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Student Name *</label>
                  <input
                    type="text"
                    value={employeeName}
                    onChange={(e) => setEmployeeName(e.target.value)}
                    placeholder="Your full name"
                    className="w-full p-3 border-2 border-gray-300 rounded-lg text-base"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Student Number</label>
                  <input
                    type="text"
                    value={studentNumber}
                    onChange={(e) => setStudentNumber(e.target.value)}
                    placeholder="Your student ID"
                    className="w-full p-3 border-2 border-gray-300 rounded-lg text-base"
                  />
                </div>
                <button
                  onClick={saveProfile}
                  className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 active:scale-95 transition-transform"
                >
                  <Save size={20} />
                  Save Profile
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-5">
              <h3 className="font-bold text-gray-800 mb-3">Cloud Storage Guide</h3>
              <div className="space-y-3 text-sm text-gray-700">
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="font-semibold text-blue-900">📱 After downloading Excel:</p>
                  <ol className="list-decimal list-inside mt-2 space-y-1">
                    <li>Open your Files/Downloads app</li>
                    <li>Find the MITL_Timesheet file</li>
                    <li>Tap Share icon</li>
                    <li>Choose: Google Drive, OneDrive, or Dropbox</li>
                  </ol>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-5">
              <h3 className="font-bold text-gray-800 mb-3 text-red-600">Danger Zone</h3>
              <button
                onClick={clearAllData}
                className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold active:bg-red-700"
              >
                Clear All Entries
              </button>
              <p className="text-xs text-gray-500 mt-2 text-center">This will delete all your work entries</p>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
        <div className="grid grid-cols-4 gap-1 p-2">
          <button
            onClick={() => setCurrentView('home')}
            className={`flex flex-col items-center justify-center py-3 rounded-lg transition-colors ${
              currentView === 'home' ? 'bg-red-100 text-red-800' : 'text-gray-600'
            }`}
          >
            <Home size={24} />
            <span className="text-xs mt-1 font-medium">Home</span>
          </button>
          <button
            onClick={() => setCurrentView('add')}
            className={`flex flex-col items-center justify-center py-3 rounded-lg transition-colors ${
              currentView === 'add' ? 'bg-red-100 text-red-800' : 'text-gray-600'
            }`}
          >
            <Plus size={24} />
            <span className="text-xs mt-1 font-medium">Add</span>
          </button>
          <button
            onClick={() => setCurrentView('entries')}
            className={`flex flex-col items-center justify-center py-3 rounded-lg transition-colors ${
              currentView === 'entries' ? 'bg-red-100 text-red-800' : 'text-gray-600'
            }`}
          >
            <BarChart3 size={24} />
            <span className="text-xs mt-1 font-medium">All</span>
          </button>
          <button
            onClick={() => setCurrentView('settings')}
            className={`flex flex-col items-center justify-center py-3 rounded-lg transition-colors ${
              currentView === 'settings' ? 'bg-red-100 text-red-800' : 'text-gray-600'
            }`}
          >
            <Settings size={24} />
            <span className="text-xs mt-1 font-medium">Settings</span>
          </button>
        </div>
      </div>
    </div>
  );
}