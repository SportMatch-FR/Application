import { Stack } from 'expo-router';

export default function ProfileLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name='index' options={{ headerShown: true, headerTitle: 'Mon profil' }} />
      <Stack.Screen name='edit' options={{ headerShown: true, headerTitle: 'Edition du profil' }} />
    </Stack>
  );
}
