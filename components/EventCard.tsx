import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  GestureResponderEvent,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';

const screenWidth = Dimensions.get('window').width;

type EventCardProps = {
  onPress?: (event: GestureResponderEvent) => void;
};

const EventCard: React.FC<EventCardProps> = ({ onPress }) => {
  const router = useRouter();

  const handlePress = (e: GestureResponderEvent) => {
    if (onPress) {
      onPress(e); // for EventRegistration screen
    } else {
      router.push('/Sidebarsection/EventRegistration2'); // for Home screen
    }
  };

  return (
    <View style={styles.eventContainer}>
      <View style={styles.animationPlaceholder}>
        <Text style={styles.bannerText}>
          🎉 ஒருங்கிணைந்த வேளாளர்/வெள்ளாளர் சங்க கூட்டமைப்பு மாநாடு 🎉
        </Text>
      </View>

      <View style={styles.eventDetails}>
        <Text style={styles.eventInfo}>நாள்: 13-07-2025, ஞாயிற்றுக்கிழமை</Text>
        <Text style={styles.eventInfo}>நேரம்: மாலை 4.00 மணி</Text>
        <Text style={styles.eventInfo}>இடம்: ஜீ.கார்னர், திருச்சிராப்பள்ளி</Text>
      </View>

      <TouchableOpacity style={styles.cardButton} onPress={handlePress}>
        <Text style={styles.cardButtonText}>பதிவு செய்ய / Register</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  eventContainer: {
    width: screenWidth * 0.9,
    alignSelf: 'center',
    backgroundColor: '#ffffff',
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderRadius: 16,
    marginTop: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 5,
  },
  animationPlaceholder: {
    height: 150,
    backgroundColor: 'rgba(12, 87, 48, 0.86)',
    borderRadius: 11,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 10,
  },
  bannerText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  eventDetails: {
    padding: 10,
  },
  eventInfo: {
    fontSize: 16,
    color: '#1b5e20',
    textAlign: 'left',
  },
  cardButton: {
    borderWidth: 1,
    borderColor: '#2e7d32',
    paddingVertical: 10,
    borderRadius: 24,
    alignItems: 'center',
  },
  cardButtonText: {
    color: '#1b5e20',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default EventCard;
