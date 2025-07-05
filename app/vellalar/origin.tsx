import { ScrollView, Text, View, Image, StyleSheet } from 'react-native';
import BackButton from '@/components/BackButton';

export default function OriginStoryScreen() {
  return (
<ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>     
  <BackButton/>
   <Image
        source={require('@/assets/images/farm.webp')}
        style={styles.image}
        resizeMode="cover"
      />

      <Text style={styles.title}>வேளாளர் தோற்றம்</Text>

      <Text style={styles.content}>
        தொல்பழங்காலத்தில் குறிப்பாக புதிய கற்காலத்தில் மனித இனம் நாடோடிகளாக இருந்து ஓர் இடத்தில் நிலையாகத் தங்கி குடும்பம் என்ற அமைப்பை உருவாக்கி மலைச்சரிவுகளிலும் ஆற்றங்கரைப் பகுதிகளிலும் சிறிய அளவில் வேளாண்மை செய்யத் தலைப்பட்டான். வேளாண்மக்கு உதவும் கால்நடைகளையும் வளர்த்தான். நிலங்களைப் பன்படுத்த முதலில் கல்லால் செய்யப்பட்ட கைக்கோடரி என்னும் கருவியைப் பயன்படுத்தினான். இக்கருவிகள் நன்கு மெருகூட்டப்பட்டு நிலத்தைக் கொத்துவதற்கு ஏற்றவாறு கூர்மையாக விளங்கின. புதிய கற்காலத்தில் அதுவரை நாடோடியாக வாழ்ந்து தனது உணவைத் தேடித் திரிந்த மனிதன் ஒரு இடத்தில் நிலையாகத் தங்கி தனது உணவிற்கான பயிற்களைத் தாமே பயிரத்தொடங்கினான். Food gatherer became food producer) புதிய கற்காலத்திற்கு முன்வரை உணவைத் தேடித் திரிந்தவன் உணவை உற்பத்தி செய்பவனாக மாரி உணவுப் பயிர்களை பயிரிடத் தொடங்கினான்.   இக்கால கட்டத்தில்  கைகளால் செய்யப்பட்ட மட்கலன்களைப் பயன்படுத்தினான்.   எனவே வேளாளர்கள் தோற்றம் தமிழகத்தில் புதிய கற்காலத்தில் தொடங்கியது எனலாம்.
        {'\n\n'}
        தொடக்க காலத்தில் வேளாளர்கள் அனைவருமே ஒரு குடியில் தோன்றி ஒரு குடையின் கீழ் வாழ்ந்தனர். பின்னர் சமூக ஏற்றத்தின் காரணமாகவும் வேளாண் நிலங்கள் விரிவுபடுத்தப்பட்டதின் விளைவாகவும்,  ஆல விருட்சமான வேளாளர் குடியில் பல கிளைகள் தமிழகம் எங்கும் வியாபித்து வளர்ச்சிப் பெறத் தொடங்கியது. காடு திருத்தி நாடாக்கும் முயற்சியில் மன்னர்கள் விழைந்த பொழுது ஒரு பகுதியில் வாழ்ந்த வேளாளர்கள் தமிழகம் முழுவதும் பரவி வேளாண்மையைப் பெருக்கினர். 
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
