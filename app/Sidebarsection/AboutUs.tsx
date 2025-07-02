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
    id: 'gangai-amman',
    title: 'கங்கை அம்மன் வழிபாடு',
    image: require('@/assets/images/ganga.jpg'),
    summary: 'தொண்டை மண்டலத்தின் தாய்தெய்வ வழிபாட்டு மரபுகள்.',
  },
  {
    id: 'migration',
    title: 'குடிபெயர்தல் மற்றும் பரவல்',
    image: require('@/assets/images/farm2.jpg'),
    summary: 'வேளாளர் சமுதாயத்தின் விரிவாக்க வரலாறு.',
  },
  {
    id: 'warriors',
    title: 'போர்வீரர் மற்றும் நில உரிமையாளர்கள்',
    image: require('@/assets/images/cow.jpg'),
    summary: 'சிற்றரசர்கள், வேளாளர் தலைவர்கள் மற்றும் வீரம்.',
  },
  {
    id: 'sangam',
    title: 'சங்க இலக்கியங்களில் வேளாளர்',
    image: require('@/assets/images/lit.jpeg'),
    summary: 'அகம், புறம் இலக்கியங்களில் வேளாளர் பங்கு.',
  },
  {
    id: 'religion',
    title: 'மதம் மற்றும் தெய்வ வழிபாடு',
    image: require('@/assets/images/religion.jpg'),
    summary: 'சைவ, சமண, துளுவ வேளாளர் வழிபாடுகள்.',
  },
  {
    id: 'social',
    title: 'சமூக அமைப்பும் பெருமையும்',
    image: require('@/assets/images/samooga.jpg'),
    summary: 'சமூக இடம், பண்பாடு, கிழார், உழவர் மரபுகள்.',
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
    backgroundColor: '#f0fdf4',
    padding: 16,
    paddingTop:20
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