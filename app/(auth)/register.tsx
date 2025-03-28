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
import { Divide, Eye, EyeOff, UserPlus } from 'lucide-react-native';
import { supabase } from '@/supabaseClient';
import { registerSchema } from '@/app/validations/validation';

export default function RegisterScreen() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async () => {
    const validationResult = registerSchema.safeParse({
      firstName,
      lastName,
      email,
      password,
      confirmPassword
    });
    if (!validationResult.success) {
      const errorMessages = validationResult.error.errors.map(err => err.message).join('\n');
      Alert.alert('Erreur de validation', errorMessages);
      return;
    }

    setIsLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { first_name: firstName, last_name: lastName, role: 'default' }
      }
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
        <UserPlus size={48} color='#000' />
        <Text style={styles.title}>Créer un compte</Text>
        <Text style={styles.subtitle}>Rejoignez la communauté SportMatch</Text>
      </View>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder='Prénom'
          value={firstName}
          onChangeText={setFirstName}
        />
        <TextInput
          style={styles.input}
          placeholder='Nom de famille'
          value={lastName}
          onChangeText={setLastName}
        />
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
        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, { flex: 1, borderWidth: 0, paddingHorizontal: 0 }]}
            placeholder='Confirmer le mot de passe'
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!showConfirmPassword}
          />
          <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)} style={styles.eyeButton}>
            {showConfirmPassword ? (
              <EyeOff size={20} color='#666' />
            ) : (
              <Eye size={20} color='#666' />
            )}
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleRegister} disabled={isLoading}>
          {isLoading ? (
            <ActivityIndicator color='#fff' />
          ) : (
            <Text style={styles.buttonText}>S'inscrire</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity style={styles.linkButton} onPress={() => router.back()}>
          <Text style={styles.linkText}>Déjà un compte ? Se connecter</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  content: {
    padding: 20
  },
  header: {
    alignItems: 'center',
    marginTop: 80,
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
