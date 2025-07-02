import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  startAfter,
  onSnapshot
} from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface Registration {
  id: string;
  name: string;
  phoneNumber: string;
  district: string;
  village: string;
  scanned?: boolean;
  personStatus?: string;
}

const PAGE_SIZE = 10;

export default function AttendanceList() {
  const [data, setData] = useState<Registration[]>([]);
  const [lastDocs, setLastDocs] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);

useEffect(() => {
  const ref = collection(db, 'event_registrations');
  const q = query(ref, orderBy('createdAt'), limit(PAGE_SIZE));

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const docs = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Registration[];

    setData(docs);

    if (docs.length > 0) {
      const updatedLastDocs = [...lastDocs];
      updatedLastDocs[0] = snapshot.docs[snapshot.docs.length - 1];
      setLastDocs(updatedLastDocs);
    }

    setPage(1);
    setMaxPage(2); // Reset maxPage if needed
  });

  return () => unsubscribe(); // Cleanup listener
}, []);


const fetchData = async (pageToLoad: number) => {
  const ref = collection(db, 'event_registrations');
  let q;

  if (pageToLoad > 1 && lastDocs[pageToLoad - 2]) {
    q = query(ref, orderBy('createdAt'), startAfter(lastDocs[pageToLoad - 2]), limit(PAGE_SIZE));
  } else if (pageToLoad > 1 && !lastDocs[pageToLoad - 2]) {
    return; // 🛑 Prevent navigation if no cursor for this page
  } else {
    q = query(ref, orderBy('createdAt'), limit(PAGE_SIZE));
  }

  const snapshot = await getDocs(q);
  const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Registration[];

  // 🛑 No data means stay on current page
  if (docs.length === 0) return;

  // ✅ Store cursor if it's a new page
  if (!lastDocs[pageToLoad - 1] && docs.length === PAGE_SIZE) {
    const updatedLastDocs = [...lastDocs];
    updatedLastDocs[pageToLoad - 1] = snapshot.docs[snapshot.docs.length - 1];
    setLastDocs(updatedLastDocs);
  }

  setData(docs);
  setPage(pageToLoad);

  if (pageToLoad >= maxPage) {
    setMaxPage(pageToLoad);
  }
};



const renderCell = (content: React.ReactNode) => (
  <View style={styles.cell}>
    {typeof content === 'string' || typeof content === 'number' ? (
      <Text style={styles.cellText}>{content}</Text>
    ) : (
      content
    )}
  </View>
);



const renderItem = ({ item, index }: { item: Registration; index: number }) => {
  const statusText = item.scanned ? 'scanned' : 'registered';
  const personStatus = item.personStatus || 'N/A';

  const getTag = (status: string) => {
    const lower = status.toLowerCase();
    if (lower === 'arrived') {
      return (
        <View style={[styles.tag, styles.arrivedTag]}>
          <Text style={styles.tagText}>Arrived</Text>
        </View>
      );
    } else if (lower === 'not arrived') {
      return (
        <View style={[styles.tag, styles.notArrivedTag]}>
          <Text style={styles.tagText}>Not Arrived</Text>
        </View>
      );
    } else {
      return <Text style={styles.cellText}>{status}</Text>;
    }
  };

  return (
    <View style={styles.row}>
      {renderCell((index + 1 + (page - 1) * PAGE_SIZE).toString())}
      {renderCell(item.name)}
      {renderCell(item.phoneNumber)}
      {renderCell(item.district)}
      {renderCell(item.village)}
      {renderCell(statusText)}
      {renderCell(getTag(personStatus))}
    </View>
  );
};


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Attendance List</Text>
      <Text style={styles.scrollHint}>← Scroll to see more →</Text>

      <ScrollView horizontal>
        <View>
          {/* Table Header */}
          <View style={[styles.row, styles.header]}>
            {renderCell('S.No')}
            {renderCell('Name')}
            {renderCell('Contact')}
            {renderCell('District')}
            {renderCell('Village')}
            {renderCell('Status')}
            {renderCell('Person Status')}
          </View>

          <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
          />
        </View>
      </ScrollView>

      {/* Pagination Controls */}
      <View style={styles.pagination}>
        <TouchableOpacity
          style={[styles.pageBtn, page === 1 && styles.disabledBtn]}
          onPress={() => page > 1 && fetchData(page - 1)}
          disabled={page === 1}
        >
          <Text style={styles.pageBtnText}>&lt; Prev</Text>
        </TouchableOpacity>

        {[...Array(maxPage).keys()].map((_, i) => (
          <TouchableOpacity key={i} onPress={() => fetchData(i + 1)}>
            <Text
              style={[
                styles.pageNumber,
                page === i + 1 && styles.activePage,
              ]}
            >
              {i + 1}
            </Text>
          </TouchableOpacity>
        ))}

<TouchableOpacity
  style={[styles.pageBtn, maxPage === page && styles.disabledBtn]}
  onPress={() => fetchData(page + 1)}
  disabled={maxPage === page}
>
  <Text style={styles.pageBtnText}>Next &gt;</Text>
</TouchableOpacity>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingTop:50
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#047857',
    textAlign: 'center',
  },
  scrollHint: {
    textAlign: 'left',
    fontSize: 12,
    marginBottom: 4,
    color: '#6b7280',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: '#e5e7eb',
    minWidth: 900,
    backgroundColor: '#f9fafb',
  },
  header: {
    backgroundColor: '#d1fae5',
  },
  cell: {
    flex: 1,
    minWidth: 130,
    paddingHorizontal: 6,
  },
  cellText: {
    fontSize: 13,
    textAlign: 'left',
    color: '#111827',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
    gap: 8,
    flexWrap: 'wrap',
  },
  pageBtn: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#047857',
    borderRadius: 6,
  },
  pageBtnText: {
    color: 'white',
    fontWeight: 'bold',
  },
  disabledBtn: {
    backgroundColor: '#9CA3AF',
  },
  pageNumber: {
    paddingHorizontal: 8,
    fontSize: 14,
    color: '#374151',
  },
  activePage: {
    fontWeight: 'bold',
    color: '#047857',
    textDecorationLine: 'underline',
  },
  tag: {
  borderRadius: 12,
  paddingHorizontal: 10,
  paddingVertical: 2,
  alignSelf: 'flex-start',
},
tagText: {
  color: 'white',
  fontSize: 12,
  fontWeight: 'bold',
},

arrivedTag: {
  backgroundColor: '#10B981', // Tailwind green-500
},

notArrivedTag: {
  backgroundColor: '#F97316', // Tailwind orange-500
},

});