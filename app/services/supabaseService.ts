import { supabase } from '@/supabaseClient';
import { Alert } from 'react-native';

export async function fetchSports() {
  const { data, error } = await supabase.functions.invoke('getSports', {
    body: { name: 'Functions' }
  });

  if (error) {
    console.error('fetchSports error:', error);
    throw error;
  }
  return data;
}

export async function getCities() {
  const { data, error } = await supabase.functions.invoke('getCity', {
    body: { name: 'Functions' }
  });

  if (error) {
    console.error('getCities error:', error);
    throw error;
  }
  return data;
}

export async function fetchUser() {
  const { data: { session }, error } = await supabase.auth.getSession();

  if (error) {
    console.error('fetchUsers error:', error);
    throw error;
  }

  if (!session) {
    console.error('User not logged in');
    return;
  }

  return session.user;
}

export async function getUserId() {
  const {
    data: { session }
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
    body: eventData
  });

  if (error) {
    console.error('createEvent error:', error);
    throw error;
  }
  return data;
}

export async function fetchEvents() {
  const { data, error } = await supabase.functions.invoke('getEvents', {
    body: { name: 'Functions' }
  });

  if (error) {
    console.error('fetchEvents error:', error);
    throw error;
  }

  return data;
}

export async function getUserEvents() {
  try {
    const user_id = await getUserId();
    const { data, error } = await supabase.functions.invoke('myEvent', {
      body: { user_id }
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

export async function deleteEvent(event_id: string) {
  const { data, error } = await supabase.functions.invoke('deleteEvent', {
    body: { event_id }
  });

  if (error) {
    console.error('deleteEvent error:', error);
    throw error;
  }
  return data;
}

export async function fetchEventDetails(event_id: string) {
  const { data, error } = await supabase.functions.invoke('getDetailsEvent', {
    body: { event_id }
  });

  if (error) {
    console.error('fetchEventDetails error:', error);
    throw error;
  }
  return data;
}

export async function updateEvent(eventData: {
  event_id: string;
  location: string;
  date: string; // ISO string
  participants: number;
  sport: number;
  city: number;
  user_id: string; // UUID of the Supabase user
}) {
  const { data, error } = await supabase.functions.invoke('updateEvent', {
    body: eventData
  });

  if (error) {
    console.error('updateEvent error:', error);
    throw error;
  }
  return data;
}

export async function updateUserCity(city_id: number) {
  const { data, error } = await supabase.auth.updateUser({
    data: { city_id: city_id }
  });

  if (error) {
    console.error('updateUserCity error:', error);
    throw error;
  }

  return data;
}

export async function getUserCity() {
  const { data: { session }, error } = await supabase.auth.getSession();
  const city_id = session?.user?.user_metadata?.city_id;
  if (!city_id || city_id === 0) {
    return 'Aucune';
  }

  const { data, error: error2 } = await supabase.functions.invoke('getCityDetails', {
    body: { city_id }
  });

  if (error2) {
    console.error('getUserCity error:', error2);
    throw error2;
  }

  return data.name;
}

