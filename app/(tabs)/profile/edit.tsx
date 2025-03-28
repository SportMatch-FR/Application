import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { useRouter } from 'expo-router';
import { supabase } from '@/supabaseClient';
import { editProfileSchema } from '@/app/validations/validation';

export default function EditProfileScreen() {
  const router = useRouter();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) {
        console.error('Erreur lors de la récupération de la session :', error);
      } else if (session) {
        const metadata = session.user.user_metadata || {};
        setFirstName(metadata.first_name || '');
        setLastName(metadata.last_name || '');
      }
      setLoading(false);
    };

    fetchUser();
  }, []);

  const handleUpdateProfile = async () => {
    const validationResult = editProfileSchema.safeParse({ firstName, lastName });
    if (!validationResult.success) {
      const errors = validationResult.error.errors.map(err => err.message).join('\n');
      Alert.alert('Erreur de validation', errors);
      return;
    }
    setUpdating(true);
    const { data, error } = await supabase.auth.updateUser({
      data: { first_name: firstName, last_name: lastName }
    });
    setUpdating(false);
    if (error) {
      Alert.alert('Erreur', error.message);
    } else {
      Alert.alert('Succès', 'Profil mis à jour avec succès !');
      router.back();
    }
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size='large' color='#007AFF' />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder='Prénom'
          value={firstName}
          onChangeText={setFirstName}
        />
        <TextInput
          style={styles.input}
          placeholder='Nom de famille'
          value={lastName}
          onChangeText={setLastName}
        />

        <TouchableOpacity style={styles.button} onPress={handleUpdateProfile} disabled={updating}>
          {updating ? (
            <ActivityIndicator color='#fff' />
          ) : (
            <Text style={styles.buttonText}>Sauvegarder</Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  content: {
    padding: 20
  },
  form: {
    gap: 15
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    fontFamily: 'Inter-Regular'
  },
  button: {
    height: 50,
    backgroundColor: '#007AFF',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Inter-SemiBold'
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
