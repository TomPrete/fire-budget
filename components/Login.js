import React, { useState } from 'react';
import { 
  View, 
  TextInput, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ImageBackground,
  Alert,
  ActivityIndicator 
} from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';

export default function LoginScreen() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address');
      return;
    }

    if (password.length < 8) {
      Alert.alert('Invalid Password', 'Password must be at least 8 characters long');
      return;
    }
    
    setIsLoading(true);
    try {
      await login(email, password);
      navigation.replace('MainApp');
    } catch (error) {
      Alert.alert(
        'Login Failed', 
        error.message || 'Invalid email or password. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const navigateToSignup = () => {
    navigation.navigate('Signup');
  };

  return (
    <ImageBackground 
      source={require('../assets/background.jpg')}
      style={styles.backgroundImage}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Welcome Back</Text>
          
          <View style={styles.formContainer}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#rgba(255, 255, 255, 0.7)"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              editable={!isLoading}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#rgba(255, 255, 255, 0.7)"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              editable={!isLoading}
            />
            
            <TouchableOpacity 
              style={[styles.loginButton, isLoading && styles.disabledButton]}
              onPress={handleLogin}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Login</Text>
              )}
            </TouchableOpacity>

            <View style={styles.signupContainer}>
              <Text style={styles.signupText}>Don't have an account?</Text>
              <TouchableOpacity onPress={navigateToSignup}>
                <Text style={styles.signupLink}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 40,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  formContainer: {
    width: '100%',
    paddingHorizontal: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 15,
    marginBottom: 15,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#000000',
    backgroundColor: 'rgba(255, 255, 255, 0.58)',
  },
  loginButton: {
    backgroundColor: 'rgba(231, 19, 19, 0.78)',
    padding: 18,
    borderRadius: 15,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  disabledButton: {
    opacity: 0.7,
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  signupText: {
    color: '#FFFFFF',
    fontSize: 14,
    marginRight: 5,
  },
  signupLink: {
    color: '#007AFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
});