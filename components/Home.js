import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Dimensions } from 'react-native';
import { useAuth } from '../contexts/AuthContext';

export default function HomeScreen({ navigation }) {
  const { loading } = useAuth();

  return (
    <ImageBackground 
      source={require('../assets/background.jpg')} // You'll need to add this image
      style={styles.backgroundImage}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <Text style={styles.title}>FIRE Budget</Text>
            <Text style={styles.subtitle}>Plan Your Financial Freedom</Text>
          </View>
          
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={[styles.button, styles.loginButton, loading && styles.buttonDisabled]} 
              onPress={() => navigation.navigate('Login')}
              disabled={loading}
            >
              <Text style={styles.buttonText}>
                {loading ? 'Loading...' : 'Login'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.button, styles.signupButton, loading && styles.buttonDisabled]} 
              onPress={() => navigation.navigate('Signup')}
              disabled={loading}
            >
              <Text style={[styles.buttonText, styles.signupButtonText]}>
                {loading ? 'Loading...' : 'Sign Up'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

const { width } = Dimensions.get('window');

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
        justifyContent: 'space-between',
        paddingVertical: 60,
        paddingHorizontal: 20,
    },
    headerContainer: {
        alignItems: 'center',
        // marginTop: 40,
    },
    title: {
        fontSize: 42,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 10,
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10,
    },
    subtitle: {
        fontSize: 18,
        color: '#FFFFFF',
        opacity: 0.9,
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10,
    },
    buttonContainer: {
        width: '100%',
        paddingHorizontal: 20,
        marginBottom: 0,
    },
    button: {
        padding: 18,
        borderRadius: 15,
        width: '100%',
        alignItems: 'center',
        marginVertical: 8,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    loginButton: {
        backgroundColor: 'rgba(231, 19, 19, 0.78)',
    },
    signupButton: {
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: '#FFFFFF',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '600',
    },
    signupButtonText: {
        color: '#FFFFFF',
    },
    buttonDisabled: {
        backgroundColor: 'rgba(204, 204, 204, 0.6)',
        borderColor: 'transparent',
    },
});