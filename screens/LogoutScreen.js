// LogoutScreen.js
import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LogoutScreen = ({ navigation }) => {
    useEffect(() => {
        const logout = async () => {
            try {
                // Remove user data from AsyncStorage
                await AsyncStorage.removeItem('user');
                await AsyncStorage.removeItem('token');
                // Navigate back to the AuthStack
                navigation.navigate('Auth');  // Redirect to Auth screen
            } catch (error) {
                console.error('Error logging out:', error);
            }
        };
        logout();
    }, [navigation]);

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Logging out...</Text>
            <ActivityIndicator size="large" color="#FF7E00" />
        </View>
    );
};

export default LogoutScreen;
