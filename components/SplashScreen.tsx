import React, { useEffect, useRef } from 'react';
import {
  View,
  Image,
  Text,
  Animated,
  Easing,
  StatusBar,
  StyleSheet,
} from 'react-native';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const opacity = useRef(new Animated.Value(0)).current;
  const scaleX = useRef(new Animated.Value(0.3)).current; // width scale like wipe

  useEffect(() => {
    StatusBar.setHidden(true); // Full screen with no status bar

    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 1800,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      }),
      Animated.timing(scaleX, {
        toValue: 1,
        duration: 1800,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      }),
    ]).start();

    const timeout = setTimeout(() => {
      onComplete();
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <View style={styles.fullScreen}>
      <Animated.View
        style={[
          styles.logoContainer,
          {
            opacity,
            transform: [{ scaleX }],
          },
        ]}
      >
        <Image
          source={require('@/assets/images/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>Integrated Velalar Vellalar Cultural Welfare Society</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    width: 220,
    height: 220,
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#000000',
    textAlign: 'center',
  },
});

export default SplashScreen;
