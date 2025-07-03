import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useAppStore } from '@/lib/store'; 
import type { Section } from '@/lib/types';
import { useRouter } from 'expo-router';




const vellalarCards = [
  {
    id: 'origin',
    title: 'வேளாளர் தோற்றம்',
    image: require('@/assets/images/farm.webp'),
    summary: 'வேளாளர் சமூகத்தின் தோற்றம் மற்றும் பழங்கால வாழ்க்கை முறை.',
  },
  {
    id: 'puranas',
    title: 'புராணங்களில் வேளாளர்',
    image: require('@/assets/images/purana.png'),
    summary: 'மரபாளன், கங்கை மகன் என வேளாளர் புராணக் கூறுகள்.',
  },
  {
    id: 'gangai-maindhan',
    title: 'கங்கை மைந்தன் மரபாளன் காஞ்சியில் குடியேறல்',
    image: require('@/assets/images/purana.png'),
    summary: 'கங்கை மைந்தர்கள் என அழைக்கப்படும் வேளாளர்களின் முன்னோர் மரபாளன் என வழங்கப்படுகின்றார்',
  },
  {
    id: 'gangai-amman',
    title: 'கங்கை அம்மன் வழிபாடு',
    image: require('@/assets/images/ganga.jpg'),
    summary: 'தொண்டை மண்டலத்தின் தாய்தெய்வ வழிபாட்டு மரபுகள்.',
  },
  {
    id: 'migration',
    title: 'வேளாளர் பரவல் -விரிவாக்கம் புலம் பெயர்தல்',
    image: require('@/assets/images/farm2.jpg'),
    summary: 'தொண்டை மண்டல சதகமும் சோழ மண்டல சதகமும்.',
  },
  {
    id: 'religion',
    title: 'வேளாளர் பெயர்க்காரணம்',
    image: require('@/assets/images/religion.jpg'),
  },
  {
    id: 'sangam',
    title: 'சதுர்வர்ணம்',
    image: require('@/assets/images/lit.jpeg'),
    summary: 'வட இந்தியா போன்று தமிழகத்தில் ஆரியர்களின் சதுர்வர்ண...',
  },
  {
    id: 'social',
    title: 'வேளீர்-வேளாளர்',
    image: require('@/assets/images/samooga.jpg'),
    summary: 'பொதுவாக வரலாற்று ஆசிரியர்கள் மேற்சொன்னபடி சங்க...',
  },
  {
    id: 'warriors',
    title: 'கொடும்பாளூர் வேளீர்',
    image: require('@/assets/images/cow.jpg'),
    summary: 'வேளீர்கள் வேளாளர்களே என்பதற்கு மிகச் சிறந்த சான்று...',
  },
  {
    id: 'vendhar',
    title: 'வேளாளர்கள்- வேந்தர்கள்',
    image: require('@/assets/images/cow.jpg'),
    summary: 'வேளாளர்கள் சங்க காலத்தில் வேளிர்களாக அரசாட்சி...',
  },
  {
    id: 'vaanaa',
    title: 'வாணாதிராயர்கள்',
    image: require('@/assets/images/cow.jpg'),
    summary: 'மேற்குறித்தபடி பழைய வடஆற்காடு மாவட்டம், சித்தூர்.',
  },
  {
    id: 'magabali',
    title: 'மகாபலி இந்திரனை வெல்லுதல்',
    image: require('@/assets/images/cow.jpg'),
    summary: 'புராணங்களில் ஹிரண்யகசிபுவின் மகனான பிரகலாதனின் பேரனாகச் சித்தரிக்கப்படுபவர் மகாபலி.',
  },
];

export default function AboutUs() {
  const router = useRouter(); 


  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>எங்களைப் பற்றி</Text>
      {vellalarCards.map((card, index) => (
        <TouchableOpacity
  key={index}
  onPress={() => router.push(`/vellalar/${card.id}`)}

>

          <View style={styles.card}>
            <Image source={card.image} style={styles.image} resizeMode="cover" />
            <View style={styles.content}>
              <Text style={styles.title}>{card.title}</Text>
              <Text style={styles.summary}>{card.summary}</Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
   // backgroundColor: '#f0fdf4',
    backgroundColor: '#ffffff',
    paddingTop:30,
    padding: 16,
    paddingBottom:0,
    
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1b5e20',
    marginBottom: 12,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginBottom: 26,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 180,
  },
  content: {
    padding: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1b5e20',
    marginBottom: 4,
  },
  summary: {
    fontSize: 15,
    color: '#333',
  },
});
