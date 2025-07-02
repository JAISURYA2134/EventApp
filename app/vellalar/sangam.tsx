// app/vellalar/sangam.tsx
import { ScrollView, Text, View, Image, StyleSheet } from 'react-native';

export default function SangamScreen() {
  return (
<ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <Image
        source={require('@/assets/images/lit.jpeg')}
        style={styles.image}
        resizeMode="cover"
      />

      <Text style={styles.title}>சங்க இலக்கியங்களில் வேளாளர்</Text>

      <Text style={styles.content}>
        சங்க கால இலக்கியங்களில் வேளாளர் சமூகத்தினரின் பங்கு மிகவும் சிறப்பாக குறிப்பிடப்பட்டுள்ளது. "குறுந்தொகை", "அகநானூறு", "புறநானூறு" போன்ற இலக்கியங்களில் வேளாளர்கள் “உழவர்”, “ஏராளர்”, “கிழார்” என்ற பெயர்களில் வர்ணிக்கப்படுகிறார்கள்.
        {'\n\n'}
        இவர்கள் உழைக்கும் மக்களாக மட்டுமல்லாமல், தங்களைச் சுற்றியுள்ள சமூகத்திற்கும் உதவுவோராகவும் இருந்தனர். உணவு உற்பத்தி, நில அளவைகள், நீர்நிலைகள் பராமரிப்பு ஆகியவற்றில் இவர்கள் முக்கிய பங்கு வகித்தனர்.
        {'\n\n'}
        திருவள்ளுவரின் திருக்குறளில் இவர்கள் பெருமையாக குறிப்பிடப்படுகிறார்கள்:
        {'\n'}
        “சுழன்றும் ஏர்ப்பின்னது உலகம் அதனால்
        உழந்தும் உழவே தலை.”
        {'\n'}
        “உழுதுண்டு வாழ்வாரே வாழ்வார் மற்றெல்லாம்
        தொழுதுண்டு பின்செல்பவர்.”
        {'\n\n'}
        இந்த வரிகள், வேளாளர் சமூகத்தின் உயிருக்கும் உழைப்பிற்கும் இடையே உள்ள தொடர்பை நன்கு காட்டுகின்றன. இவர்கள் உடைமைகளைக் கொண்டிருக்கும் மட்டும் இல்லாமல், சமூகத்தின் நலனிலும் பங்கு கொண்டனர்.
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
