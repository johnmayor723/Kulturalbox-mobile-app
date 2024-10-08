import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';

const SignupScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = () => {
    navigation.navigate('Main'); // Navigate to Home on signup
  };

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image source={require('../assets/Logo1.png')} style={styles.logo} />

      {/* Welcome text */}
      <Text style={styles.welcomeText}>Join PantryHub</Text>

      {/* Name Input */}
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        placeholderTextColor="#999"
        value={name}
        onChangeText={setName}
      />

      {/* Email Input */}
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        placeholderTextColor="#999"
        value={email}
        onChangeText={setEmail}
      />

      {/* Password Input */}
      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        placeholderTextColor="#999"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {/* Signup Button */}
      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      {/* Navigate to Login */}
      <TouchableOpacity onPress={() => navigation.navigate('Auth')}>
        <Text style={styles.signupText}>Already have an account? Login here</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2D7B30',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 15,
    backgroundColor: '#F0F0F0',
    borderWidth: 1,
    borderColor: '#2D7B30',
    borderRadius: 25, // Rounded corners
    marginBottom: 20,
    color: '#2D7B30',
  },
  button: {
    backgroundColor: '#2D7B30',
    padding: 15,
    borderRadius: 25,
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  signupText: {
    color: '#2D7B30',
    fontSize: 16,
  },
});

export default SignupScreen;
