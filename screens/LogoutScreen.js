import React, { useEffect, useContext } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { AuthContext } from '../contexts/AuthContext'; // Import the AuthContext

const LogoutScreen = () => {
    const { logout } = useContext(AuthContext); // Access the logout function from context

    useEffect(() => {
        logout(); // Trigger the logout process when the screen loads
    }, []);

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Logging out...</Text>
            <ActivityIndicator size="large" color="#FF7E00" />
        </View>
    );
};

export default LogoutScreen;
