// screens/SignUpScreen.js

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';

const SignUpScreen = ({ navigation }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignUp = () => {
        // Add your sign-up logic here
    };

    return (
        <View style={styles.container}>
            <Image
                source={require('../assets/Logo1.jpg')} // Add your logo image here
                style={styles.logo}
            />
            <Text style={styles.welcomeText}>Join PantryHub</Text>

            <View style={styles.form}>
                <TextInput
                    style={styles.input}
                    placeholder="Name"
                    placeholderTextColor="#fff"
                    value={name}
                    onChangeText={setName}
                    autoCapitalize="words"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="#fff"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor="#fff"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    autoCapitalize="none"
                />
                <TouchableOpacity style={styles.signupButton} onPress={handleSignUp}>
                    <Text style={styles.signupButtonText}>Sign Up</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={styles.loginText}>Already have an account? Login</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white', // white background
    },
    logo: {
        width: 120,
        height: 120,
        marginBottom: 20,
    },
    welcomeText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2D7B30', // green text
        marginBottom: 30,
    },
    form: {
        width: '80%',
    },
    input: {
        backgroundColor: '#4682B4', // Light blue input background
        color: '#fff',
        padding: 10,
        borderRadius: 8,
        marginBottom: 15,
        fontSize: 16,
    },
    signupButton: {
        backgroundColor: "#2D7B30", // green button
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    signupButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    loginText: {
        color: '#fff',
        marginTop: 20,
        fontSize: 16,
    },
});

export default SignUpScreen;
