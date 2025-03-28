import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, Platform } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { eventCreateSchema } from '@/app/validations/validation';
import { fetchSports, getCities, getUserId, updateEvent, fetchEventDetails } from '@/app/services/supabaseService';
import { useRouter } from 'expo-router';
import { useLocalSearchParams } from 'expo-router';

export default function EventModifyScreen() {
  const router = useRouter();
  const { eventId } = useLocalSearchParams();

  const [sportOpen, setSportOpen] = useState(false);
  const [sport, setSport] = useState(0);
  const [sportItems, setSportItems] = useState([]);

  const [cityOpen, setCityOpen] = useState(false);
  const [city, setCity] = useState(0);
  const [cityItems, setCityItems] = useState([]);

  const [location, setLocation] = useState('');
  const [participants, setParticipants] = useState('');
  const [date, setDate] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const sports = await fetchSports();
        setSportItems(sports.map((s: any) => ({ label: s.name, value: s.id })));

        const cities = await getCities();
        setCityItems(cities.map((c: any) => ({ label: c.name, value: c.id })));

        if (eventId) {
          const eventDetails = await fetchEventDetails(eventId as string);

          setSport(eventDetails.sport_id);
          setCity(eventDetails.city_id);
          setLocation(eventDetails.location);
          setParticipants(eventDetails.participants.toString());
          setDate(new Date(eventDetails.date));
        }
      } catch (err) {
        Alert.alert('Erreur', 'Impossible de charger les données.');
      }
    };
    loadData();
  }, [eventId]);

  const handleUpdateEvent = async () => {
    if (!date) {
      Alert.alert('Erreur', "Veuillez sélectionner une date.");
      return;
    }

    const user_id = await getUserId();

    if (!user_id) {
      console.error('UserId not found');
      return;
    }

    const formData = {
      location,
      date,
      participants,
      sport,
      city,
    };

    const validationResult = eventCreateSchema.safeParse(formData);
    if (!validationResult.success) {
      const errors = validationResult.error.errors.map(err => err.message).join("\n");
      Alert.alert("Erreur de validation", errors);
      return;
    }

    const { date: finalDate, participants: parsedParticipants } = validationResult.data;
    const displayDate = finalDate.toLocaleDateString('fr-FR');

    try {
      const payload = {
        event_id: eventId as string,
        sport,
        location,
        city,
        date: finalDate.toISOString(),
        participants: parsedParticipants,
        user_id,
      };

      const result = await updateEvent(payload);
      Alert.alert(
        'Succès',
        'Événement modifié !'
      );
      router.back();
    } catch (error: any) {
      Alert.alert("Erreur", error.message);
    }
  };

  const handleDateChange = (event: any, selectedDate: Date | undefined) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Modification d'un événement</Text>

      <Text style={styles.label}>Sport</Text>
      <DropDownPicker
        open={sportOpen}
        value={sport}
        items={sportItems}
        setOpen={setSportOpen}
        setValue={setSport}
        setItems={setSportItems}
        placeholder="Sélectionnez un sport"
        containerStyle={styles.dropdownContainer}
        style={styles.dropdown}
        dropDownContainerStyle={styles.dropdownBox}
        zIndex={3000}
        zIndexInverse={1000}
      />

      <Text style={styles.label}>Ville</Text>
      <DropDownPicker
        open={cityOpen}
        value={city}
        items={cityItems}
        setOpen={setCityOpen}
        setValue={setCity}
        setItems={setCityItems}
        placeholder="Sélectionnez une ville"
        containerStyle={styles.dropdownContainer}
        style={styles.dropdown}
        dropDownContainerStyle={styles.dropdownBox}
        zIndex={2000}
        zIndexInverse={2000}
      />

      <Text style={styles.label}>Localisation</Text>
      <TextInput
        style={styles.input}
        placeholder="Entrez le lieu"
        value={location}
        onChangeText={setLocation}
      />

      <Text style={styles.label}>Date</Text>
      <TouchableOpacity
        style={[styles.input, styles.dateButton]}
        onPress={() => setShowDatePicker(true)}
      >
        <Text style={styles.dateButtonText}>
          {date ? date.toLocaleDateString('fr-FR') : 'Sélectionnez une date'}
        </Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={date || new Date()}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleDateChange}
          minimumDate={new Date()}
          locale="fr-FR"
        />
      )}

      <Text style={styles.label}>Participants</Text>
      <TextInput
        style={styles.input}
        placeholder="Entrez le nombre de participants"
        value={participants}
        onChangeText={setParticipants}
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.updateButton} onPress={handleUpdateEvent}>
        <Text style={styles.updateButtonText}>Modifier</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  header: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    marginBottom: 20,
    color: '#007AFF',
  },
  label: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  dropdownContainer: { marginBottom: 15 },
  dropdown: {
    borderColor: '#ddd',
    borderRadius: 8,
  },
  dropdownBox: {
    borderColor: '#ddd',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    marginBottom: 15,
    justifyContent: 'center',
  },
  dateButton: {},
  dateButtonText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#666',
  },
  updateButton: {
    height: 50,
    backgroundColor: '#007AFF',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  updateButtonText: {
    fontFamily: 'Inter-SemiBold',
    color: '#fff',
    fontSize: 16,
  },
});
