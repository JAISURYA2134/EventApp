// app/vellalar/puranas.tsx
import { ScrollView, Text, View, Image, StyleSheet } from 'react-native';
import BackButton from '@/components/BackButton';
export default function PuranasScreen() {
  return (
<ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <BackButton/>
      <Image
        source={require('@/assets/images/purana.png')}
        style={styles.image}
        resizeMode="cover"
      />

      <Text style={styles.title}>புராணங்களில் வேளாளர்</Text>

      <Text style={styles.content}>
        வேளாளர் புராணத்தின் படி, வேளாளர் இனத்தின் மூலப்பிறவி கங்கை மகளாகக் கருதப்படும் மரபாளன் என்பவரால் ஏற்பட்டது. மரபாளன் கங்கை அம்மனின் புதல்வராகக் கருதப்பட்டு, காஞ்சியில் நிலம் திறந்து வேளாண்மையை உருவாக்கினார். அரசர்களால் வேளாண்மை விரிவாக்கத்துக்காக அவரை அனுப்பினர்.
        {'\n\n'}

        மரபாளன் தனது 55 ஆண்கள் மற்றும் 51 பெண்கள் மக்களை தமிழகம் முழுவதும் பரப்பி, ஒவ்வொரு இடத்திலும் வேளாண்மையை நிறுவினார். இவர்கள் ஒவ்வொருவரும் ஒரு ஊரை உருவாக்கினார்கள். இதன் விளைவாகவே, பல ஊர்களுக்கு வேளாளர் அடையாளமாக “நாடு” என்று பெயர் வந்தது. உதாரணமாக, 'நல்லாம்பாடி நாடு', 'மந்தலம்பாக்கம் நாடு' போன்றவை.
        {'\n\n'}

        இக்கதைகள், வேளாளர் சமூகத்தின் பரம்பரை, வேளாண்மையின் விரிவாக்கம் மற்றும் சமூகவளர்ச்சியை எடுத்துரைக்கின்றன. மரபாளனின் தலைமையில் ஏற்பட்ட சமுதாய அமைப்பு, இன்று வரை பல இடங்களில் கொண்டாடப்படுகிறது.
        {'\n\n'}

        இந்த உரை மூலங்கள், தமிழ் நாட்டின் வேளாளர் சமூகத்திற்கு ஒரு புராண அடித்தளத்தை வழங்குகின்றன. மரபாளன் மீது நம்பிக்கை, தாயாகக் கருதப்படும் கங்கை அம்மனின் வழிபாடு மற்றும் குலதெய்வ வழிபாட்டின் ஆரம்ப நிலைகள் இதில் அடங்குகின்றன.
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