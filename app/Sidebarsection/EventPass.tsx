import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, LayoutAnimation } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import QRCode from 'react-native-qrcode-svg';

export default function EventPass() {
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [expandedIds, setExpandedIds] = useState<string[]>([]);

  useEffect(() => {
    const fetchRegistrations = async () => {
      const snapshot = await getDocs(collection(db, 'event_registrations'));
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setRegistrations(data);
    };

    fetchRegistrations();
  }, []);

  const toggleExpand = (id: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity onPress={() => toggleExpand(item.id)} style={styles.card}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.phone}>{item.phoneNumber}</Text>

      {expandedIds.includes(item.id) && (
        <View style={styles.qrWrapper}>
          <QRCode value={JSON.stringify({ id: item.id })} size={160} />
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={registrations}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      contentContainerStyle={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f3f4f6',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    elevation: 2,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#065f46',
  },
  phone: {
    fontSize: 16,
    color: '#374151',
  },
  qrWrapper: {
    marginTop: 12,
    alignItems: 'center',
  },
});
