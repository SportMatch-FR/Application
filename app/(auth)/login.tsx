import { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { Link, useRouter } from 'expo-router';
import { Eye, EyeOff, LogIn } from 'lucide-react-native';
import { supabase } from '@/supabaseClient';
import { loginSchema } from '@/app/validations/validation';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    const validationResult = loginSchema.safeParse({ email, password });
    if (!validationResult.success) {
      const errors = validationResult.error.errors.map(err => err.message).join('\n');
      Alert.alert('Erreur de validation', errors);
      return;
    }

    setIsLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    setIsLoading(false);
    if (error) {
      Alert.alert('Erreur', error.message);
    } else {
      router.replace('/');
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <LogIn size={48} color='#000' />
        <Text style={styles.title}>SportMatch</Text>
        <Text style={styles.subtitle}>Trouvez vos partenaires sportifs</Text>
      </View>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder='Email'
          value={email}
          onChangeText={setEmail}
          autoCapitalize='none'
          keyboardType='email-address'
        />
        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, { flex: 1, borderWidth: 0, paddingHorizontal: 0 }]}
            placeholder='Mot de passe'
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeButton}>
            {showPassword ? (
              <EyeOff size={20} color='#666' />
            ) : (
              <Eye size={20} color='#666' />
            )}
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={isLoading}>
          {isLoading ? (
            <ActivityIndicator color='#fff' />
          ) : (
            <Text style={styles.buttonText}>Se connecter</Text>
          )}
        </TouchableOpacity>

        <Link href='/register' asChild>
          <TouchableOpacity style={styles.linkButton}>
            <Text style={styles.linkText}>Créer un compte</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20
  },
  content: {
    padding: 20
  },
  header: {
    alignItems: 'center',
    marginTop: 100,
    marginBottom: 50
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 32,
    marginTop: 20
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#666',
    marginTop: 10
  },
  form: {
    gap: 15
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    fontFamily: 'Inter-Regular'
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    height: 50
  },
  eyeButton: {
    marginLeft: 10
  },
  button: {
    height: 50,
    backgroundColor: '#007AFF',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Inter-SemiBold'
  },
  linkButton: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  linkText: {
    color: '#007AFF',
    fontSize: 16,
    fontFamily: 'Inter-Regular'
  }
});
