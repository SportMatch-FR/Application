import { Tabs } from 'expo-router';
import { Calendar, Home, MessageSquare, User } from 'lucide-react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopColor: '#eee'
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#999'
      }}
    >
      <Tabs.Screen
        name='index'
        options={{
          title: 'Découvrir',
          tabBarIcon: ({ color, size }) => <Home size={size} color={color} />
        }}
      />
      <Tabs.Screen
        name='events'
        options={{
          title: 'Événements',
          tabBarIcon: ({ color, size }) => <Calendar size={size} color={color} />
        }}
      />
      <Tabs.Screen
        name='chat'
        options={{
          title: 'Messages',
          tabBarIcon: ({ color, size }) => <MessageSquare size={size} color={color} />
        }}
      />
      <Tabs.Screen
        name='profile'
        options={{
          title: 'Profil',
          tabBarIcon: ({ color, size }) => <User size={size} color={color} />
        }}
      />
    </Tabs>
  );
}
