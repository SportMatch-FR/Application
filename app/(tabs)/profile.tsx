import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['rgba(0,0,0,0.6)', 'transparent']}
        style={styles.header}>
        <Text style={styles.headerTitle}>Mon Profil</Text>
      </LinearGradient>

      <View style={styles.profileContainer}>
        <Image
          source={{ uri: 'https://cdn.gaetandev.fr/gaetan/files/Gaetan2.png' }}
          style={styles.profileImage}
        />
        <Text style={styles.name}>Jean Dupont</Text>
        <Text style={styles.email}>jean.dupont@example.com</Text>
        <Text style={styles.info}>Sports favoris : Football, Tennis</Text>

        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Modifier le profil</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  header: {
    height: 120,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  headerTitle: {
    fontSize: 34,
    fontFamily: 'Inter-Bold',
    color: '#fff'
  },
  profileContainer: {
    alignItems: 'center',
    marginTop: 20,
    paddingHorizontal: 20
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#007AFF',
    backgroundColor: '#f5f5f5'
  },
  name: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    marginTop: 10
  },
  email: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#666',
    marginTop: 5
  },
  info: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    marginTop: 10
  },
  editButton: {
    marginTop: 20,
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8
  },
  editButtonText: {
    fontFamily: 'Inter-SemiBold',
    color: '#fff',
    fontSize: 16
  }
});
