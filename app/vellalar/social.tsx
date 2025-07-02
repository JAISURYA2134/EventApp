// app/vellalar/social.tsx
import { ScrollView, Text, View, Image, StyleSheet } from 'react-native';

export default function SocialScreen() {
  return (
<ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <Image
        source={require('@/assets/images/samooga.jpg')}
        style={styles.image}
        resizeMode="cover"
      />

      <Text style={styles.title}>சமூக அமைப்பும் பெருமையும்</Text>

      <Text style={styles.content}>
        வேளாளர் சமூக அமைப்பு, வடஇந்திய வர்ண அமைப்பை விட தமிழ்நாட்டில் தொழில் அடிப்படையில் அமைந்திருந்தது. தொழில் என்பது ஒவ்வொரு சமூகத்திற்கும் அடையாளமாக இருந்தது.
        {'\n\n'}
        உழைப்பாளர்களாக, உணவுப் பயிர்கள் உற்பத்தியில் தலைசிறந்தவர்களாகவும், நீர்வளங்களை பராமரிப்பவர்களாகவும், சமூக ஒழுக்கத்தின் பிணையங்களாகவும் வேளாளர்கள் இருந்தனர்.
        {'\n\n'}
        இவர்கள் “உழவர்”, “ஏராளர்”, “கிழார்” என அழைக்கப்பட்டனர். “உழுந்து வாழ்வாரே வாழ்வார்” என திருக்குறளில் குறிப்பிடப்படுவது போல, சமூகத்தின் உண்மையான வாழ்வாளர்கள் இவர்களாகவே கருதப்பட்டனர்.
        {'\n\n'}
        வேளாளர் சமூகத்தில் உள்ள ஒவ்வொரு குடும்பமும் ஒரு ஒழுங்கு, மரபு, மற்றும் பண்பாட்டுடன் செயல்பட்டது. குடி, நாடு, உழவர் சங்கங்கள் ஆகியவை இந்த சமூக அமைப்புகளின் முக்கிய பாகங்களாக இருந்தன.
        {'\n\n'}
        சமூக ஒற்றுமை, நீதி, மற்றும் பண்பாட்டு வளர்ச்சி ஆகியவற்றை அடிப்படையாகக் கொண்டு, வேளாளர் சமூக அமைப்பு தமிழ்நாட்டின் பழங்காலக் கதைச் சுருக்கமாக இருக்கிறது.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 16,
    paddingBottom: 40

  },
  image: {
    width: '100%',
    height: 220,
    borderRadius: 16,
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#047857',
    marginBottom: 12,
    textAlign: 'center',
  },
  content: {
    fontSize: 16,
    color: '#333',
    lineHeight: 26,
  },
});
