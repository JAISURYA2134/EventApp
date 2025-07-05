import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

export default function LoginScreen() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    setError('');
    try {
      const usersRef = collection(db, 'users');
      const isEmail = identifier.includes('@');

      const q = query(
        usersRef,
        where(isEmail ? 'email' : 'phoneNumber', '==', isEmail ? identifier : '+91' + identifier),
        where('password', '==', password)
      );

      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const docSnap = querySnapshot.docs[0];
        const userData = docSnap.data();
        const userId = docSnap.id;

        useAppStore.getState().setUser({
          id: userId,
          name: userData.name,
          email: userData.email,
          phoneNumber:userData.phoneNumber,
          isVerified: userData.isVerified ?? false,
          avatarUrl: userData.avatarUrl || '',
          isAdmin: userData.email === 'admin@gmail.com' && password === 'admin1',
        });

        router.replace('/sidebar');
      } else {
        setError('Invalid email/phone or password');
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred during login');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
          <View style={styles.container}>
            <View style={styles.card}>
              <Image
                source={require('@/assets/images/logo.png')}
                style={styles.logo}
                resizeMode="contain"
              />
              <Text style={styles.title}>Welcome</Text>
              <Text style={styles.subtitle}>Sign in</Text>

              <View style={styles.inputWrapper}>
                <Ionicons name="person" size={18} style={styles.icon} />
                <TextInput
                  style={styles.input}
                  placeholder="Email or Phone Number"
                  keyboardType="default"
                  value={identifier}
                  onChangeText={setIdentifier}
                  autoCapitalize="none"
                  placeholderTextColor="#9ca3af"
                />
              </View>

              <View style={styles.inputWrapper}>
                <Ionicons name="lock-closed" size={18} style={styles.icon} />
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  secureTextEntry
                  value={password}
                  onChangeText={setPassword}
                  placeholderTextColor="#9ca3af"
                />
              </View>

              {error ? <Text style={styles.errorText}>{error}</Text> : null}

              <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Sign in</Text>
              </TouchableOpacity>

              <Text style={styles.footerText}>
                     new?{' '}
                <Text style={styles.signupLink} onPress={() => router.replace('/signup')}>
                  Sign Up
                </Text>
              </Text>
              <Text style={styles.footerText}>
                Powered By - Yaanar Technologies
              </Text>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    padding: 16,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    elevation: 5,
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 140,
    marginBottom: 16,
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    color: '#2e7d32',
    marginBottom: 20,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#d1d5db',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 12,
    paddingHorizontal: 12,
  },
  icon: {
    marginRight: 8,
    color: '#2e7d32',
  },
  input: {
    flex: 1,
    height: 40,
    color: '#000',
  },
  button: {
    backgroundColor: '#2e7d32',
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 12,
    alignSelf: 'stretch',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
    marginTop: 12,
  },
  signupLink: {
    color: '#2e7d32',
    fontWeight: 'bold',
  },
  errorText: {
    color: 'orange',
    fontSize: 12,
    marginTop: -8,
    marginBottom: 8,
    marginLeft: 4,
  },
});
