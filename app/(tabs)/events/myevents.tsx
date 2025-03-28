import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { getUserId, getUserEvents, deleteEvent } from '@/app/services/supabaseService';
import { useRouter } from 'expo-router';

export default function MyEventsScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const userId = await getUserId();
        if (!userId) {
          Alert.alert('Erreur', 'Utilisateur non authentifié.');
          setLoading(false);
          return;
        }
        const data = await getUserEvents();
        setEvents(data);
      } catch (error) {
        Alert.alert('Erreur', 'Impossible de charger vos événements.');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, []);

  const handleDeleteEvent = (event_id: string) => {
    Alert.alert(
      "Confirmation",
      "Voulez-vous vraiment supprimer cet événement ?",
      [
        { text: "Annuler", style: "cancel" },
        {
          text: "Supprimer",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteEvent(event_id);
              setEvents(events.filter((e) => e.id.toString() !== event_id));
              Alert.alert("Succès", "Événement supprimé !");
            } catch (error: any) {
              Alert.alert("Erreur", error.message);
            }
          }
        }
      ]
    );
  };

  const renderEventItem = ({ item }: { item: any }) => {
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
        <Text style={styles.eventParticipants}>Participants : {item.participants}</Text>

        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => router.push(`/events/${item.id}`)}
          >
            <Text style={styles.editButtonText}>Modifier</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => handleDeleteEvent(item.id.toString())}
          >
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
        keyExtractor={(item) => item.id.toString()}
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
