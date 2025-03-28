import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Link } from 'expo-router';
import { conversationsData } from '@/app/data/data';

export default function ChatListScreen() {
  const renderConversation = ({ item }) => (
    <Link href={`/chat/${item.id}`} asChild>
      <TouchableOpacity style={styles.item}>
        <Text style={styles.title}>
          {item.sport} - {item.location}
        </Text>
        <Text style={styles.participants}>
          Participants: {item.participants.join(', ')}
        </Text>
      </TouchableOpacity>
    </Link>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={conversationsData}
        keyExtractor={(item) => item.id}
        renderItem={renderConversation}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20
  },
  item: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: '#eee'
  },
  title: {
    fontSize: 18,
    fontFamily: 'Inter-Bold'
  },
  participants: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#666',
    marginTop: 5
  }
});
