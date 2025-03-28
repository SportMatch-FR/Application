import { supabase } from '@/supabaseClient';

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
