import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { MaterialIcons, Feather } from '@expo/vector-icons';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAppStore } from '@/lib/store';

const profileSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export default function Profile() {
  const { user, setUser } = useAppStore();
  const [isEditing, setIsEditing] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
    },
  });

  useEffect(() => {
    if (user) {
      setValue('name', user.name);
      setValue('email', user.email);
    }
  }, [user, setValue]);

  const onSubmit = async (data: ProfileFormData) => {
    if (!user) return;
    try {
      const userRef = doc(db, 'users', user.id); // assumes email is doc ID
      await updateDoc(userRef, {
        name: data.name,
        email: data.email,
      });

      setUser({
        ...user,
        ...data,
        isVerified: user.isVerified ?? false,
      });

      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  if (!user) {
    return (
      <View style={styles.container}>
        <Text>Loading profile...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Profile Header */}
      <View style={[styles.card, { position: 'relative' }]}>
        <View style={styles.badgeTopLeft}>
          <Text
            style={[
              styles.badge,
              user.isVerified ? styles.verified : styles.notVerified,
            ]}
          >
            {user.isVerified ? 'Verified' : 'Not Verified'}
          </Text>
        </View>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatarText}>
            {user.name?.charAt(0).toUpperCase()}
          </Text>
        </View>
        <Text style={styles.profileName}>{user.name}</Text>
      </View>

      {/* Profile Info */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Profile Information</Text>
          <TouchableOpacity onPress={() => setIsEditing(!isEditing)}>
            <Feather name="edit" size={20} color="#047857" />
          </TouchableOpacity>
        </View>

        {isEditing ? (
          <>
            <Controller
              control={control}
              name="name"
              render={({ field }) => (
                <TextInput
                  style={styles.input}
                  placeholder="Full Name"
                  value={field.value}
                  onChangeText={field.onChange}
                />
              )}
            />
            {errors.name && (
              <Text style={styles.error}>{errors.name.message}</Text>
            )}

            <Controller
              control={control}
              name="email"
              render={({ field }) => (
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  keyboardType="email-address"
                  value={field.value}
                  onChangeText={field.onChange}
                />
              )}
            />
            {errors.email && (
              <Text style={styles.error}>{errors.email.message}</Text>
            )}

            <View style={styles.row}>
              <TouchableOpacity
                style={styles.saveButton}
                onPress={handleSubmit(onSubmit)}
              >
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setIsEditing(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <View style={styles.infoBlock}>
            <View style={styles.infoRow}>
              <MaterialIcons name="email" size={20} color="#6b7280" />
              <View style={styles.infoTextGroup}>
                <Text style={styles.label}>Email</Text>
                <Text style={styles.value}>{user.email}</Text>
              </View>
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f9fafb',
    paddingTop: 70,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#047857',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 8,
  },
  avatarText: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
  },
  badgeTopLeft: {
    position: 'absolute',
    top: 8,
    left: 8,
    zIndex: 1,
  },
  badge: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 12,
    fontSize: 12,
    overflow: 'hidden',
    color: 'white',
  },
  verified: {
    backgroundColor: '#10b981',
  },
  notVerified: {
    backgroundColor: '#6b7280',
  },
  profileName: {
    fontSize: 18,
    fontWeight: '600',
    alignSelf: 'center',
    marginTop: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 10,
    marginBottom: 8,
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  saveButton: {
    backgroundColor: '#047857',
    padding: 10,
    borderRadius: 8,
    flex: 1,
    marginRight: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#e5e7eb',
    padding: 10,
    borderRadius: 8,
    flex: 1,
    marginLeft: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  cancelButtonText: {
    color: '#374151',
    fontWeight: 'bold',
  },
  infoBlock: {
    marginTop: 8,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  infoTextGroup: {
    marginLeft: 12,
  },
  label: {
    fontSize: 12,
    color: '#6b7280',
  },
  value: {
    fontSize: 16,
    fontWeight: '500',
  },
});
