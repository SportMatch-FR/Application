import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

export default function EventScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['rgba(0,0,0,0.6)', 'transparent']}
        style={styles.header}>
        <Text style={styles.title}>Evénements</Text>
      </LinearGradient>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={() => router.push('/events/create')}>
          <Text style={styles.buttonText}>Créer un événement</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => router.push('/events/myevents')}>
          <Text style={styles.buttonText}>Mes événements</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={styles.message}>Chargement des événements...</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  header: {
    height: 120,
    justifyContent: 'flex-end',
    padding: 20
  },
  title: {
    fontSize: 34,
    fontFamily: 'Inter-Bold',
    color: '#fff'
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: 15,
    paddingHorizontal: 20
  },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15
  },
  buttonText: {
    fontFamily: 'Inter-SemiBold',
    color: '#fff',
    fontSize: 16
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  message: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#666'
  }
});
