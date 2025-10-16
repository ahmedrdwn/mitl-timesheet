import 'package:flutter/material.dart';
import '../models/app_data.dart';
import '../models/timesheet_entry.dart';
import '../services/storage_service.dart';
import '../utils/time_utils.dart';

class AllEntriesScreen extends StatefulWidget {
  const AllEntriesScreen({super.key});

  @override
  State<AllEntriesScreen> createState() => _AllEntriesScreenState();
}

class _AllEntriesScreenState extends State<AllEntriesScreen> {
  AppData _data = AppData(
    employeeName: '',
    studentNumber: '',
    entries: [],
    lastSaved: '',
  );
  bool _isLoading = true;

  @override
  void initState() {
    super.initState();
    _loadData();
  }

  Future<void> _loadData() async {
    try {
      final data = await StorageService.loadData();
      setState(() {
        _data = data;
        _isLoading = false;
      });
    } catch (error) {
      print('Error loading data: $error');
      setState(() {
        _isLoading = false;
      });
    }
  }

  Future<void> _deleteEntry(int id) async {
    final updatedEntries = _data.entries.where((e) => e.id != id).toList();
    final updatedData = _data.copyWith(entries: updatedEntries);
    
    await StorageService.saveData(updatedData);
    setState(() {
      _data = updatedData;
    });
  }

  @override
  Widget build(BuildContext context) {
    if (_isLoading) {
      return const Scaffold(
        body: Center(child: CircularProgressIndicator()),
      );
    }

    final totalHours = TimeUtils.getTotalHours(_data.entries);

    return Scaffold(
      backgroundColor: const Color(0xFFF3F4F6),
      body: RefreshIndicator(
        onRefresh: _loadData,
        child: CustomScrollView(
          slivers: [
            // Entries Container
            SliverToBoxAdapter(
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
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    // Header
                    Container(
                      padding: const EdgeInsets.all(16),
                      decoration: const BoxDecoration(
                        border: Border(
                          bottom: BorderSide(color: Color(0xFFE5E7EB)),
                        ),
                      ),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Row(
                            children: [
                              const Icon(Icons.bar_chart, color: Color(0xFF374151)),
                              const SizedBox(width: 8),
                              Text(
                                'All Entries (${_data.entries.length})',
                                style: const TextStyle(
                                  fontSize: 16,
                                  fontWeight: FontWeight.bold,
                                  color: Color(0xFF374151),
                                ),
                              ),
                            ],
                          ),
                          Text(
                            '${totalHours.toStringAsFixed(2)}h',
                            style: const TextStyle(
                              fontSize: 20,
                              fontWeight: FontWeight.bold,
                              color: Color(0xFF7F1734),
                            ),
                          ),
                        ],
                      ),
                    ),

                    // Entries List or Empty State
                    if (_data.entries.isEmpty)
                      const Padding(
                        padding: EdgeInsets.all(32),
                        child: Column(
                          children: [
                            Icon(Icons.description, size: 48, color: Color(0xFF9CA3AF)),
                            SizedBox(height: 12),
                            Text(
                              'No entries yet',
                              style: TextStyle(
                                fontSize: 16,
                                color: Color(0xFF6B7280),
                              ),
                            ),
                          ],
                        ),
                      )
                    else
                      ..._data.entries.map((entry) => _buildEntryItem(entry)),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildEntryItem(TimesheetEntry entry) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: const BoxDecoration(
        border: Border(
          bottom: BorderSide(color: Color(0xFFF3F4F6)),
        ),
      ),
      child: Row(
        children: [
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  '${entry.date} · ${entry.day}',
                  style: const TextStyle(
                    fontSize: 16,
                    fontWeight: FontWeight.w600,
                    color: Color(0xFF374151),
                  ),
                ),
                const SizedBox(height: 4),
                Text(
                  '${entry.timeIn} → ${entry.timeOut} (Break: ${entry.breakMinutes}min)',
                  style: const TextStyle(
                    fontSize: 14,
                    color: Color(0xFF6B7280),
                  ),
                ),
                if (entry.task.isNotEmpty) ...[
                  const SizedBox(height: 8),
                  Container(
                    padding: const EdgeInsets.all(8),
                    decoration: BoxDecoration(
                      color: const Color(0xFFF9FAFB),
                      borderRadius: BorderRadius.circular(6),
                    ),
                    child: Text(
                      entry.task,
                      style: const TextStyle(
                        fontSize: 14,
                        color: Color(0xFF374151),
                      ),
                    ),
                  ),
                ],
              ],
            ),
          ),
          Column(
            crossAxisAlignment: CrossAxisAlignment.end,
            children: [
              Text(
                '${entry.hours}h',
                style: const TextStyle(
                  fontSize: 20,
                  fontWeight: FontWeight.bold,
                  color: Color(0xFF10B981),
                ),
              ),
              const SizedBox(height: 8),
              GestureDetector(
                onTap: () => _showDeleteDialog(entry.id),
                child: Container(
                  padding: const EdgeInsets.all(8),
                  decoration: BoxDecoration(
                    color: const Color(0xFFFEE2E2),
                    borderRadius: BorderRadius.circular(8),
                  ),
                  child: const Icon(
                    Icons.delete,
                    size: 16,
                    color: Color(0xFFDC2626),
                  ),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }

  void _showDeleteDialog(int entryId) {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: const Text('Delete Entry'),
          content: const Text('Are you sure you want to delete this entry?'),
          actions: [
            TextButton(
              onPressed: () => Navigator.of(context).pop(),
              child: const Text('Cancel'),
            ),
            TextButton(
              onPressed: () {
                Navigator.of(context).pop();
                _deleteEntry(entryId);
              },
              style: TextButton.styleFrom(
                foregroundColor: const Color(0xFFDC2626),
              ),
              child: const Text('Delete'),
            ),
          ],
        );
      },
    );
  }
}
