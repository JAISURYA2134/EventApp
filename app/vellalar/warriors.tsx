// app/vellalar/warriors.tsx
import { ScrollView, Text, View, Image, StyleSheet } from 'react-native';

export default function WarriorsScreen() {
  return (
<ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <Image
        source={require('@/assets/images/cow.jpg')}
        style={styles.image}
        resizeMode="cover"
      />

      <Text style={styles.title}>போர்வீரர் மற்றும் நில உரிமையாளர்கள்</Text>

      <Text style={styles.content}>
        வேளாளர் சமூகத்தில் சிலர் சிற்றரசர்கள், நில உரிமையாளர்கள் மற்றும் போராளிகளாக மாறினர். “வேளிர்” எனப்படுபவர்கள், சங்க காலத்தில் அரசர்களாக இருந்தவர்களாக கருதப்படுகின்றனர்.
        {'\n'}{'\n'}
        குறிப்பாக கொடும்பாளூர் வேளிர், பாண்டியர் மற்றும் சோழ மன்னர்களுடன் கலந்துகொண்டு ஆட்சி செய்தார்கள். இவர்கள் சிற்றரசர்கள் ஆக இருந்தாலும், தங்களுடைய நிலங்களில் முழு ஆட்சியை மேற்கொண்டனர்.
        {'\n'}{'\n'}
        வேளாளர்கள் வெறும் உழவர்களாக மட்டுமல்லாமல், சமுதாயத்தின் அனைத்து பகுதிகளிலும் முக்கிய பங்களிப்பை செய்தவர்கள். அவர்கள் உழைப்பு, ஊக்கம், மற்றும் வலிமையான சமூக ஒழுக்கம் ஆகியவை அவர்களை சிறந்த தலைவர்களாக மாற்றின.
        {'\n'}{'\n'}
        பல வேளாளர் தலைவர்கள் தங்கள் ஊர்களுக்கே அதிகாரம் செலுத்தும் தலைவர்களாக இருந்தனர். “உடையார்” என்ற பட்டம், இவர்களின் நில உரிமை மற்றும் ஆட்சி அதிகாரத்தை எடுத்துக்காட்டுகிறது.
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
