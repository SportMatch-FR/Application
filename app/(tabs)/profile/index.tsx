import React, { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { useFocusEffect, useRouter } from 'expo-router';
import { supabase } from '@/supabaseClient';
import type { User } from '@supabase/supabase-js';
import { fetchUser, getUserCity } from '@/app/services/supabaseService';

export default function ProfileScreen() {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(true);

  const loadUser = useCallback(async () => {
    try {
      setLoading(true);
      const u = await fetchUser();
      setUser(u);
    } catch (error) {
      console.error('Error fetching session:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const loadCity = useCallback(async () => {
    try {
      const c = await getUserCity();
      setCity(c);
    } catch (error) {
      console.error('Error fetching city:', error);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadUser();
    }, [loadUser])
  );

  useFocusEffect(
    useCallback(() => {
      loadCity();
    }, [loadCity])
  );

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      router.replace('/(auth)/login');
    }
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size='large' color='#007AFF' />
      </View>
    );
  }

  const firstName = user?.user_metadata?.first_name || '';
  const lastName = user?.user_metadata?.last_name || '';
  const fullName = firstName || lastName ? `${firstName} ${lastName}`.trim() : 'Utilisateur inconnu';
  const email = user?.email || 'Email inconnu';
  const avatarUrl = user?.user_metadata?.avatar_url || 'https://cdn.gaetandev.fr/gaetan/files/Gaetan2.png';

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Image
          source={{ uri: avatarUrl }}
          style={styles.profileImage}
        />
        <Text style={styles.name}>{fullName}</Text>
        <Text style={styles.email}>{email}</Text>
        <Text style={styles.info}>Ville : {city}</Text>
        <Text style={styles.info}>Sports favoris : Football, Tennis</Text>

        <TouchableOpacity
          style={styles.eventsButton}
          onPress={() => router.push('/events/myevents')}
        >
          <Text style={styles.eventsButtonText}>Mes événements</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.editButton}
          onPress={() => router.push('/profile/edit')}
        >
          <Text style={styles.editButtonText}>Modifier le profil</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Se déconnecter</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileContainer: {
    alignItems: 'center',
    marginTop: 20,
    paddingHorizontal: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#007AFF',
    backgroundColor: '#f5f5f5',
  },
  name: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    marginTop: 10,
  },
  email: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#666',
    marginTop: 5,
  },
  info: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    marginTop: 10,
  },
  eventsButton: {
    marginTop: 20,
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  eventsButtonText: {
    fontFamily: 'Inter-SemiBold',
    color: '#fff',
    fontSize: 16,
  },
  editButton: {
    marginTop: 10,
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  editButtonText: {
    fontFamily: 'Inter-SemiBold',
    color: '#fff',
    fontSize: 16,
  },
  logoutButton: {
    marginTop: 10,
    backgroundColor: '#FF3B30',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  logoutButtonText: {
    fontFamily: 'Inter-SemiBold',
    color: '#fff',
    fontSize: 16,
  },
});
