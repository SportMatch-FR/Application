import type { Session } from '@supabase/supabase-js';
import { useRouter, Slot, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { useEffect, useRef, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { supabase } from '@/supabaseClient';

export default function RootLayout() {
  useFrameworkReady();

  const router = useRouter();
  const segments = useSegments();
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const hasRedirected = useRef(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const redirectToAuth = () => {
    if (!hasRedirected.current) {
      hasRedirected.current = true;
      if (isMounted) {
        router.replace('/(auth)/login');
      } else {
        setTimeout(() => {
          router.replace('/(auth)/login');
        }, 50);
      }
    }
  };

  useEffect(() => {
    const fetchSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);
      setLoading(false);
      if (!session && !segments.includes('(auth)')) {
        redirectToAuth();
      }
    };

    fetchSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      if (!session && !segments.includes('(auth)')) {
        redirectToAuth();
      }
    });

    return () => subscription?.unsubscribe();
  }, [router, segments, isMounted]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <>
      <StatusBar style="auto" />
      <Slot />
    </>
  );
}
