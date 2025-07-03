// app/vellalar/migration.tsx
import { ScrollView, Text, View, Image, StyleSheet } from 'react-native';
import BackButton from '@/components/BackButton';
export default function MigrationScreen() {
  return (
<ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <BackButton/>
      <Image
        source={require('@/assets/images/farm2.jpg')}
        style={styles.image}
        resizeMode="cover"
      />

      <Text style={styles.title}>வேளாளர் பரவல் மற்றும் குடிபெயர்தல்</Text>

      <Text style={styles.content}>
        தொண்டை மண்டலத்தில் இருந்து வேளாளர் சமூகங்கள் சோழ, பாண்டிய மற்றும் கொங்கு நாடுகளில் பரவினர். மரபாளனின் வாரிசுகள் ஒவ்வொரு இடத்திற்கும் சென்று, அங்குள்ள காடுகளைத் திறந்து வேளாண்மையை ஏற்படுத்தினர்.
        {'\n'}{'\n'}
        ஒவ்வொரு இடத்திலும் அவர்கள் ஒரு “நாடு” அல்லது “குடி” எனப்படும் சமூக அமைப்புகளை உருவாக்கினர். இதன் விளைவாகவே, பல ஊர்களுக்கே வேளாளர் அடையாளமாக “நாடு” என்ற பெயர் வந்தது. இந்த நாட்டுகள் வேளாளர் சமூகத்தின் வாழ்வியல் அமைப்புகளாக இருந்தன.
        {'\n'}{'\n'}
        மலைவெளிகள், புழுதியான நிலங்கள், மற்றும் வறண்ட பகுதிகளையும் நீர்வளத்துடன் கூடிய பசுமை நிலங்களாக மாற்றியவர்கள் இவர்கள். வேளாளர்கள் வனப்பகுதிகளை திறந்து பயிரிடத்தக்க நிலங்களாக மாற்றியதிலேயே அவர்களின் முக்கிய பங்களிப்பு இருக்கிறது.
        {'\n'}{'\n'}
        சோழர் அரசுக்கும், பாண்டிய அரசுக்கும் கீழ் பல வேளாளர் குடிகள் நில உரிமையுடன் வாழ்ந்தனர். இதனால் பல சமயங்களில், இடைக்கால அரசியலில் இவர்கள் முக்கிய பங்கு வகித்தனர். இந்த குடிகள் குலதெய்வ வழிபாடு, கலாசாரம் மற்றும் வேளாண்மை நடைமுறைகள் ஆகியவற்றில் தனித்துவத்தை கொண்டிருந்தன.
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
