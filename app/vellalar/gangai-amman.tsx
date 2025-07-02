// app/vellalar/gangai-amman.tsx
import { ScrollView, Text, View, Image, StyleSheet } from 'react-native';

export default function GangaiAmmanScreen() {
  return (
<ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <Image
        source={require('@/assets/images/ganga.jpg')}
        style={styles.image}
        resizeMode="cover"
      />

      <Text style={styles.title}>கங்கை அம்மன் வழிபாடு</Text>

      <Text style={styles.content}>
        தொண்டை மண்டலத்தில் வாழ்ந்த வேளாளர் சமூகத்தின் முன்னோர்களாகக் கருதப்படும் மரபாளன் மற்றும் அவரது பரம்பரைக் குடிமக்கள், தங்கள் தாயாகக் கருதப்பட்ட கங்கை அம்மனை வழிபட்டனர். இவர்கள் வருடந்தோறும் clay (மண்) உருவங்களில் கங்கை அம்மனை உருவாக்கி, தீபங்கள் வைத்து வழிபடுவது வழக்கம்.
        {'\n\n'}
        இந்த வழிபாடு வேளாளர் சமூகத்தின் குடும்பக்குழுக்களில் கூட இன்றும் நடைமுறையில் உள்ளது. கடைசியில் கங்கை அம்மன் உருவங்கள் தண்ணீரில் கரைக்கப்படுவது வழக்கமாகும். இது ஒரு பக்தி மற்றும் மரபு சார்ந்த நிகழ்வாகவே இருந்து வருகிறது.
        {'\n\n'}
        கங்கை அம்மன் வழிபாடு, வேளாளர் இனத்தின் முன்னோர்களையும், தாயையும் நினைவுகூரும் ஒரு ஆன்மிக நிகழ்வாகவே அறியப்படுகிறது. இந்தியாவின் பிற பகுதிகளிலும், குறிப்பாக ஆந்திரப்பிரதேசம், கர்நாடகம் போன்ற இடங்களிலும் இதற்கு ஒத்த வழிபாடுகள் காணப்படுகின்றன.
        {'\n\n'}
        இந்த வழிபாட்டு மரபுகள், வேளாளர் இனத்தின் வேதாந்த பரம்பரையில் ஆன்மிக உணர்வுகள், தாய்மை மதிப்பு மற்றும் சமூகவாழ்க்கையின் முக்கியத்துவத்தை நம்மிடம் எடுத்துச் சொல்லுகின்றன.
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
