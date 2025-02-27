import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, ImageBackground, Alert, ActivityIndicator } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';

export default function SignupScreen() {
  const { signup } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const hasMinLength = password.length >= 8;
    const hasNumber = /\d/.test(password);
    const hasLetter = /[a-zA-Z]/.test(password);
    
    return {
      isValid: hasMinLength && hasNumber && hasLetter,
      errors: [
        !hasMinLength && 'Password must be at least 8 characters long',
        !hasNumber && 'Password must contain at least one number',
        !hasLetter && 'Password must contain at least one letter'
      ].filter(Boolean)
    };
  };

  const handleSignup = async () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address');
      return;
    }

    const { isValid, errors } = validatePassword(password);
    if (!isValid) {
      Alert.alert('Invalid Password', errors.join('\n'));
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    setIsLoading(true);
    try {
      const result = await signup(email, password);
      Alert.alert(
        'Success!',
        result.message,
        [
          {
            text: 'OK',
            onPress: () => navigation.replace('Login')
          }
        ],
        { cancelable: false }
      );
    } catch (error) {
      Alert.alert(
        'Signup Failed', 
        error.message || 'Failed to create account. Please try again.'
      );
      console.error('Signup error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const navigateToLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <ImageBackground 
      source={require('../assets/background.jpg')}
      style={styles.backgroundImage}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Create Account</Text>
          
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
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              placeholderTextColor="#rgba(255, 255, 255, 0.7)"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              editable={!isLoading}
            />
            
            <TouchableOpacity 
              style={[styles.signupButton, isLoading && styles.disabledButton]}
              onPress={handleSignup}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Sign Up</Text>
              )}
            </TouchableOpacity>

            <View style={styles.loginContainer}>
              <Text style={styles.loginText}>Already have an account?</Text>
              <TouchableOpacity onPress={navigateToLogin}>
                <Text style={styles.loginLink}>Login</Text>
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
    color: '#FFFFFF',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  signupButton: {
    backgroundColor: '#007AFF',
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
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  loginText: {
    color: '#FFFFFF',
    fontSize: 14,
    marginRight: 5,
  },
  loginLink: {
    color: '#007AFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
});