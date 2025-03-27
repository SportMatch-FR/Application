import { Stack } from 'expo-router';

export default function ChatLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name='index' options={{ headerShown: true, headerTitle: 'Conversations' }} />
      <Stack.Screen name='[conversationId]' options={{ headerShown: true, headerTitle: 'Discussion' }} />
    </Stack>
  );
}
