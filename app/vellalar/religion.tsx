// app/vellalar/religion.tsx
import { ScrollView, Text, View, Image, StyleSheet } from 'react-native';

export default function ReligionScreen() {
  return (
<ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <Image
        source={require('@/assets/images/religion.jpg')}
        style={styles.image}
        resizeMode="cover"
      />

      <Text style={styles.title}>மதம் மற்றும் தெய்வ வழிபாடு</Text>

      <Text style={styles.content}>
        வேளாளர் சமூகத்தினர் முதலில் தாயாகக் கருதப்படும் கங்கை அம்மனை வழிபட்டனர். அதன் பின், சமய வளர்ச்சியின் காரணமாக சைவம், சமணம், மற்றும் வைணவம் ஆகிய சமயங்களைப் பின்பற்றினர்.
        {'\n\n'}
        பல வேளாளர் குடும்பங்களில் பச்சையம்மன், ரேணுகா தேவி, மாரியம்மன் போன்ற தெய்வங்கள் முக்கியமாக வழிபடப்படுகின்றன. இவை குடும்பக் குலதெய்வங்களாகவே இருந்து வருகின்றன.
        {'\n\n'}
        வேளாளர் சமுதாயத்தின் சில பிரிவுகள் சமண சமயத்தையும் பின்பற்றினர். குறிப்பாக ஜவாது மலைப் பகுதிகளில் சமண சமயத்திற்கான சின்னங்கள் மற்றும் பள்ளிகள் காணப்படுகின்றன. இது வேளாளர் சமுதாயத்தின் சமய ஒற்றுமையை வெளிப்படுத்துகிறது.
        {'\n\n'}
        “பிள்ளை”, “முதலியார்”, “நாயினார்” போன்ற பட்டங்கள் சமய அடிப்படையில் வழங்கப்பட்டவை. இந்த சமூக பட்டங்கள், சமய அடையாளங்களாகவே மாறின.
        {'\n\n'}
        வேளாளர் சமுதாயம் மதத்தினை சமுதாய ஒற்றுமைக்கு வழிகாட்டியாகவே கருதி செயல்பட்டது. சமய வழிபாடுகள் மற்றும் விழாக்கள் சமூக ஒற்றுமை, பண்பாட்டுக் கொடுப்பனவு மற்றும் ஆன்மீக வளர்ச்சி ஆகியவற்றில் முக்கிய பங்காற்றின.
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
