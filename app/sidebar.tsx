import React, { useRef, useState } from 'react';
import {
  Animated,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useAppStore } from '@/lib/store';
import { Section } from '@/lib/types';
import { useRouter } from 'expo-router';
import EventRegistration from './Sidebarsection/EventRegistration';
import AboutUs from './Sidebarsection/AboutUs';
import Profile from './Sidebarsection/Profile';
import Vision from './Sidebarsection/Vision';
import Home from './Sidebarsection/Home';
import EventPass from './Sidebarsection/EventPass';
import QRScanner from './Sidebarsection/QRScanner';
import AttendanceList from './Sidebarsection/AttendanceList';

type FeatherIconName =
  | 'home'
  | 'calendar'
  | 'eye'
  | 'info'
  | 'user'
  | 'clipboard'
  | 'bar-chart-2';

const baseNavItems: { icon: FeatherIconName; label: string; section: Section }[] = [
  { icon: 'home', label: 'Home', section: 'home' },
  { icon: 'calendar', label: 'Event Registration', section: 'event-registration' },
  // { icon: 'clipboard', label: 'Event Pass', section: 'eventpass' },
  { icon: 'info', label: 'About Us', section: 'about-us' },
  { icon: 'eye', label: 'Vision', section: 'vision' },
  { icon: 'user', label: 'My Profile', section: 'profile' },
];

const adminOnlyNavItems: { icon: FeatherIconName; label: string; section: Section }[] = [
  { icon: 'bar-chart-2', label: 'Attendance List', section: 'attendance' },
  // { icon: 'calendar', label: 'QR Scanner', section: 'qrscanner' },
];

const SIDEBAR_WIDTH = 260;

export default function Sidebar() {
  const { currentSection, setCurrentSection, user, logout } = useAppStore();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarX = useRef(new Animated.Value(-SIDEBAR_WIDTH)).current;
  const router = useRouter();

  const navItems = user?.isAdmin
    ? [...baseNavItems, ...adminOnlyNavItems]
    : baseNavItems;

  const renderSection = (section: Section) => {
    if (!user?.isAdmin && (section === 'attendance' || section === 'qrscanner')) {
      return (
        <View style={{ padding: 20 }}>
          <Text style={{ color: '#dc2626', fontWeight: 'bold' }}>
            Access Denied: Admins only
          </Text>
        </View>
      );
    }

    switch (section) {
      case 'home': return <Home />;
      case 'event-registration': return <EventRegistration />;
      case 'qrscanner': return <QRScanner />;
      case 'eventpass': return <EventPass />;
      case 'vision': return <Vision />;
      case 'about-us': return <AboutUs />;
      case 'profile': return <Profile />;
      case 'attendance': return <AttendanceList />;
      default: return <Text>Unknown section</Text>;
    }
  };

  const toggleSidebar = () => {
    const toValue = isSidebarOpen ? -SIDEBAR_WIDTH : 0;
    Animated.timing(sidebarX, {
      toValue,
      duration: 250,
      useNativeDriver: false,
    }).start();
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSelectSection = (section: Section) => {
    setCurrentSection(section);
    toggleSidebar();
  };

  return (
    <View style={styles.container}>
      {/* Sidebar Panel */}
      <Animated.View style={[styles.sidebar, { left: sidebarX }]}>
        <TouchableOpacity onPress={toggleSidebar} style={styles.menuButtonInside}>
          <Feather name="menu" size={24} color="#2e7d32" />
        </TouchableOpacity>

        <ScrollView style={styles.navMenu}>
          {navItems.map(({ icon, label, section }) => {
            const isActive = currentSection === section;
            return (
              <TouchableOpacity
                key={section}
                onPress={() => handleSelectSection(section)}
                style={[styles.navItem, isActive && styles.activeNavItem]}
              >
                <Feather name={icon} size={18} color={isActive ? 'white' : '#6B7280'} />
                <Text style={[styles.navText, isActive && styles.activeNavText]}>{label}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Logout Button at Bottom */}
        <TouchableOpacity
          onPress={() => {
            logout();
            router.replace('/Login');
          }}
          style={styles.logoutButton}
        >
          <Feather name="log-out" size={18} color="#9CA3AF" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </Animated.View>

      {!isSidebarOpen && (
        <TouchableOpacity onPress={toggleSidebar} style={styles.menuButtonOutside}>
          <Feather name="menu" size={24} color="#2e7d32" />
        </TouchableOpacity>
      )}

      {isSidebarOpen && (
        <TouchableOpacity
          onPress={toggleSidebar}
          activeOpacity={1}
          style={styles.backdrop}
        />
      )}

      {/* Main Content */}
      <View style={styles.mainContent}>
        {renderSection(currentSection)}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    position: 'relative',
  },
  menuButtonOutside: {
    position: 'absolute',
    top: 20,
    left: 12,
    zIndex: 25,
    backgroundColor: 'white',
    padding: 8,
    borderRadius: 8,
    elevation: 5,
    
  },
  menuButtonInside: {
    marginBottom: 16,
    backgroundColor: '#f3f4f6',
    padding: 10,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  sidebar: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: SIDEBAR_WIDTH,
    backgroundColor: 'white',
    padding: 16,
    zIndex: 15,
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 2, height: 0 },
    shadowRadius: 6,
    elevation: 8,
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.2)',
    zIndex: 10,
  },
  navMenu: {
    flexGrow: 1,
    color:'#2e7d32',
  },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 12,
    marginBottom: 8,
    backgroundColor: 'transparent',
  },
  navText: {
    marginLeft: 12,
    fontSize: 14,
    color: '#6B7280',
  },
  activeNavItem: {
    backgroundColor: 'rgba(16, 82, 48, 0.8)',
  },
  activeNavText: {
    color: 'white',
    fontWeight: 'bold',
  },
  mainContent: {
    flex: 1,
    paddingHorizontal: 0,
    paddingTop: 0,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#f3f4f6',
    justifyContent: 'flex-start',
  },
  logoutText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#2e7d32',
  },
});