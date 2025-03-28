import { supabase } from '@/supabaseClient';
import { Alert } from 'react-native';

export async function fetchSports() {
  const { data, error } = await supabase.functions.invoke('getSports', {
    body: { name: 'Functions' },
  })

  if (error) {
    console.error('fetchSports error:', error);
    throw error;
  }
  return data;
}

export async function getCities() {
  const { data, error } = await supabase.functions.invoke('getCity', {
    body: { name: 'Functions' },
  })

  if (error) {
    console.error('getCities error:', error);
    throw error;
  }
  return data;
}

export async function getUserId() {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const user_id = session?.user?.id;
  if (!user_id) {
    console.error('UserId not found');
    return;
  }
  return user_id;
}

export async function createEvent(eventData: {
  location: string;
  date: string; // ISO string
  participants: number;
  sport: number;
  city: number;
  user_id: string; // UUID of the Supabase user
}) {
  console.log('createEvent data:', eventData);


  const { data, error } = await supabase.functions.invoke('createEvent', {
    body: eventData,
  });

  if (error) {
    console.error('createEvent error:', error);
    throw error;
  }
  return data;
}

export async function getUserEvents() {
  try {
    const user_id = await getUserId();
    console.log('user_id:', user_id);
    const { data, error } = await supabase.functions.invoke('myEvent', {
      body: { user_id },
    });

    if (error) {
      console.error('getUserEvents error:', error);
      throw error;
    }
    return data;
  } catch (err) {
    Alert.alert('Erreur', err.message);
    throw err;
  }
}
