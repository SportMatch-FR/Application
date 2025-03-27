import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Link } from 'expo-router';

export default function ChatListScreen() {
  const conversations = [
    { id: '1', name: 'Jean Dupont' },
    { id: '2', name: 'Marie Curie' }
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Conversations</Text>
      <FlatList
        data={conversations}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Link href={`/chat/${item.id}`} asChild>
            <TouchableOpacity style={styles.item}>
              <Text style={styles.name}>{item.name}</Text>
            </TouchableOpacity>
          </Link>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  header: { fontSize: 24, fontFamily: 'Inter-Bold', marginBottom: 20 },
  item: { paddingVertical: 15, borderBottomWidth: 1, borderColor: '#eee' },
  name: { fontSize: 18, fontFamily: 'Inter-Regular' }
});
