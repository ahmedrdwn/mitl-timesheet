import 'package:flutter/material.dart';
import 'screens/home_screen.dart';
import 'screens/add_entry_screen.dart';
import 'screens/all_entries_screen.dart';
import 'screens/settings_screen.dart';

void main() {
  runApp(const MITLTimesheetApp());
}

class MITLTimesheetApp extends StatelessWidget {
  const MITLTimesheetApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'MITL Timesheet',
      theme: ThemeData(
        primarySwatch: MaterialColor(0xFF7F1734, {
          50: Color(0xFFFDF2F8),
          100: Color(0xFFFCE7F3),
          200: Color(0xFFFBCFE8),
          300: Color(0xFFF9A8D4),
          400: Color(0xFFF472B6),
          500: Color(0xFF7F1734),
          600: Color(0xFFDB2777),
          700: Color(0xFFBE185D),
          800: Color(0xFF9D174D),
          900: Color(0xFF831843),
        }),
        visualDensity: VisualDensity.adaptivePlatformDensity,
      ),
      home: const MainScreen(),
    );
  }
}

class MainScreen extends StatefulWidget {
  const MainScreen({super.key});

  @override
  State<MainScreen> createState() => _MainScreenState();
}

class _MainScreenState extends State<MainScreen> {
  int _currentIndex = 0;

  final List<Widget> _screens = [
    const HomeScreen(),
    const AddEntryScreen(),
    const AllEntriesScreen(),
    const SettingsScreen(),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: _screens[_currentIndex],
      bottomNavigationBar: BottomNavigationBar(
        type: BottomNavigationBarType.fixed,
        currentIndex: _currentIndex,
        onTap: (index) {
          setState(() {
            _currentIndex = index;
          });
        },
        selectedItemColor: const Color(0xFF7F1734),
        unselectedItemColor: Colors.grey,
        backgroundColor: Colors.white,
        elevation: 8,
        items: const [
          BottomNavigationBarItem(
            icon: Icon(Icons.home),
            label: 'Home',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.add),
            label: 'Add',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.bar_chart),
            label: 'All',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.settings),
            label: 'Settings',
          ),
        ],
      ),
    );
  }
}
