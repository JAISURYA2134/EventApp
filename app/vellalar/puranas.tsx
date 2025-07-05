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
       உலகளவில் ஒவ்வொரு சமூக அமைப்பிற்கும் அச்சமூகத்தின் தோற்றம் குறித்த வரலாற்றுச்சான்றுகள், வழிவழிச் செய்திகள், புராணங்கள் போன்றவை காணப்படும். இவற்றில் புராணங்களில் உயர்வு நவிற்சி செய்திகள் காணப்படினும் அவை உண்மையின் அடிப்படையில் காலம் காலமாக பேசப்படுகின்ற நினைவலைகளாகவே முன்னோர்களின் வரலாறாகவே அமையும். அவ்வகையில் வேளாளர் தோற்றம் குறித்து பல்வேறு இலக்கியச் சான்றுகள், புராணங்கள், கல்வெட்டுச் சான்றுகள் இருந்து வருகின்றன.
        {'\n\n'}

       வேளாளர் புராணத்தில் வேளாளரின் தோற்றம் குறித்த செய்திகள் உள்ளன. தமிழகத்தில் வாழும் அனைத்து வேளாளர்களும் இப்புராணங்கள் வழியாகத் தங்களது இனத்தின் வரலாற்றை அறிந்து வைத்துள்ளனர். எனினும் அவ்வவ் பகுதிகளின் இயற்கை அமைப்பிற்கு ஏற்பவும் பண்பாட்டுத் தன்மைகளுக்கு ஏற்பவும் இவற்றில் சில மாற்றங்களையும் அண்மைக் காலங்களில் புகுத்தியுள்ளனர். பொதுவான கூறுகளைக் கொண்ட வகையில் வேளாளர் புராணம் தமிழக வேளாளர் தோற்றம் குறித்து குறிப்பிடுகிறது.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 16,
    textAlign: 'justify'
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
    textAlign: 'justify',
    width: 343,
    paddingRight: 6
  },
});