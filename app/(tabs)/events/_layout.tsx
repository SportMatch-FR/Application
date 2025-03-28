import { Stack } from 'expo-router';

export default function EventsLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name='index' options={{ headerShown: false, headerTitle: 'Liste des events' }} />
      <Stack.Screen name='create' options={{ headerShown: true, headerTitle: 'Création d\'un événement' }} />
      <Stack.Screen name='myevents' options={{ headerShown: true, headerTitle: 'Mes événements' }} />
      <Stack.Screen name='[eventId]' options={{ headerShown: true, headerTitle: 'Modification de l\'evénement' }} />
    </Stack>
  );
}
