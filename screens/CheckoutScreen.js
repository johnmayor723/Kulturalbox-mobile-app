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
import { WebView } from 'react-native-webview';
import axios from 'axios';

const CheckoutScreen = ({ route }) => {
  const { totalAmount } = route.params;
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
    if (url.includes('https://pantry-hub-server.onrender.com')) {
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
      <View style={styles.heroSection}>
        <Text style={styles.title}>Payment</Text>
      </View>
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
          }}
          onNavigationStateChange={(webviewData) => handlePaymentCompletion(webviewData)}
          style={styles.webview}
        />
      ) : (
        <View style={styles.buttonContainer}>
          <Button
            title="Pay"
            onPress={handlePayPress}
            color="#4CAF50"
          />
        </View>
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
  heroSection: {
    backgroundColor: '#FF7E00', // Hero section with specified orange color
    padding: 20,
    borderRadius: 5, // Reduced border radius
    marginBottom: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5, // Reduced border radius for TextInput
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#e0e0e0',
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
  buttonContainer: {
    borderRadius: 5, // Reduced border radius for button container
    overflow: 'hidden',
    height: 50, // Same height as TextInputs
  },
});

export default CheckoutScreen;
