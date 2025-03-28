import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';

const mockUserEvents = [
  {
    id: '1',
    sport: 'Futsal',
    location: 'City Sports Center',
    city: 'Paris',
    date: '2025-04-01T10:00:00',
    participants: 10,
  },
  {
    id: '2',
    sport: 'Tennis',
    location: 'Local Tennis Club',
    city: 'Lyon',
    date: '2025-04-03T15:30:00',
    participants: 4,
  },
  {
    id: '3',
    sport: 'Basketball',
    location: 'City Basketball Court',
    city: 'Marseille',
    date: '2025-04-10T18:45:00',
    participants: 8,
  },
];

export default function MyEventsScreen() {
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setEvents(mockUserEvents);
      setLoading(false);
    }, 1000);
  }, []);

  const handleEdit = (eventId) => {
    // TODO: Navigate to an edit screen for this event
    Alert.alert('Edit event', `Edit event with ID: ${eventId}`);
  };

  const handleDelete = (eventId) => {
    // TODO: Prompt confirmation, then delete from your backend
    Alert.alert('Delete event', `Delete event with ID: ${eventId}`);
  };

  const renderEventItem = ({ item }) => {
    const eventDate = new Date(item.date).toLocaleString('fr-FR', {
      dateStyle: 'short',
      timeStyle: 'short',
    });

    return (
      <View style={styles.eventCard}>
        <Text style={styles.eventTitle}>
          {item.sport} - {item.location} ({item.city})
        </Text>
        <Text style={styles.eventDate}>Date : {eventDate}</Text>
        <Text style={styles.eventParticipants}>
          Participants : {item.participants}
        </Text>

        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.editButton} onPress={() => handleEdit(item.id)}>
            <Text style={styles.editButtonText}>Modifier</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(item.id)}>
            <Text style={styles.deleteButtonText}>Supprimer</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        renderItem={renderEventItem}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    padding: 20,
  },
  eventCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  eventTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    marginBottom: 5,
  },
  eventDate: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#666',
    marginBottom: 2,
  },
  eventParticipants: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#666',
    marginBottom: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
  },
  editButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  editButtonText: {
    color: '#fff',
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
  },
  deleteButton: {
    backgroundColor: '#FF3B30',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  deleteButtonText: {
    color: '#fff',
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
  },
});
