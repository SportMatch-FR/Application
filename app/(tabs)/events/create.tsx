import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, Platform } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { eventCreateSchema } from '@/app/validations/validation';
import { fetchSports } from '@/app/services/supabaseService';

export default function CreateEventScreen() {
  const [open, setOpen] = useState(false);
  const [sport, setSport] = useState('');
  const [items, setItems] = useState([]);

  const [location, setLocation] = useState('');
  const [city, setCity] = useState('');
  const [participants, setParticipants] = useState('');

  const [date, setDate] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    const loadSports = async () => {
      try {
        const sports = await fetchSports();
        const dropdownItems = sports.map((sport) => ({
          label: sport.name,
          value: sport.id,
        }));
        setItems(dropdownItems);
      } catch (err) {
        Alert.alert('Erreur', 'Impossible de charger les sports.');
      }
    };
    loadSports();
  }, []);

  const handleCreateEvent = () => {
    if (!date) {
      Alert.alert('Erreur', "Veuillez sélectionner une date.");
      return;
    }

    const formData = {
      sport,
      location,
      city,
      date,
      participants,
    };

    const validationResult = eventCreateSchema.safeParse(formData);
    if (!validationResult.success) {
      const errors = validationResult.error.errors.map(err => err.message).join("\n");
      Alert.alert("Erreur de validation", errors);
      return;
    }

    const { date: finalDate, participants: parsedParticipants } = validationResult.data;
    const displayDate = finalDate.toLocaleDateString('fr-FR');

    Alert.alert(
      'Succès',
      `Événement créé !
      Sport = ${sport}
      Lieu = ${location}
      Ville = ${city}
      Date = ${displayDate}
      Participants = ${parsedParticipants}`
    );
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Création d'un événement</Text>

      <Text style={styles.label}>Sport</Text>
      <DropDownPicker
        open={open}
        value={sport}
        items={items}
        setOpen={setOpen}
        setValue={setSport}
        setItems={setItems}
        placeholder="Sélectionnez un sport"
        containerStyle={styles.dropdownContainer}
        style={styles.dropdown}
        dropDownContainerStyle={styles.dropdownBox}
      />

      <Text style={styles.label}>Localisation</Text>
      <TextInput
        style={styles.input}
        placeholder="Entrez le lieu"
        value={location}
        onChangeText={setLocation}
      />

      <Text style={styles.label}>Ville</Text>
      <TextInput
        style={styles.input}
        placeholder="Entrez la ville"
        value={city}
        onChangeText={setCity}
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

      <TouchableOpacity style={styles.createButton} onPress={handleCreateEvent}>
        <Text style={styles.createButtonText}>Créer</Text>
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
  dateButton: {
    // additional styling if you want to differentiate date field
  },
  dateButtonText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#666',
  },
  createButton: {
    height: 50,
    backgroundColor: '#007AFF',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  createButtonText: {
    fontFamily: 'Inter-SemiBold',
    color: '#fff',
    fontSize: 16,
  },
});
