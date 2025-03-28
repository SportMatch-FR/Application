import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import { supabase } from '@/supabaseClient';
import { editProfileSchema } from '@/app/validations/validation';
import DropDownPicker from 'react-native-dropdown-picker';
import { getCities } from '@/app/services/supabaseService';

export default function EditProfileScreen() {
  const router = useRouter();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const [cityOpen, setCityOpen] = useState(false);
  const [city, setCity] = useState(0);
  const [cityItems, setCityItems] = useState([]);

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

    const loadCities = async () => {
      const cities = await getCities();
      setCityItems(cities.map((c: any) => ({ label: c.name, value: c.id })));
    };

    fetchUser();
    loadCities();
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
      data: { first_name: firstName, last_name: lastName, city_id: city }
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
    <View style={styles.container} contentContainerStyle={styles.content}>
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

        <DropDownPicker
          open={cityOpen}
          value={city}
          items={cityItems}
          setOpen={setCityOpen}
          setValue={setCity}
          setItems={setCityItems}
          placeholder='Sélectionnez une ville'
          containerStyle={styles.dropdownContainer}
          style={styles.dropdown}
          dropDownContainerStyle={styles.dropdownBox}
          textStyle={{ fontSize: 16, fontFamily: 'Inter-Regular' }}
          zIndex={2000}
          zIndexInverse={2000}
        />

        <TouchableOpacity style={styles.button} onPress={handleUpdateProfile} disabled={updating}>
          {updating ? (
            <ActivityIndicator color='#fff' />
          ) : (
            <Text style={styles.buttonText}>Sauvegarder</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  content: {
    padding: 20
  },
  form: {
    gap: 15
  },
  dropdownContainer: { marginBottom: 15 },
  dropdown: {
    borderColor: '#ddd',
    borderRadius: 8,
    fontSize: 16
  },
  dropdownBox: {
    borderColor: '#ddd'
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
