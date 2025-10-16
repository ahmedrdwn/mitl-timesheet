import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { StorageService, TimesheetEntry } from '../services/StorageService';
import { calculateHours } from '../utils/TimeUtils';

const AddEntryScreen: React.FC = () => {
  const [currentEntry, setCurrentEntry] = useState({
    date: new Date().toISOString().split('T')[0],
    timeIn: '',
    timeOut: '',
    breakMinutes: '0',
    task: '',
  });
  const [employeeName, setEmployeeName] = useState('');

  useEffect(() => {
    loadEmployeeName();
  }, []);

  const loadEmployeeName = async () => {
    try {
      const data = await StorageService.loadData();
      setEmployeeName(data.employeeName);
    } catch (error) {
      console.error('Error loading employee name:', error);
    }
  };

  const addEntry = async () => {
    if (!currentEntry.timeIn || !currentEntry.timeOut) {
      Alert.alert('⚠️ Missing Information', 'Please fill in Time In and Time Out');
      return;
    }

    if (!employeeName) {
      Alert.alert('⚠️ Profile Required', 'Please set your name in Settings first');
      return;
    }

    try {
      const hours = calculateHours(currentEntry.timeIn, currentEntry.timeOut, currentEntry.breakMinutes);
      const dayOfWeek = new Date(currentEntry.date).toLocaleDateString('en-US', { weekday: 'short' });
      
      const newEntry: TimesheetEntry = {
        ...currentEntry,
        day: dayOfWeek,
        hours: hours.toFixed(2),
        id: Date.now(),
      };

      const data = await StorageService.loadData();
      const updatedEntries = [...data.entries, newEntry].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      
      await StorageService.saveData({ entries: updatedEntries });

      setCurrentEntry({
        date: new Date().toISOString().split('T')[0],
        timeIn: '',
        timeOut: '',
        breakMinutes: '0',
        task: '',
      });

      Alert.alert('✅ Success', 'Entry saved successfully!');
    } catch (error) {
      Alert.alert('❌ Error', 'Failed to save entry');
      console.error('Error saving entry:', error);
    }
  };

  const calculatedHours = currentEntry.timeIn && currentEntry.timeOut 
    ? calculateHours(currentEntry.timeIn, currentEntry.timeOut, currentEntry.breakMinutes)
    : 0;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.formContainer}>
        <View style={styles.header}>
          <Icon name="add" size={24} color="#374151" />
          <Text style={styles.headerTitle}>New Entry</Text>
        </View>

        <View style={styles.form}>
          {/* Date Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Date</Text>
            <TextInput
              style={styles.input}
              value={currentEntry.date}
              onChangeText={(text) => setCurrentEntry({...currentEntry, date: text})}
              placeholder="YYYY-MM-DD"
            />
          </View>

          {/* Time Inputs */}
          <View style={styles.timeRow}>
            <View style={styles.timeInput}>
              <Text style={styles.label}>Time In</Text>
              <TextInput
                style={styles.input}
                value={currentEntry.timeIn}
                onChangeText={(text) => setCurrentEntry({...currentEntry, timeIn: text})}
                placeholder="HH:MM"
              />
            </View>
            <View style={styles.timeInput}>
              <Text style={styles.label}>Time Out</Text>
              <TextInput
                style={styles.input}
                value={currentEntry.timeOut}
                onChangeText={(text) => setCurrentEntry({...currentEntry, timeOut: text})}
                placeholder="HH:MM"
              />
            </View>
          </View>

          {/* Break Minutes */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Break (minutes)</Text>
            <TextInput
              style={styles.input}
              value={currentEntry.breakMinutes}
              onChangeText={(text) => setCurrentEntry({...currentEntry, breakMinutes: text})}
              placeholder="0"
              keyboardType="numeric"
            />
          </View>

          {/* Task Description */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Task Description</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={currentEntry.task}
              onChangeText={(text) => setCurrentEntry({...currentEntry, task: text})}
              placeholder="What did you work on?"
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>

          {/* Calculated Hours Display */}
          {currentEntry.timeIn && currentEntry.timeOut && (
            <View style={styles.calculatedHoursContainer}>
              <Text style={styles.calculatedHoursLabel}>Calculated Hours</Text>
              <Text style={styles.calculatedHoursValue}>
                {calculatedHours.toFixed(2)}h
              </Text>
            </View>
          )}

          {/* Save Button */}
          <TouchableOpacity style={styles.saveButton} onPress={addEntry}>
            <Icon name="check" size={24} color="white" />
            <Text style={styles.saveButtonText}>Save Entry</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  formContainer: {
    backgroundColor: 'white',
    margin: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    gap: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#374151',
  },
  form: {
    padding: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  timeRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  timeInput: {
    flex: 1,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    borderWidth: 2,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: 'white',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  calculatedHoursContainer: {
    backgroundColor: '#F0FDF4',
    borderWidth: 2,
    borderColor: '#BBF7D0',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginBottom: 20,
  },
  calculatedHoursLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  calculatedHoursValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#10B981',
  },
  saveButton: {
    backgroundColor: '#10B981',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AddEntryScreen;


