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
import { getTotalHours } from '../utils/TimeUtils';

const AllEntriesScreen: React.FC = () => {
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
            try {
              const updatedEntries = data.entries.filter(e => e.id !== id);
              await StorageService.saveData({ entries: updatedEntries });
              setData(prev => ({ ...prev, entries: updatedEntries }));
            } catch (error) {
              Alert.alert('Error', 'Failed to delete entry');
              console.error('Delete error:', error);
            }
          },
        },
      ]
    );
  };

  const totalHours = getTotalHours(data.entries);

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.entriesContainer}>
        <View style={styles.entriesHeader}>
          <View style={styles.headerLeft}>
            <Icon name="bar-chart" size={20} color="#374151" />
            <Text style={styles.entriesTitle}>All Entries ({data.entries.length})</Text>
          </View>
          <View style={styles.headerRight}>
            <Text style={styles.totalHours}>{totalHours.toFixed(2)}h</Text>
          </View>
        </View>

        {data.entries.length === 0 ? (
          <View style={styles.emptyState}>
            <Icon name="description" size={48} color="#9CA3AF" />
            <Text style={styles.emptyText}>No entries yet</Text>
          </View>
        ) : (
          <View style={styles.entriesList}>
            {data.entries.map((entry) => (
              <View key={entry.id} style={styles.entryItem}>
                <View style={styles.entryContent}>
                  <Text style={styles.entryDate}>
                    {entry.date} · {entry.day}
                  </Text>
                  <Text style={styles.entryTime}>
                    {entry.timeIn} → {entry.timeOut} (Break: {entry.breakMinutes}min)
                  </Text>
                  {entry.task && (
                    <View style={styles.taskContainer}>
                      <Text style={styles.entryTask}>{entry.task}</Text>
                    </View>
                  )}
                </View>
                <View style={styles.entryActions}>
                  <Text style={styles.entryHours}>{entry.hours}h</Text>
                  <TouchableOpacity
                    onPress={() => deleteEntry(entry.id)}
                    style={styles.deleteButton}
                  >
                    <Icon name="delete" size={16} color="#DC2626" />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
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
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  entriesTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#374151',
  },
  headerRight: {
    alignItems: 'flex-end',
  },
  totalHours: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#7F1734',
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
  entriesList: {
    maxHeight: 600,
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
  taskContainer: {
    backgroundColor: '#F9FAFB',
    padding: 8,
    borderRadius: 6,
    marginTop: 8,
  },
  entryTask: {
    fontSize: 14,
    color: '#374151',
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
    backgroundColor: '#FEE2E2',
    padding: 8,
    borderRadius: 8,
    marginTop: 8,
  },
});

export default AllEntriesScreen;


