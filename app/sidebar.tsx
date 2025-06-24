import React, { useRef, useState } from 'react';
import {
  Animated,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useAppStore } from '@/lib/store';
import { Section} from '@/lib/types';
import { useRouter } from 'expo-router';
import EventRegistration from './Sidebarsection/EventRegistration'
import AboutUs from './Sidebarsection/AboutUs';
import Profile from './Sidebarsection/Profile';
import Vision from './Sidebarsection/Vision';
import Home from './Sidebarsection/Home';
import EventPass from './Sidebarsection/EventPass';
import QRScanner from './Sidebarsection/QRScanner';


type FeatherIconName =
  | 'home'
  | 'calendar'
  | 'eye'
  | 'info'
  | 'user'
  | 'clipboard'

  // | 'bar-chart-2';

const navItems: { icon: FeatherIconName; label: string; section: Section }[] = [
  { icon: 'home', label: 'Home', section: 'home' },
  { icon: 'calendar', label: 'Event Registration', section: 'event-registration' },
  { icon: 'calendar', label: 'QR Scanner', section: 'qrscanner' },
  { icon: 'clipboard', label: 'Event Pass', section: 'eventpass' },
  { icon: 'eye', label: 'Vision', section: 'vision' },
  { icon: 'info', label: 'About Us', section: 'about-us' },
  { icon: 'user', label: 'My Profile', section: 'profile' },
  // { icon: 'bar-chart-2', label: 'Attendance', section: 'attendance' },
];

const SIDEBAR_WIDTH = 260;

const renderSection = (section: Section) => {
  switch (section) {
    case 'home': return <Home />;
    case 'event-registration': return <EventRegistration />;
    case 'qrscanner':return <QRScanner/>;
    case 'eventpass': return <EventPass/>;
    case 'vision': return <Vision />;
    case 'about-us': return <AboutUs />;
    case 'profile': return <Profile />;
    default: return <Text>Unknown section</Text>;
  }
};


export default function Sidebar() {
  const { currentSection, setCurrentSection, user, logout } = useAppStore();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarX = useRef(new Animated.Value(-SIDEBAR_WIDTH)).current;

  const router = useRouter();

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
        {/* Sidebar Menu Button (inside sidebar) */}
        <TouchableOpacity onPress={toggleSidebar} style={styles.menuButtonInside}>
          <Feather name="menu" size={24} color="#119822" />
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

        <View style={styles.userCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{user?.name?.charAt(0).toUpperCase() || 'U'}</Text>
          </View>
          <View style={styles.userDetails}>
            <Text style={styles.userName}>{user?.name || 'Guest User'}</Text>
            <Text style={styles.userStatus}>{user?.isVerified ? 'Verified' : 'Not Verified'}</Text>
          </View>
            <TouchableOpacity
            onPress={() => {
                logout(); // clear user state
                router.replace('/Login'); // route to the login screen
            }}
            >
            <Feather name="log-out" size={18} color="#9CA3AF" />
            </TouchableOpacity>
        </View>
      </Animated.View>

      {/* Global Menu Button (only when sidebar is closed) */}
      {!isSidebarOpen && (
        <TouchableOpacity onPress={toggleSidebar} style={styles.menuButtonOutside}>
          <Feather name="menu" size={24} color="#119822" />
        </TouchableOpacity>
      )}

      {/* Backdrop */}
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
    backgroundColor: '#f0fdf4',
    position: 'relative',
  },

  // menu icon when sidebar is closed
  menuButtonOutside: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 25,
    backgroundColor: 'white',
    padding: 8,
    borderRadius: 8,
    elevation: 5,
  },

  // menu icon inside sidebar
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
    backgroundColor: '#119822',
  },
  activeNavText: {
    color: 'white',
    fontWeight: 'bold',
  },

  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    padding: 12,
    borderRadius: 12,
    marginTop: 16,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#119822',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: 'white',
    fontWeight: 'bold',
  },
  userDetails: {
    flex: 1,
    marginLeft: 10,
  },
  userName: {
    fontSize: 14,
    fontWeight: '600',
  },
  userStatus: {
    fontSize: 12,
    color: '#6B7280',
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingTop: 80,
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  mainSubtitle: {
    fontSize: 16,
    color: '#6B7280',
  },
});
