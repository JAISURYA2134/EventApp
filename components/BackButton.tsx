import { useRouter } from 'expo-router';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function BackButton() {
  const router = useRouter();

  return (
    <TouchableOpacity style={styles.button} onPress={router.back}>
      <Text style={styles.text}>← Back</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 10,
  },
  text: {
    fontSize: 16,
    color: '#047857',
  },
});
