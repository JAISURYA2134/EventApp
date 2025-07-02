// components/Navbar.tsx
import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useAppStore } from '@/lib/store';

export default function Navbar() {
  const { setCurrentSection } = useAppStore();

  return (
    <View style={styles.navbar}>
      <View style={styles.greetingContainer} />
      <View style={styles.rightSection}>
        <TouchableOpacity onPress={() => setCurrentSection('profile')}>
          <Image
            source={require('@/assets/images/leader1.jpg')}
            style={styles.profileImage}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 20,
    paddingBottom: 16,
    paddingHorizontal: 15,
    backgroundColor: 'rgba(16, 82, 48, 0.81)',
  },
  greetingContainer: {
    flex: 1,
    marginLeft: 26,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#66bb6a',
  },
});
