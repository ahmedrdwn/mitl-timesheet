import AsyncStorage from '@react-native-async-storage/async-storage';

export interface TimesheetEntry {
  id: number;
  date: string;
  timeIn: string;
  timeOut: string;
  breakMinutes: string;
  task: string;
  day: string;
  hours: string;
}

export interface AppData {
  employeeName: string;
  studentNumber: string;
  entries: TimesheetEntry[];
  lastSaved: string;
}

const STORAGE_KEY = 'timesheet_app_data';

export const StorageService = {
  async saveData(data: Partial<AppData>): Promise<void> {
    try {
      const existingData = await this.loadData();
      const updatedData = {
        ...existingData,
        ...data,
        lastSaved: new Date().toISOString(),
      };
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData));
    } catch (error) {
      console.error('Error saving data:', error);
      throw error;
    }
  },

  async loadData(): Promise<AppData> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      if (data) {
        return JSON.parse(data);
      }
      return {
        employeeName: '',
        studentNumber: '',
        entries: [],
        lastSaved: '',
      };
    } catch (error) {
      console.error('Error loading data:', error);
      return {
        employeeName: '',
        studentNumber: '',
        entries: [],
        lastSaved: '',
      };
    }
  },

  async clearAllData(): Promise<void> {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Error clearing data:', error);
      throw error;
    }
  },
};


