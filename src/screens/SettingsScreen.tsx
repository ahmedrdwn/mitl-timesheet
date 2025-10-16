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
import { StorageService, AppData } from '../services/StorageService';

const SettingsScreen: React.FC = () => {
  const [data, setData] = useState<AppData>({
    employeeName: '',
    studentNumber: '',
    entries: [],
    lastSaved: '',
  });
  const [employeeName, setEmployeeName] = useState('');
  const [studentNumber, setStudentNumber] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const appData = await StorageService.loadData();
      setData(appData);
      setEmployeeName(appData.employeeName);
      setStudentNumber(appData.studentNumber);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const saveProfile = async () => {
    if (!employeeName.trim()) {
      Alert.alert('⚠️ Missing Information', 'Please enter your name');
      return;
    }

    try {
      await StorageService.saveData({ 
        employeeName: employeeName.trim(), 
        studentNumber: studentNumber.trim() 
      });
      setData(prev => ({ 
        ...prev, 
        employeeName: employeeName.trim(), 
        studentNumber: studentNumber.trim() 
      }));
      Alert.alert('✅ Success', 'Profile saved successfully!');
    } catch (error) {
      Alert.alert('❌ Error', 'Failed to save profile');
      console.error('Error saving profile:', error);
    }
  };

  const clearAllData = () => {
    Alert.alert(
      '⚠️ Delete All Entries',
      'This will delete all your work entries. This cannot be undone!',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete All',
          style: 'destructive',
          onPress: async () => {
            try {
              await StorageService.clearAllData();
              setData(prev => ({ ...prev, entries: [] }));
              Alert.alert('✅ Cleared', 'All entries have been cleared');
            } catch (error) {
              Alert.alert('❌ Error', 'Failed to clear entries');
              console.error('Error clearing data:', error);
            }
          },
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      {/* Profile Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Icon name="person" size={24} color="#374151" />
          <Text style={styles.sectionTitle}>Your Profile</Text>
        </View>
        
        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Student Name *</Text>
            <TextInput
              style={styles.input}
              value={employeeName}
              onChangeText={setEmployeeName}
              placeholder="Your full name"
            />
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Student Number</Text>
            <TextInput
              style={styles.input}
              value={studentNumber}
              onChangeText={setStudentNumber}
              placeholder="Your student ID"
            />
          </View>
          
          <TouchableOpacity style={styles.saveButton} onPress={saveProfile}>
            <Icon name="save" size={20} color="white" />
            <Text style={styles.saveButtonText}>Save Profile</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Cloud Storage Guide */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Cloud Storage Guide</Text>
        <View style={styles.guideContainer}>
          <Text style={styles.guideTitle}>📱 After downloading Excel:</Text>
          <View style={styles.guideSteps}>
            <Text style={styles.guideStep}>1. Open your Files/Downloads app</Text>
            <Text style={styles.guideStep}>2. Find the MITL_Timesheet file</Text>
            <Text style={styles.guideStep}>3. Tap Share icon</Text>
            <Text style={styles.guideStep}>4. Choose: Google Drive, OneDrive, or Dropbox</Text>
          </View>
        </View>
      </View>

      {/* Danger Zone */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, styles.dangerTitle]}>Danger Zone</Text>
        <TouchableOpacity style={styles.dangerButton} onPress={clearAllData}>
          <Text style={styles.dangerButtonText}>Clear All Entries</Text>
        </TouchableOpacity>
        <Text style={styles.dangerDescription}>
          This will delete all your work entries
        </Text>
      </View>

      {/* App Info */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>App Information</Text>
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>MITL Timesheet App</Text>
          <Text style={styles.infoText}>McMaster University</Text>
          <Text style={styles.infoText}>Version 1.0.0</Text>
          {data.lastSaved && (
            <Text style={styles.infoText}>
              Last saved: {new Date(data.lastSaved).toLocaleString()}
            </Text>
          )}
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
  section: {
    backgroundColor: 'white',
    margin: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    gap: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#374151',
  },
  dangerTitle: {
    color: '#DC2626',
  },
  form: {
    padding: 20,
  },
  inputGroup: {
    marginBottom: 20,
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
  saveButton: {
    backgroundColor: '#3B82F6',
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
    fontSize: 16,
    fontWeight: 'bold',
  },
  guideContainer: {
    padding: 20,
  },
  guideTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E40AF',
    marginBottom: 12,
  },
  guideSteps: {
    backgroundColor: '#EFF6FF',
    padding: 16,
    borderRadius: 8,
  },
  guideStep: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 4,
  },
  dangerButton: {
    backgroundColor: '#DC2626',
    padding: 12,
    borderRadius: 8,
    margin: 20,
    alignItems: 'center',
  },
  dangerButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  dangerDescription: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 20,
  },
  infoContainer: {
    padding: 20,
    alignItems: 'center',
  },
  infoText: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
});

export default SettingsScreen;


