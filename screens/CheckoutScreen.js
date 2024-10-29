// CheckoutScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import { WebView, Paystack } from 'react-native-webview';
import axios from 'axios';

const CheckoutScreen = ({ route }) => {
  const { totalAmount } = route.params; // Retrieve totalAmount from route
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [showWebView, setShowWebView] = useState(false);

  const handleOrderCreation = async (reference) => {
    try {
      const orderData = { name, email, address, paymentReference: reference };
      const response = await axios.post('https://pantry-hub-server.onrender.com/api/orders', orderData);
      Alert.alert('Order Created', `Order ID: ${response.data.id}`);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to create order.');
    }
  };

  const handlePaymentCompletion = (webviewData) => {
    const url = webviewData.url;
    if (url.includes('https://pantry-hub-server.onrender.com')) { // Replace with your Paystack redirect URL
      const reference = new URL(url).searchParams.get('reference');
      if (reference) {
        setShowWebView(false);
        handleOrderCreation(reference);
      }
    }
  };

  const handlePayPress = () => {
    if (!name || !email || !address) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }
    setShowWebView(true);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Payment</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Shipping Address"
        value={address}
        onChangeText={setAddress}
      />
      <Text style={styles.amountText}>Amount: ₦{totalAmount}</Text> 
      {showWebView ? (
        <WebView
          source={{
            uri: `https://paystack.com/pay?key=pk_live_5db63dff5f376c290ffe1f9dcb5c6021bb668ffb&amount=${totalAmount * 100}&email=${email}`,
          }} // Replace with your Paystack URL
          onNavigationStateChange={(webviewData) => handlePaymentCompletion(webviewData)} // Pass webviewData to handlePaymentCompletion
          style={styles.webview}
        />
      ) : (
      
        <Button
          title="Pay"
          onPress={handlePayPress}
        />
   )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
  amountText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
  },
  webview: {
    marginVertical: 20,
    height: 400,
  },
});

export default CheckoutScreen;
