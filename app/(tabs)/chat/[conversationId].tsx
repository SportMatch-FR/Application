import React, { useState } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { conversationsData } from '@/app/data/data';

export default function ChatConversationScreen() {
  const { conversationId } = useLocalSearchParams();
  const conversation = conversationsData.find((c) => c.id === conversationId);

  const [messages, setMessages] = useState([
    {
      id: '1',
      text: 'Salut !',
      sender: 'other',
      senderName: 'Alice Martin',
      timestamp: '2025-03-27T12:30:00'
    },
    {
      id: '2',
      text: 'Salut, ça va ?',
      sender: 'self',
      senderName: 'Vous',
      timestamp: '2025-03-27T12:31:00'
    },
    {
      id: '3',
      text: 'Oui, et toi ?',
      sender: 'other',
      senderName: 'Alice Martin',
      timestamp: '2025-03-27T12:32:00'
    },
    {
      id: '4',
      text: 'Ça va bien, merci.',
      sender: 'self',
      senderName: 'Vous',
      timestamp: '2025-03-27T12:33:00'
    },
    {
      id: '5',
      text: 'Quoi de neuf ?',
      sender: 'other',
      senderName: 'Alice Martin',
      timestamp: '2025-03-27T12:34:00'
    },
    {
      id: '6',
      text: 'Pas grand-chose, et toi ?',
      sender: 'self',
      senderName: 'Vous',
      timestamp: '2025-03-27T12:35:00'
    },
    {
      id: '7',
      text: 'Je suis en route pour le match.',
      sender: 'other',
      senderName: 'Alice Martin',
      timestamp: '2025-03-27T12:36:00'
    },
    {
      id: '8',
      text: 'Super, bonne chance !',
      sender: 'self',
      senderName: 'Vous',
      timestamp: '2025-03-27T12:37:00'
    },
    {
      id: '9',
      text: 'Merci, à plus tard.',
      sender: 'other',
      senderName: 'Alice Martin',
      timestamp: '2025-03-27T12:38:00'
    },
    {
      id: '10',
      text: 'À bientôt.',
      sender: 'self',
      senderName: 'Vous',
      timestamp: '2025-03-27T12:39:00'
    },
    {
      id: '11',
      text: 'On se revoit pour un café ?',
      sender: 'other',
      senderName: 'Alice Martin',
      timestamp: '2025-03-27T12:40:00'
    },
    {
      id: '12',
      text: 'Avec plaisir !',
      sender: 'self',
      senderName: 'Vous',
      timestamp: '2025-03-27T12:41:00'
    },
    {
      id: '13',
      text: 'Parfait, à tout à l\'heure.',
      sender: 'other',
      senderName: 'Alice Martin',
      timestamp: '2025-03-27T12:42:00'
    }
  ]);

  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (!message.trim()) return;
    const newMessage = {
      id: Date.now().toString(),
      text: message,
      sender: 'self',
      senderName: 'You',
      timestamp: new Date().toISOString()
    };
    setMessages((prev) => [...prev, newMessage]);
    setMessage('');
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const isToday = date.toDateString() === now.toDateString();
    const dateLabel = isToday ? 'Aujourd\'hui' : date.toLocaleDateString('fr-FR');
    const timeLabel = date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    return `${dateLabel}, ${timeLabel}`;
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          {conversation?.sport} - {conversation?.location}
        </Text>
      </View>

      <View style={styles.participantsContainer}>
        <Text style={styles.participantsHeader}>Participants:</Text>
        <FlatList
          data={conversation?.participants}
          horizontal
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.participantBadge}>
              <Text style={styles.participantText}>{item}</Text>
            </View>
          )}
          showsHorizontalScrollIndicator={false}
        />
      </View>

      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const isSelf = item.sender === 'self';
          return (
            <View style={styles.messageContainer}>
              <Text style={[styles.messageInfo, isSelf && styles.messageInfoSelf]}>
                {item.senderName} - {formatTimestamp(item.timestamp)}
              </Text>
              <View
                style={[
                  styles.messageBubble,
                  isSelf ? styles.selfMessage : styles.otherMessage
                ]}>
                <Text style={isSelf ? styles.messageTextSelf : styles.messageTextOther}>
                  {item.text}
                </Text>
              </View>
            </View>
          );
        }}
        contentContainerStyle={styles.chatContent}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder='Votre message...'
          value={message}
          onChangeText={setMessage}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Text style={styles.sendButtonText}>Envoyer</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    height: 80,
    backgroundColor: '#007AFF',
    justifyContent: 'flex-end',
    padding: 20
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#fff'
  },
  participantsContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#eee'
  },
  participantsHeader: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    marginBottom: 5,
    color: '#007AFF'
  },
  participantBadge: {
    backgroundColor: '#e0f0ff',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 15,
    marginRight: 10
  },
  participantText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#007AFF'
  },
  chatContent: {
    padding: 20,
    flexGrow: 1
  },
  messageContainer: {
    marginBottom: 15
  },
  messageInfo: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#666',
    marginBottom: 3,
    alignSelf: 'flex-start'
  },
  messageInfoSelf: {
    alignSelf: 'flex-end'
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 10,
    borderRadius: 8
  },
  selfMessage: {
    backgroundColor: '#007AFF',
    alignSelf: 'flex-end',
    borderTopRightRadius: 0
  },
  otherMessage: {
    backgroundColor: '#f0f0f0',
    alignSelf: 'flex-start',
    borderTopLeftRadius: 0
  },
  messageTextSelf: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#fff'
  },
  messageTextOther: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#000'
  },
  inputContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center'
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    paddingHorizontal: 15,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    backgroundColor: '#fff'
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: '#007AFF',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  sendButtonText: {
    fontFamily: 'Inter-SemiBold',
    color: '#fff',
    fontSize: 16
  }
});
