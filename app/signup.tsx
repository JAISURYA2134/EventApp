import { View, Text,Image, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase'; // Adjust path as needed

export default function SignupScreen() {
  const router = useRouter();
  const [Name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
const [phoneNumberError, setPhoneNumberError] = useState('');



const handleSignup = async () => {
  // Reset previous errors
  setNameError('');
  setEmailError('');
  setPasswordError('');
  setConfirmPasswordError('');

  let hasError = false;

  if (!Name) {
    setNameError('Name is required');
    hasError = true;
  }
  if (!email) {
    setEmailError('Email is required');
    hasError = true;
  }
  if (!password) {
    setPasswordError('Password is required');
    hasError = true;
  }
  if (!confirmPassword) {
    setConfirmPasswordError('Confirm your password');
    hasError = true;
  } else if (password !== confirmPassword) {
    setConfirmPasswordError('Passwords do not match');
    hasError = true;
  }
  if (!phoneNumber) {
  setPhoneNumberError('Phone number is required');
  hasError = true;
} else if (phoneNumber.length !== 10) {
  setPhoneNumberError('Enter a valid 10-digit phone number');
  hasError = true;
}

  if (hasError) return;

  try {
await addDoc(collection(db, 'users'), {
  name: Name,
  email,
  password,
  phoneNumber: '+91' + phoneNumber,
  createdAt: new Date(),
});

    Alert.alert('Registered', 'You have successfully signed up', [
      {
        text: 'OK',
        onPress: () => router.replace('/Login'),
      },
    ]);
  } catch (error) {
    console.error('Firebase error:', error);
    Alert.alert('Error', 'Failed to register. Try again.');
  }
};



  return (
    <View style={styles.container}>
      <View style={styles.card}>
             <Image
               source={require('@/assets/images/logo.png')} // ✅ Update this path as needed
               style={styles.logo}
               resizeMode="contain"
             />
        <Text style={styles.title}>Create an Account</Text>
        <Text style={styles.subtitle}>Sign up to get started</Text>

       {/* Name Field */}
<View style={styles.inputWrapper}>
  <Ionicons name="person" size={18} style={styles.icon} />
  <TextInput
    style={styles.input}
    placeholder="Full Name"
    value={Name}
    onChangeText={setName}
     placeholderTextColor="#9ca3af"
  />
</View>
{ nameError ? <Text style={styles.errorText}>{nameError}</Text> : null }

{/* Email */}
<View style={styles.inputWrapper}>
  <Ionicons name="mail" size={18} style={styles.icon} />
  <TextInput
    style={styles.input}
    placeholder="Email"
    keyboardType="email-address"
    autoCapitalize="none"
    value={email}
    onChangeText={setEmail}
     placeholderTextColor="#9ca3af"
  />
</View>
{ emailError ? <Text style={styles.errorText}>{emailError}</Text> : null }

{/* Phone Number */}
<View style={styles.inputWrapper}>
  <Ionicons name="call" size={18} style={styles.icon} />
  <View style={styles.phonePrefix}>
    <Text style={styles.prefixText}>+91</Text>
  </View>
  <TextInput
    style={styles.phoneInput}
    placeholder="Phone Number"
    keyboardType="phone-pad"
    value={phoneNumber}
    onChangeText={setPhoneNumber}
    placeholderTextColor="#9ca3af"
    maxLength={10}
  />
</View>
{phoneNumberError ? (
  <Text style={styles.errorText}>{phoneNumberError}</Text>
) : null}


{/* Password */}
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
{ passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null }

{/* Confirm Password */}
<View style={styles.inputWrapper}>
  <Ionicons name="lock-closed" size={18} style={styles.icon} />
  <TextInput
    style={styles.input}
    placeholder="Confirm Password"
    secureTextEntry
    value={confirmPassword}
    onChangeText={setConfirmPassword}
     placeholderTextColor="#9ca3af"
  />
</View>
{ confirmPasswordError ? <Text style={styles.errorText}>{confirmPasswordError}</Text> : null }


        <TouchableOpacity style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        <Text style={styles.footerText}>
          Already have an account?{' '}
          <Text style={styles.loginLink} onPress={() => router.replace('/Login')}>
            Login
          </Text>
        </Text>

        <Text style={styles.terms}>
          By continuing, you agree to our Terms of Service
        </Text>
      </View>
    </View>
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

  },
  iconWrapper: {
    width: 64,
    height: 64,
    backgroundColor: '#22c55e',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 16,
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
    color: '#000'
  },
  button: {
    backgroundColor: '#2e7d32',
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 12,
     alignSelf: 'stretch'
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  terms: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
    marginTop: 12,
  },
  errorText: {
  color: 'orange',
  fontSize: 12,
  marginBottom: 8,
  marginLeft: 4,
},
footerText: {
  fontSize: 12,
  color: '#6b7280',
  textAlign: 'center',
  marginTop: 16,
},
loginLink: {
  color: '#2e7d32',
  fontWeight: 'bold',
},
phonePrefix: {
  paddingHorizontal: 8,
  paddingVertical: 10,
  borderRightWidth: 1,
  borderRightColor: '#d1d5db',
},
prefixText: {
  color: '#000',
  fontWeight: '500',
},
phoneInput: {
  flex: 1,
  height: 40,
  paddingLeft: 10,
  color: '#000',
},
});
