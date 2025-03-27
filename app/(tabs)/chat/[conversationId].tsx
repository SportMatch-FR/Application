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
import { useSearchParams } from 'expo-router/build/hooks';

export default function ChatConversationScreen() {
  const { conversationId } = useSearchParams();

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { id: '1', text: 'Salut !', sender: 'other' },
    { id: '2', text: 'Comment ça va ?', sender: 'self' }
  ]);

  const handleSend = () => {
    if (!message.trim()) return;
    setMessages((prev) => [
      ...prev,
      { id: Date.now().toString(), text: message, sender: 'self' }
    ]);
    setMessage('');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Conversation {conversationId}</Text>
      </View>

      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const isSelf = item.sender === 'self';
          return (
            <View
              style={[
                styles.messageBubble,
                isSelf ? styles.selfMessage : styles.otherMessage
              ]}>
              <Text style={isSelf ? styles.messageTextSelf : styles.messageTextOther}>
                {item.text}
              </Text>
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
  chatContent: {
    padding: 20,
    flexGrow: 1
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10
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
