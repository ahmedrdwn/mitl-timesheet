import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import '../models/timesheet_entry.dart';
import '../models/app_data.dart';
import '../services/storage_service.dart';
import '../utils/time_utils.dart';

class AddEntryScreen extends StatefulWidget {
  const AddEntryScreen({super.key});

  @override
  State<AddEntryScreen> createState() => _AddEntryScreenState();
}

class _AddEntryScreenState extends State<AddEntryScreen> {
  final _formKey = GlobalKey<FormState>();
  final _dateController = TextEditingController();
  final _timeInController = TextEditingController();
  final _timeOutController = TextEditingController();
  final _breakController = TextEditingController();
  final _taskController = TextEditingController();

  AppData _data = AppData(
    employeeName: '',
    studentNumber: '',
    entries: [],
    lastSaved: '',
  );

  @override
  void initState() {
    super.initState();
    _dateController.text = DateFormat('yyyy-MM-dd').format(DateTime.now());
    _breakController.text = '0';
    _loadData();
  }

  @override
  void dispose() {
    _dateController.dispose();
    _timeInController.dispose();
    _timeOutController.dispose();
    _breakController.dispose();
    _taskController.dispose();
    super.dispose();
  }

  Future<void> _loadData() async {
    try {
      final data = await StorageService.loadData();
      setState(() {
        _data = data;
      });
    } catch (error) {
      print('Error loading data: $error');
    }
  }

  Future<void> _addEntry() async {
    if (!_formKey.currentState!.validate()) return;

    if (_data.employeeName.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Please set your name in Settings first')),
      );
      return;
    }

    try {
      final hours = TimeUtils.calculateHours(
        _timeInController.text,
        _timeOutController.text,
        _breakController.text,
      );

      final entryDate = DateTime.parse(_dateController.text);
      final dayOfWeek = DateFormat('EEE').format(entryDate);

      final newEntry = TimesheetEntry(
        id: DateTime.now().millisecondsSinceEpoch,
        date: _dateController.text,
        timeIn: _timeInController.text,
        timeOut: _timeOutController.text,
        breakMinutes: _breakController.text,
        task: _taskController.text,
        day: dayOfWeek,
        hours: hours.toStringAsFixed(2),
      );

      final updatedEntries = [..._data.entries, newEntry]
          ..sort((a, b) => b.date.compareTo(a.date));

      final updatedData = _data.copyWith(entries: updatedEntries);
      await StorageService.saveData(updatedData);

      // Clear form
      _timeInController.clear();
      _timeOutController.clear();
      _breakController.text = '0';
      _taskController.clear();

      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Entry saved successfully!')),
        );
      }
    } catch (error) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Failed to save entry: $error')),
        );
      }
    }
  }

  double get _calculatedHours {
    if (_timeInController.text.isEmpty || _timeOutController.text.isEmpty) {
      return 0;
    }
    return TimeUtils.calculateHours(
      _timeInController.text,
      _timeOutController.text,
      _breakController.text,
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFF3F4F6),
      body: SingleChildScrollView(
        child: Container(
          margin: const EdgeInsets.all(16),
          decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.circular(12),
            boxShadow: [
              BoxShadow(
                color: Colors.black.withOpacity(0.1),
                blurRadius: 4,
                offset: const Offset(0, 2),
              ),
            ],
          ),
          child: Form(
            key: _formKey,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                // Header
                Container(
                  padding: const EdgeInsets.all(20),
                  decoration: const BoxDecoration(
                    border: Border(
                      bottom: BorderSide(color: Color(0xFFE5E7EB)),
                    ),
                  ),
                  child: Row(
                    children: [
                      const Icon(Icons.add, color: Color(0xFF374151)),
                      const SizedBox(width: 8),
                      const Text(
                        'New Entry',
                        style: TextStyle(
                          fontSize: 20,
                          fontWeight: FontWeight.bold,
                          color: Color(0xFF374151),
                        ),
                      ),
                    ],
                  ),
                ),

                // Form
                Padding(
                  padding: const EdgeInsets.all(20),
                  child: Column(
                    children: [
                      // Date
                      _buildInputField(
                        label: 'Date',
                        controller: _dateController,
                        validator: (value) {
                          if (value == null || value.isEmpty) {
                            return 'Please enter a date';
                          }
                          return null;
                        },
                      ),

                      const SizedBox(height: 20),

                      // Time inputs
                      Row(
                        children: [
                          Expanded(
                            child: _buildInputField(
                              label: 'Time In',
                              controller: _timeInController,
                              hintText: 'HH:MM',
                              validator: (value) {
                                if (value == null || value.isEmpty) {
                                  return 'Required';
                                }
                                return null;
                              },
                            ),
                          ),
                          const SizedBox(width: 12),
                          Expanded(
                            child: _buildInputField(
                              label: 'Time Out',
                              controller: _timeOutController,
                              hintText: 'HH:MM',
                              validator: (value) {
                                if (value == null || value.isEmpty) {
                                  return 'Required';
                                }
                                return null;
                              },
                            ),
                          ),
                        ],
                      ),

                      const SizedBox(height: 20),

                      // Break minutes
                      _buildInputField(
                        label: 'Break (minutes)',
                        controller: _breakController,
                        keyboardType: TextInputType.number,
                        validator: (value) {
                          if (value == null || value.isEmpty) {
                            return 'Please enter break minutes';
                          }
                          return null;
                        },
                      ),

                      const SizedBox(height: 20),

                      // Task description
                      _buildInputField(
                        label: 'Task Description',
                        controller: _taskController,
                        hintText: 'What did you work on?',
                        maxLines: 4,
                      ),

                      const SizedBox(height: 20),

                      // Calculated hours display
                      if (_timeInController.text.isNotEmpty && _timeOutController.text.isNotEmpty)
                        Container(
                          width: double.infinity,
                          padding: const EdgeInsets.all(16),
                          decoration: BoxDecoration(
                            color: const Color(0xFFF0FDF4),
                            border: Border.all(color: const Color(0xFFBBF7D0)),
                            borderRadius: BorderRadius.circular(8),
                          ),
                          child: Column(
                            children: [
                              const Text(
                                'Calculated Hours',
                                style: TextStyle(
                                  fontSize: 14,
                                  color: Color(0xFF6B7280),
                                ),
                              ),
                              const SizedBox(height: 4),
                              Text(
                                '${_calculatedHours.toStringAsFixed(2)}h',
                                style: const TextStyle(
                                  fontSize: 32,
                                  fontWeight: FontWeight.bold,
                                  color: Color(0xFF10B981),
                                ),
                              ),
                            ],
                          ),
                        ),

                      const SizedBox(height: 20),

                      // Save button
                      SizedBox(
                        width: double.infinity,
                        child: ElevatedButton.icon(
                          onPressed: _addEntry,
                          icon: const Icon(Icons.check, color: Colors.white),
                          label: const Text(
                            'Save Entry',
                            style: TextStyle(color: Colors.white, fontSize: 18),
                          ),
                          style: ElevatedButton.styleFrom(
                            backgroundColor: const Color(0xFF10B981),
                            padding: const EdgeInsets.all(16),
                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(12),
                            ),
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildInputField({
    required String label,
    required TextEditingController controller,
    String? hintText,
    TextInputType? keyboardType,
    int maxLines = 1,
    String? Function(String?)? validator,
  }) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          label,
          style: const TextStyle(
            fontSize: 14,
            fontWeight: FontWeight.w600,
            color: Color(0xFF374151),
          ),
        ),
        const SizedBox(height: 8),
        TextFormField(
          controller: controller,
          decoration: InputDecoration(
            hintText: hintText,
            border: OutlineInputBorder(
              borderRadius: BorderRadius.circular(8),
              borderSide: const BorderSide(color: Color(0xFFD1D5DB), width: 2),
            ),
            enabledBorder: OutlineInputBorder(
              borderRadius: BorderRadius.circular(8),
              borderSide: const BorderSide(color: Color(0xFFD1D5DB), width: 2),
            ),
            focusedBorder: OutlineInputBorder(
              borderRadius: BorderRadius.circular(8),
              borderSide: const BorderSide(color: Color(0xFF7F1734), width: 2),
            ),
            contentPadding: const EdgeInsets.all(12),
          ),
          keyboardType: keyboardType,
          maxLines: maxLines,
          validator: validator,
          onChanged: (value) {
            setState(() {}); // Rebuild to show calculated hours
          },
        ),
      ],
    );
  }
}
