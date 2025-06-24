import { View } from 'react-native';
import { useState } from 'react';
import SplashScreen from '../components/SplashScreen';
import LoginScreen from './Login';

export default function Entry() {
  const [showSplash, setShowSplash] = useState(true);

  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  return (
    <View style={{ flex: 1 }}>
      <LoginScreen />
    </View>
  );
}