import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Dimensions, StatusBar, SafeAreaView } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { LinearGradient } from 'expo-linear-gradient';
import COLORS from '../constants/colors';

export default function HomeScreen({ navigation }) {
  const { loading } = useAuth();

  return (
    <>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <SafeAreaView style={styles.container}>
        <ImageBackground 
          source={require('../assets/background.jpg')}
          style={styles.backgroundImage}
          resizeMode="cover"
        >
          <LinearGradient
            colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.7)']}
            style={styles.gradient}
          >
            <View style={styles.contentContainer}>
              <View style={styles.headerContainer}>
                <Text style={styles.title}>FIRE</Text>
                <Text style={styles.subtitle}>Financial Independence, Retire Early</Text>
                <View style={styles.taglineContainer}>
                  <Text style={styles.tagline}>Take control of your financial future</Text>
                </View>
              </View>
              
              <View style={styles.buttonContainer}>
                <TouchableOpacity 
                  style={[styles.button, styles.loginButton, loading && styles.buttonDisabled]} 
                  onPress={() => navigation.navigate('Login')}
                  disabled={loading}
                >
                  <Text style={styles.buttonText}>
                    {loading ? 'Loading...' : 'Sign In'}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={[styles.button, styles.signupButton, loading && styles.buttonDisabled]} 
                  onPress={() => navigation.navigate('Signup')}
                  disabled={loading}
                >
                  <Text style={[styles.buttonText, styles.signupButtonText]}>
                    {loading ? 'Loading...' : 'Create Account'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </LinearGradient>
        </ImageBackground>
      </SafeAreaView>
    </>
  );
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  gradient: {
    flex: 1,
    justifyContent: 'space-between',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'space-between',
    paddingTop: height * 0.15,
    paddingBottom: height * 0.08,
    paddingHorizontal: width * 0.08,
  },
  headerContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 72,
    fontWeight: '800',
    color: COLORS.white,
    letterSpacing: 2,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 10,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.white,
    marginTop: 5,
    letterSpacing: 0.5,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 5,
  },
  taglineContainer: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: COLORS.primaryTransparent,
    borderRadius: 30,
    backdropFilter: 'blur(10px)',
  },
  tagline: {
    fontSize: 16,
    color: COLORS.white,
    textAlign: 'center',
    fontWeight: '500',
  },
  buttonContainer: {
    width: '100%',
    gap: 16,
  },
  button: {
    padding: 18,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  loginButton: {
    backgroundColor: COLORS.primary,
  },
  signupButton: {
    backgroundColor: COLORS.accentTransparent,
    borderWidth: 1.5,
    borderColor: COLORS.accent,
    backdropFilter: 'blur(10px)',
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  signupButtonText: {
    color: COLORS.white,
  },
  buttonDisabled: {
    backgroundColor: COLORS.disabled,
    borderColor: 'transparent',
  },
});