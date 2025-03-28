import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Swiper from 'react-native-deck-swiper';
import { Ionicons } from '@expo/vector-icons';
import { fetchEvents } from '@/app/services/supabaseService';

export default function DiscoverScreen() {
  const [events, setEvents] = useState<any[]>([]);
  const [likedEvents, setLikedEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [noMoreEvents, setNoMoreEvents] = useState(false);
  const swiperRef = useRef<any>(null);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const data = await fetchEvents();
        setEvents(data);
      } catch (error: any) {
        Alert.alert('Erreur', 'Impossible de charger les événements.');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    loadEvents();
  }, []);

  const onSwipedLeft = (cardIndex: number) => {
    console.log('Skipped card index:', cardIndex);
  };

  const onSwipedRight = (cardIndex: number) => {
    console.log('Liked card index:', cardIndex);
    setLikedEvents((prev) => [...prev, events[cardIndex]]);
  };

  const onSwipedAll = () => {
    console.log('All cards swiped');
    setNoMoreEvents(true);
  };

  const renderCard = (card: any) => {
    return (
      <View style={styles.card}>
        <Text style={styles.cardTitle}>
          {card.sport} - {card.location}
        </Text>
        <Text style={styles.cardSubtitle}>{card.city}</Text>
        <Text style={styles.cardDate}>
          Date : {new Date(card.date).toLocaleDateString('fr-FR')}
        </Text>
        <Text style={styles.cardParticipants}>
          Participants : {card.participants}
        </Text>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.loaderContainer]}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  // If we haven't found any events initially
  if (events.length === 0 && !noMoreEvents) {
    return (
      <View style={[styles.container, styles.loaderContainer]}>
        <Text style={styles.message}>Aucun événement trouvé</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['rgba(0,0,0,0.6)', 'transparent']}
        style={styles.header}
      >
        <Text style={styles.title}>Découvrir</Text>
      </LinearGradient>

      {/* If noMoreEvents is true, show a message instead of the swiper */}
      {noMoreEvents ? (
        <View style={styles.noMoreContainer}>
          <Text style={styles.noMoreText}>Plus d'événements pour le moment</Text>
        </View>
      ) : (
        <>
          <View style={styles.swiperContainer}>
            <Swiper
              ref={swiperRef}
              cards={events}
              renderCard={renderCard}
              onSwipedLeft={onSwipedLeft}
              onSwipedRight={onSwipedRight}
              onSwipedAll={onSwipedAll}
              cardIndex={0}
              backgroundColor="#f5f5f5"
              stackSize={3}
              verticalSwipe={false}
            />
          </View>

          {/* Only render the button row if there are still cards to swipe */}
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[styles.iconButton, styles.dislikeButton]}
              onPress={() => swiperRef.current?.swipeLeft()}
            >
              <Ionicons name="close" size={32} color="#fff" />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.iconButton, styles.likeButton]}
              onPress={() => swiperRef.current?.swipeRight()}
            >
              <Ionicons name="heart" size={32} color="#fff" />
            </TouchableOpacity>
          </View>
        </>
      )}
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
  header: {
    height: 120,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  title: {
    fontSize: 34,
    fontFamily: 'Inter-Bold',
    color: '#fff',
  },
  message: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#666',
  },
  swiperContainer: {
    flex: 1,
    padding: 20,
  },
  card: {
    flex: 0.75,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  cardTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    marginBottom: 10,
  },
  cardSubtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    marginBottom: 10,
  },
  cardDate: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    marginBottom: 5,
  },
  cardParticipants: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  buttonRow: {
    position: 'absolute',
    bottom: 40,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    zIndex: 9999,
  },
  iconButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#999',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dislikeButton: {
    backgroundColor: '#FF3B30',
  },
  likeButton: {
    backgroundColor: '#007AFF',
  },
  noMoreContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noMoreText: {
    fontSize: 18,
    fontFamily: 'Inter-Regular',
    color: '#666',
  },
});
