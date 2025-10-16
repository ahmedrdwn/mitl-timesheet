import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  RefreshControl,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { StorageService, TimesheetEntry, AppData } from '../services/StorageService';
import { getWeekSummary, getTotalHours } from '../utils/TimeUtils';
import { ExcelService } from '../services/ExcelService';

const HomeScreen: React.FC = () => {
  const [data, setData] = useState<AppData>({
    employeeName: '',
    studentNumber: '',
    entries: [],
    lastSaved: '',
  });
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const appData = await StorageService.loadData();
      setData(appData);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  const deleteEntry = async (id: number) => {
    Alert.alert(
      'Delete Entry',
      'Are you sure you want to delete this entry?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            const updatedEntries = data.entries.filter(e => e.id !== id);
            await StorageService.saveData({ entries: updatedEntries });
            setData(prev => ({ ...prev, entries: updatedEntries }));
          },
        },
      ]
    );
  };

  const exportToExcel = async () => {
    try {
      if (data.entries.length === 0) {
        Alert.alert('No Entries', 'No entries to export');
        return;
      }
      await ExcelService.exportToExcel(data.entries, data.employeeName, data.studentNumber);
    } catch (error) {
      Alert.alert('Export Error', 'Failed to export timesheet');
      console.error('Export error:', error);
    }
  };

  const totalHours = getTotalHours(data.entries);
  const weekHours = getWeekSummary(data.entries);

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {/* Header Stats */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.headerTitle}>MITL Timesheet</Text>
            <Text style={styles.headerSubtitle}>McMaster University</Text>
          </View>
          <View style={styles.headerStats}>
            <Text style={styles.totalHours}>{totalHours.toFixed(1)}h</Text>
            <Text style={styles.totalLabel}>Total</Text>
          </View>
        </View>
      </View>

      {/* Quick Stats */}
      <View style={styles.statsContainer}>
        <View style={[styles.statCard, styles.weekCard]}>
          <Text style={styles.statLabel}>This Week</Text>
          <Text style={styles.statValue}>{weekHours.toFixed(1)}h</Text>
        </View>
        <View style={[styles.statCard, styles.entriesCard]}>
          <Text style={styles.statLabel}>Entries</Text>
          <Text style={styles.statValue}>{data.entries.length}</Text>
        </View>
      </View>

      {/* Recent Entries */}
      <View style={styles.entriesContainer}>
        <View style={styles.entriesHeader}>
          <Icon name="description" size={20} color="#374151" />
          <Text style={styles.entriesTitle}>Recent Entries</Text>
        </View>
        
        {data.entries.length === 0 ? (
          <View style={styles.emptyState}>
            <Icon name="schedule" size={48} color="#9CA3AF" />
            <Text style={styles.emptyText}>No entries yet</Text>
            <Text style={styles.emptySubtext}>Tap + to add your first entry</Text>
          </View>
        ) : (
          <View style={styles.entriesList}>
            {data.entries.slice(0, 5).map((entry) => (
              <View key={entry.id} style={styles.entryItem}>
                <View style={styles.entryContent}>
                  <Text style={styles.entryDate}>
                    {entry.date} · {entry.day}
                  </Text>
                  <Text style={styles.entryTime}>
                    {entry.timeIn} → {entry.timeOut}
                  </Text>
                  {entry.task && (
                    <Text style={styles.entryTask} numberOfLines={2}>
                      {entry.task}
                    </Text>
                  )}
                </View>
                <View style={styles.entryActions}>
                  <Text style={styles.entryHours}>{entry.hours}h</Text>
                  <TouchableOpacity
                    onPress={() => deleteEntry(entry.id)}
                    style={styles.deleteButton}
                  >
                    <Text style={styles.deleteText}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        )}
      </View>

      {/* Export Button */}
      {data.entries.length > 0 && (
        <TouchableOpacity style={styles.exportButton} onPress={exportToExcel}>
          <Icon name="download" size={24} color="white" />
          <Text style={styles.exportButtonText}>Download Excel File</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  header: {
    backgroundColor: '#7F1734',
    padding: 16,
    paddingTop: 20,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#FECACA',
  },
  headerStats: {
    alignItems: 'flex-end',
  },
  totalHours: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  totalLabel: {
    fontSize: 12,
    color: '#FECACA',
  },
  statsContainer: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
  },
  statCard: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  weekCard: {
    backgroundColor: '#3B82F6',
  },
  entriesCard: {
    backgroundColor: '#10B981',
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: 'white',
    opacity: 0.9,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 4,
  },
  entriesContainer: {
    backgroundColor: 'white',
    margin: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  entriesHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    gap: 8,
  },
  entriesTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#374151',
  },
  emptyState: {
    alignItems: 'center',
    padding: 32,
  },
  emptyText: {
    fontSize: 16,
    color: '#6B7280',
    marginTop: 12,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#9CA3AF',
    marginTop: 4,
  },
  entriesList: {
    paddingBottom: 16,
  },
  entryItem: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  entryContent: {
    flex: 1,
  },
  entryDate: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
  },
  entryTime: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  entryTask: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  entryActions: {
    alignItems: 'flex-end',
    marginLeft: 12,
  },
  entryHours: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#10B981',
  },
  deleteButton: {
    marginTop: 4,
  },
  deleteText: {
    fontSize: 12,
    color: '#DC2626',
    fontWeight: '600',
  },
  exportButton: {
    backgroundColor: '#7F1734',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  exportButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;


