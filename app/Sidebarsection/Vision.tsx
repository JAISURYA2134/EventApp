import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';

export default function Vision() {
  return (
    <ScrollView style={styles.container}>
      <Image
        source={require('@/assets/images/farm.webp')} // 👈 Replace with your actual asset path
        style={styles.headerImage}
        resizeMode="cover"
      />

      <Text style={styles.title}>🎯 மாநாட்டின் தூரநோக்கு (Vision)</Text>

      <Text style={styles.text}>
        {"\n"}📌 இம்மாநாடு வேளாளர் ஒற்றுமையை வெளிப்படுத்துவதாக அமையும்{"\n\n"}
        📌 இழந்த உரிமைகளை மீட்டெடுப்பதற்கான மாநாடு{"\n\n"}
        📌 தமிழகத்தில் பிள்ளை, முதலி, கவுண்டர் (வெள்ளாளக் கவுண்டர் உடையார் எனப் பட்டங்களைப் பெற்று 40 உட்பிரிவுகளாக வாழும் வேளாளர்/வெள்ளாளர் இன மக்கள், மக்கள் தொகை கணக்கெடுப்பின் பொழுது வேளாளர்/வெள்ளாளர் என குறிப்பிடுதல் வேண்டும் என்பதை அறிவித்திட நடத்தப்படும் மாநாடு. நமது ஒற்றுமையின் வெளிப்பாடாக அமைதல் அவசியமாகிறது{"\n\n"}
        📌 அரசியல், பொருளாதாரம், வேளாண்மை, வாணிகம், கல்வி ஆகியவற்றில் முன்னோடிகளாக விளங்கிய இனம் இன்று எவ்வித உரிமையும் இன்றி பிறித்தாளும் கொள்கையால் நலிந்த நிலையில் இருப்பதை நல்நிலைக்கு உயர்த்துவதற்காக நடத்தப்படும் மாநாடு. பதிவு செய்க, கலந்து கொள்க — உங்களின் பங்களிப்பே நமது ஒற்றுமைக்கு கிடைக்கின்ற வெற்றி.{"\n"}
      </Text>
    </ScrollView>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff', // 💚 light green background
  },
  headerImage: {
    width: width,
    height: 200,
    
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#047857', // emerald green
    marginTop: 16,
    marginHorizontal: 16,
  },
  text: {
    fontSize: 16,
    color: '#00000', // dark green for contrast
    lineHeight: 28,
    marginHorizontal: 16,
    marginBottom: 30,
  },
});