import React, { useState, useEffect, useRef } from 'react';
import { View, Text as RNText, TouchableOpacity, StyleSheet, TextInput as RNTextInput } from 'react-native';
import { TextInput, Button, RadioButton, HelperText, Text } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { db } from '@/lib/firebase';
import QRCode from 'react-native-qrcode-svg';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Picker } from '@react-native-picker/picker';
import { locationMasterData } from '@/lib/locationMasterData';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

const schema = z
  .object({
    name: z.string().min(1, 'பெயர் அவசியம் / Name is required'),
    birthday: z.string().min(1, 'பிறந்த தேதி/வயது அவசியம் / Birthday is required'),
    age: z.number().min(1, 'வயது தவிர்க்க முடியாது / Age is required'),
    phoneNumber: z.string().min(10, 'தொலைபேசி எண் சரியாக உள்ளிடவும் / Enter valid phone number'),
    email: z.string().email('சரியான மின்னஞ்சலை உள்ளிடவும் / Enter valid email'),
    fatherName: z.string().min(1, 'தந்தையார் பெயர் அவசியம் / Father name required'),
    motherName: z.string().min(1, 'தாயார் பெயர் அவசியம் / Mother name required'),
    state: z.string().min(1, 'மாநிலம் அவசியம் / State is required'),
    mandalam: z.string().min(1, 'மண்டலம் அவசியம் / Mandalam required'),
    district: z.string().min(1, 'மாவட்டம் அவசியம் / District required'),
    taluk: z.string().min(1, 'வட்டம் அவசியம் / Taluk required'),
    village: z.string().min(1, 'ஊர் அவசியம் / Village required'),
    subCaste: z.string().min(1, 'வேளாளரின் உட்பிரிவு அவசியம் / Sub caste required'),
    degree: z.string().min(1, 'பட்டம் அவசியம் / Degree required'),
    job: z.string().min(1, 'தொழில் அவசியம் / Job required'),
    memberStatus: z.enum(['இல்லை', 'ஆம்-உறுப்பினர்'], {
      required_error: 'சங்க உறுப்பினர் தேர்வு செய்க / Select member status',
    }),
    associationName: z.string().optional(),
    modeOfTransport: z.string().min(1, 'போக்குவரத்து தேர்வு அவசியம் / Mode of transport is required'), // Made required
    vehicleNumber: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.memberStatus === 'ஆம்-உறுப்பினர்') {
      if (!data.associationName || data.associationName.trim() === '') {
        ctx.addIssue({
          path: ['associationName'],
          code: z.ZodIssueCode.custom,
          message: 'சங்கத்தின் பெயர் அவசியம் / Association name is required',
        });
      }
    }
  });

type FormData = z.infer<typeof schema>;

const transportOptions = [
  { id: 'bus', label: 'பேருந்து' },
  { id: 'auto', label: 'ஆட்டோ' },
  { id: 'van', label: 'வேன்' },
  { id: 'two_wheeler', label: 'இருசக்கரம்' },
  { id: 'others', label: 'மற்றவை' },
];

export default function EventRegistration() {
  const scrollViewRef = useRef<KeyboardAwareScrollView>(null);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [step, setStep] = useState<'event' | 'form' | 'success'>('event');
  const [qrData, setQrData] = useState<string | null>(null);
  const [stateList, setStateList] = useState<string[]>([]);
  const [mandalamList, setMandalamList] = useState<string[]>([]);
  const [districtList, setDistrictList] = useState<string[]>([]);
  const [talukList, setTalukList] = useState<string[]>([]);
  const [villageList, setVillageList] = useState<string[]>([]);

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      birthday: '',
      age: 0,
      phoneNumber: '',
      email: '',
      fatherName: '',
      motherName: '',
      state: '',
      mandalam: '',
      district: '',
      taluk: '',
      village: '',
      subCaste: '',
      degree: '',
      job: '',
      memberStatus: 'இல்லை',
      associationName: '',
      modeOfTransport: '', // Always initialized
      vehicleNumber: '',
    },
  });

  // Watch location fields
  const selectedState = watch('state');
  const selectedMandalam = watch('mandalam');
  const selectedDistrict = watch('district');
  const selectedTaluk = watch('taluk');
  const birthday = watch('birthday');

  // Update Mandalam when state changes
  useEffect(() => {
    const uniqueStates = [...new Set(locationMasterData.map(item => item.state))];
    setStateList(uniqueStates);
  }, []);

  // Mandalam based on state
  useEffect(() => {
    const filtered = locationMasterData.filter(item => item.state === selectedState);
    const unique = [...new Set(filtered.map(item => item.mandalam))];
    setMandalamList(unique);
    setValue('mandalam', '');
    setDistrictList([]);
    setTalukList([]);
    setVillageList([]);
  }, [selectedState]);

  // District based on mandalam
  useEffect(() => {
    const filtered = locationMasterData.filter(item =>
      item.state === selectedState && item.mandalam === selectedMandalam
    );
    const unique = [...new Set(filtered.map(item => item.district))];
    setDistrictList(unique);
    setValue('district', '');
    setTalukList([]);
    setVillageList([]);
  }, [selectedMandalam]);

  // Taluk based on district
  useEffect(() => {
    const filtered = locationMasterData.filter(item =>
      item.state === selectedState &&
      item.mandalam === selectedMandalam &&
      item.district === selectedDistrict
    );
    const unique = [...new Set(filtered.map(item => item.taluk))];
    setTalukList(unique);
    setValue('taluk', '');
    setVillageList([]);
  }, [selectedDistrict]);

  // Village based on taluk
  useEffect(() => {
    const filtered = locationMasterData.filter(item =>
      item.state === selectedState &&
      item.mandalam === selectedMandalam &&
      item.district === selectedDistrict &&
      item.taluk === selectedTaluk
    );
    const unique = [...new Set(filtered.map(item => item.village))];
    setVillageList(unique);
    setValue('village', '');
  }, [selectedTaluk]);

  // Calculate age from birthday
  useEffect(() => {
    if (birthday) {
      const birthDate = new Date(birthday);
      if (!isNaN(birthDate.getTime())) {
        const ageDifMs = Date.now() - birthDate.getTime();
        const ageDate = new Date(ageDifMs);
        const age = Math.abs(ageDate.getUTCFullYear() - 1970);
        setValue('age', age);
      }
    }
  }, [birthday, setValue]);

  const onSubmit = async (data: FormData) => {
    try {
      const docRef = await addDoc(collection(db, 'event_registrations'), {
        ...data,
        createdAt: Timestamp.now(),
        status: 'not scanned',
        personStatus: 'not arrived',
      });

      console.log('Document written with ID: ', docRef.id);
      setQrData(JSON.stringify({ id: docRef.id }));
      setStep('success');
      reset();
      setAcceptedTerms(false);
    } catch (e) {
      console.error('Error adding document: ', e);
      alert('பதிவு செய்ய முடியவில்லை / Submission failed');
    }
  };

  if (step === 'success' && qrData) {
    return (
      <View style={styles.successContainer}>
        <Text variant="headlineMedium" style={styles.successTitle}>✅ பதிவு வெற்றிகரமாக முடிந்தது</Text>
        <RNText>இந்த QR குறியீட்டை ஸ்கேன் செய்யவும்:</RNText>
        <View style={styles.qrWrapper}>
          <QRCode value={qrData} size={200} />
        </View>
        <Button
          mode="contained"
          onPress={() => {
            setStep('event');
            setQrData(null);
          }}
          style={styles.button}
        >
          மற்றொரு பதிவு
        </Button>
      </View>
    );
  }

  if (step === 'event') {
    return (
      <View style={styles.eventContainer}>
        <View style={styles.animationPlaceholder}>
          <RNText style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>
            🎉 விழா அறிவிப்பு - ஒருங்கிணைந்த வேளாளர்/வெள்ளாளர் சங்க கூட்டமைப்பு மாநாடு 🎉
          </RNText>
        </View>

        <View style={styles.eventDetails}>
          <RNText style={styles.eventInfo}>நாள்: 13-07-2025, ஞாயிற்றுக்கிழமை</RNText>
          <RNText style={styles.eventInfo}>நேரம்: மாலை 4.00 மணி</RNText>
          <RNText style={styles.eventInfo}>இடம்: ஜி கார்னர், திருச்சிராப்பள்ளி</RNText>
        </View>

        <Button
          mode="contained"
          onPress={() => setStep('form')}
          style={styles.button}
          contentStyle={styles.buttonContent}
        >
          பதிவு செய்ய
        </Button>
      </View>
    );
  }

  // Custom Dropdown Component
  const Dropdown = ({ label, value, onChange, items, error }: any) => (
    <View style={styles.dropdownContainer}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={value}
          onValueChange={onChange}
          style={styles.picker}
          dropdownIconColor="#047857"
        >
          <Picker.Item label="தேர்வு செய்க / Select" value="" />
          {items.map((item: string, index: number) => (
            <Picker.Item key={index} label={item} value={item} />
          ))}
        </Picker>
      </View>
      {error && <HelperText type="error">{error}</HelperText>}
    </View>
  );

  return (
    <KeyboardAwareScrollView
      ref={scrollViewRef}
      style={{ flex: 1 }}
      contentContainerStyle={[styles.container, { paddingBottom: 20 }]}
      keyboardShouldPersistTaps="handled"
      extraScrollHeight={95}
      enableOnAndroid={true}
    >
      <Text variant="titleLarge" style={styles.title}>மாநாடு வருகைப் பதிவுப் படிவம்</Text>

      <Controller
        control={control}
        name="name"
        render={({ field }) => (
          <>
            <TextInput
              label="பெயர் / Name"
              value={field.value}
              onChangeText={field.onChange}
              mode="outlined"
              style={styles.input}
              activeOutlineColor="#047857"
            />
            {errors.name && <HelperText type="error">{errors.name.message}</HelperText>}
          </>
        )}
      />

      <Controller
        control={control}
        name="birthday"
        render={({ field }) => (
          <>
            <TextInput
              label="பிறந்த தேதி(ஆண்டு-மாதம்-தேதி) / Birthday"
              value={field.value}
              onChangeText={field.onChange}
              mode="outlined"
              style={styles.input}
              placeholder="2025-07-13"
              activeOutlineColor="#047857"
            />
            {errors.birthday && <HelperText type="error">{errors.birthday.message}</HelperText>}
          </>
        )}
      />

      <Controller
        control={control}
        name="age"
        render={({ field }) => (
          <TextInput
            label="வயது / Age"
            value={field.value?.toString()}
            mode="outlined"
            style={styles.input}
            editable={false}
            activeOutlineColor="#047857"
          />
        )}
      />

      <Controller
        control={control}
        name="phoneNumber"
        render={({ field }) => (
          <>
            <TextInput
              label="அலைபேசி / Phone Number"
              value={field.value}
              keyboardType="phone-pad"
              onChangeText={field.onChange}
              mode="outlined"
              style={styles.input}
              activeOutlineColor="#047857"
            />
            {errors.phoneNumber && <HelperText type="error">{errors.phoneNumber.message}</HelperText>}
          </>
        )}
      />

      <Controller
        control={control}
        name="email"
        render={({ field }) => (
          <>
            <TextInput
              label="மின்னஞ்சல் / Email"
              value={field.value}
              keyboardType="email-address"
              onChangeText={field.onChange}
              mode="outlined"
              style={styles.input}
              autoCapitalize="none"
              activeOutlineColor="#047857"
            />
            {errors.email && <HelperText type="error">{errors.email.message}</HelperText>}
          </>
        )}
      />

      <Controller
        control={control}
        name="fatherName"
        render={({ field }) => (
          <>
            <TextInput
              label="தந்தையார் பெயர் / Father Name"
              value={field.value}
              onChangeText={field.onChange}
              mode="outlined"
              style={styles.input}
              activeOutlineColor="#047857"
            />
            {errors.fatherName && <HelperText type="error">{errors.fatherName.message}</HelperText>}
          </>
        )}
      />

      <Controller
        control={control}
        name="motherName"
        render={({ field }) => (
          <>
            <TextInput
              label="தாயார் பெயர் / Mother Name"
              value={field.value}
              onChangeText={field.onChange}
              mode="outlined"
              style={styles.input}
              activeOutlineColor="#047857"
            />
            {errors.motherName && <HelperText type="error">{errors.motherName.message}</HelperText>}
          </>
        )}
      />

      <Controller
        control={control}
        name="state"
        render={({ field }) => (
          <Dropdown
            label="மாநிலம் / State"
            value={field.value}
            onChange={field.onChange}
            items={stateList}
            error={errors.state?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="mandalam"
        render={({ field }) => (
          <Dropdown
            label="மண்டலம் / Mandalam"
            value={field.value}
            onChange={field.onChange}
            items={mandalamList}
            error={errors.mandalam?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="district"
        render={({ field }) => (
          <Dropdown
            label="மாவட்டம் / District"
            value={field.value}
            onChange={field.onChange}
            items={districtList}
            error={errors.district?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="taluk"
        render={({ field }) => (
          <Dropdown
            label="வட்டம் / Taluk"
            value={field.value}
            onChange={field.onChange}
            items={talukList}
            error={errors.taluk?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="village"
        render={({ field }) => (
          <Dropdown
            label="ஊர் / Village"
            value={field.value}
            onChange={field.onChange}
            items={villageList}
            error={errors.village?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="subCaste"
        render={({ field }) => (
          <>
            <TextInput
              label="வேளாளரின் உட்பிரிவு / Sub caste"
              value={field.value}
              onChangeText={field.onChange}
              mode="outlined"
              style={styles.input}
              activeOutlineColor="#047857"
            />
            {errors.subCaste && <HelperText type="error">{errors.subCaste.message}</HelperText>}
          </>
        )}
      />

      <Controller
        control={control}
        name="degree"
        render={({ field }) => (
          <>
            <TextInput
              label="பட்டம் / Degree"
              value={field.value}
              onChangeText={field.onChange}
              mode="outlined"
              style={styles.input}
              activeOutlineColor="#047857"
            />
            {errors.degree && <HelperText type="error">{errors.degree.message}</HelperText>}
          </>
        )}
      />

      <Controller
        control={control}
        name="job"
        render={({ field }) => (
          <>
            <TextInput
              label="தொழில் / Job"
              value={field.value}
              onChangeText={field.onChange}
              mode="outlined"
              style={styles.input}
              activeOutlineColor="#047857"
            />
            {errors.job && <HelperText type="error">{errors.job.message}</HelperText>}
          </>
        )}
      />

      <Controller
        control={control}
        name="memberStatus"
        render={({ field }) => (
          <View style={{ marginVertical: 10 }}>
            <RNText style={{ marginBottom: 6 }}>
              சங்கத்தின் உறுப்பினரா? / Member status
            </RNText>
            <RadioButton.Group onValueChange={field.onChange} value={field.value}>
              <View style={styles.radioRow}>
                <RadioButton
                  value="ஆம்-உறுப்பினர்"
                  color="#047857"
                  uncheckedColor="#047857"
                />
                <RNText style={styles.radioLabel}>ஆம்-உறுப்பினர்</RNText>
              </View>
              <View style={styles.radioRow}>
                <RadioButton
                  value="இல்லை"
                  color="#047857"
                  uncheckedColor="#047857"
                />
                <RNText style={styles.radioLabel}>இல்லை</RNText>
              </View>
            </RadioButton.Group>
            {errors.memberStatus && (
              <HelperText type="error">{errors.memberStatus.message}</HelperText>
            )}
          </View>
        )}
      />

      {watch('memberStatus') === 'ஆம்-உறுப்பினர்' && (
        <Controller
          control={control}
          name="associationName"
          render={({ field }) => (
            <>
              <TextInput
                label="வேளாளர் சங்கத்தின் பெயர் / Name of Association"
                mode="outlined"
                value={field.value}
                onBlur={field.onBlur}
                onChangeText={field.onChange}
                style={{ marginBottom: 8 }}
                error={!!errors.associationName}
                activeOutlineColor="#047857"
              />
              {errors.associationName && (
                <HelperText type="error">{errors.associationName.message}</HelperText>
              )}
            </>
          )}
        />
      )}

      {/* Mode of Transport (always visible) */}
      <Controller
        control={control}
        name="modeOfTransport"
        render={({ field }) => (
          <View style={{ marginVertical: 12 }}>
            <RNText style={{ marginBottom: 8, fontWeight: 'bold' }}>
              மாநாட்டின் வருகை விவரம் / Mode of Transport
            </RNText>
            <RadioButton.Group
              onValueChange={field.onChange}
              value={field.value || ''}
            >
              {transportOptions.map(option => (
                <View key={option.id} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6 }}>
                  <RadioButton
                    value={option.id}
                    color="#047857"
                    uncheckedColor="#047857"
                  />
                  <RNText>{option.label}</RNText>
                </View>
              ))}
            </RadioButton.Group>
            {errors.modeOfTransport && (
              <HelperText type="error">{errors.modeOfTransport.message}</HelperText>
            )}
          </View>
        )}
      />

      {/* Vehicle Number (always visible) */}
      <Controller
        control={control}
        name="vehicleNumber"
        render={({ field }) => (
          <>
            <TextInput
              label="வாகன எண் / Vehicle Number (Optional)"
              mode="outlined"
              onBlur={field.onBlur}
              onChangeText={field.onChange}
              value={field.value}
              error={!!errors.vehicleNumber}
              style={styles.input}
              activeOutlineColor="#047857"
              onFocus={() => {
                setTimeout(() => {
                  scrollViewRef.current?.scrollToEnd(true);
                }, 300);
              }}
            />
            <HelperText type="error" visible={!!errors.vehicleNumber}>
              {errors.vehicleNumber?.message}
            </HelperText>
          </>
        )}
      />

      <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 12 }}>
        <TouchableOpacity
          onPress={() => setAcceptedTerms(!acceptedTerms)}
          style={styles.checkbox}
        >
          {acceptedTerms && <View style={styles.checkboxChecked} />}
        </TouchableOpacity>
        <RNText style={{ flex: 1, fontWeight: 'bold', color: 'black' }}>
          "வேளாளர் சமூக மாநாடு மற்றும் மாநாட்டுப் பொறுப்பாளர்களின் சட்ட திட்டங்களுக்கு உட்பட்டு வேளாளர் மாநாட்டில் கலந்து கொண்டு சிறப்பிக்க உறுதிமொழி அளிக்கின்றேன்."
        </RNText>
      </View>

      <Button
        mode="contained"
        onPress={() => {
          if (!acceptedTerms) {
            alert("தயவுசெய்து நிபந்தனைகளை ஏற்கவும் / Please accept the terms and conditions.");
            return;
          }
          handleSubmit(onSubmit)();
        }}
        style={styles.submitButton}
        contentStyle={styles.FbuttonContent}
      >
        சமர்ப்பிக்க / Submit
      </Button>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    marginBottom: 20,
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#065f46',
  },
  input: {
    backgroundColor: '#ffffff',
    marginBottom: 12,
    borderRadius: 8,
  },
  submitButton: {
    backgroundColor: '#047857',
    padding: 5,
    borderRadius: 40,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    paddingVertical: 2,
  },
  successContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#f0fff4',
  },
  successTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#065f46',
    textAlign: 'center',
  },
  qrWrapper: {
    marginVertical: 24,
    padding: 20,
    backgroundColor: '#d1fae5',
    borderRadius: 12,
    elevation: 3,
  },
  radioRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
  },
  radioLabel: {
    marginLeft: 8,
    fontSize: 16,
    color: '#1f2937',
  },
  button: {
    width: '100%',
    paddingVertical: 6,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2e7d32',
    marginTop: 20,
  },
  buttonContent: {
    paddingHorizontal: 85,
    paddingVertical: 10
  },
  FbuttonContent: {
    paddingHorizontal: 24,
    paddingVertical: 6
  },
  eventContainer: {
    backgroundColor: '#ffff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  eventInfo: {
    fontSize: 16,
    color: '#047857',
    textAlign: 'center',
  },
  dropdownContainer: {
    marginBottom: 15,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#047857',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 8,
    height: 50,
    justifyContent: 'center',
    backgroundColor: '#f0fdf4',
  },
  picker: {
    width: '100%',
    color: '#1f2937',
  },
  label: {
    marginBottom: 4,
    fontWeight: 'bold',
    color: '#065f46',
  },
  animationPlaceholder: {
    height: 150,
    backgroundColor: 'rgba(17, 123, 68, 0.79)',
    borderRadius: 11,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 10,
  },
  eventDetails: {
    padding: 10,
  },
  checkbox: {
    height: 24,
    width: 24,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#047857',
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    height: 14,
    width: 14,
    backgroundColor: '#047857',
    borderRadius: 2,
  },
});