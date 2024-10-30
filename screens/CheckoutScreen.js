import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { WebView } from 'react-native-webview';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

export default function CheckoutScreen() {
  const [email, setEmail] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [paymentUrl, setPaymentUrl] = useState(null);
  const [showWebView, setShowWebView] = useState(false);
  const [transactionReference, setTransactionReference] = useState(null);

  const navigation = useNavigation();

  const initializeTransaction = async () => {
    // Validate input fields
    if (!email || !totalAmount || !shippingAddress) {
      Alert.alert('Error', 'Please fill in all the fields.');
      return;
    }

    try {
      const response = await axios.post(
        'https://api.paystack.co/transaction/initialize',
        {
          email,
          amount: totalAmount * 100, // Paystack expects amount in kobo
          callback_url: 'https://yourcallback.com',
          metadata: { cancel_action: 'https://your-cancel-url.com' }
        },
        {
          headers: {
            Authorization: 'sk_test_caf30f565f30779a789cfed46899dad43224e36b',
            'Content-Type': 'application/json'
          }
        }
      );

      const { authorization_url, reference } = response.data.data;
      setPaymentUrl(authorization_url);
      setTransactionReference(reference); // Store the transaction reference
      setShowWebView(true);
    } catch (error) {
      Alert.alert('Error', 'Failed to initialize transaction');
      console.error(error);
    }
  };

  const handleNavigationStateChange = (state) => {
    const { url } = state;

    if (url.includes('https://yourcallback.com')) {
      // Extract transaction reference from URL and verify the transaction
      const reference = new URL(url).searchParams.get('reference');
      verifyTransaction(reference); // Call verification function
    } else if (url.includes('https://your-cancel-url.com')) {
      // Handle payment cancellation
      setShowWebView(false);
      Alert.alert('Payment Cancelled', 'You cancelled the payment.');
    }
  };

  const verifyTransaction = async (reference) => {
    try {
      const response = await axios.get(`https://api.paystack.co/transaction/verify/${reference}`, {
        headers: { Authorization: 'Bearer YOUR_SECRET_KEY' },
      });

      const { status } = response.data.data;
      if (status === 'success') {
        // Payment successful, now create the order
        await createOrder();
      } else {
        Alert.alert('Payment Failed', 'Transaction could not be verified.');
      }
    } catch (error) {
      Alert.alert('Verification Error', 'Failed to verify transaction');
      console.error(error);
    }
  };

  const createOrder = async () => {
    try {
      const orderResponse = await axios.post(
        'https://pantry-hub-server.onrender.com/api/orders',
        {
          email,
          totalAmount,
          shippingAddress,
        }
      );

      if (orderResponse.status === 200) {
        setShowWebView(false);
        Alert.alert('Order Created', 'Thank you for your payment and your order is confirmed!');
        navigation.replace('Home'); // Navigate to Home after order creation
      } else {
        Alert.alert('Error', 'Failed to create the order.');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to create the order.');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      {showWebView && paymentUrl ? (
        <WebView
          source={{ uri: paymentUrl }}
          onNavigationStateChange={handleNavigationStateChange}
        />
      ) : (
        <>
          <View style={styles.heroSection}>
            <Text style={styles.heroText}>Complete Your Payment</Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            placeholder="Total Amount"
            value={totalAmount}
            onChangeText={setTotalAmount}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Shipping Address"
            value={shippingAddress}
            onChangeText={setShippingAddress}
          />
          <Button title="Proceed to Pay" onPress={initializeTransaction} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  heroSection: {
    backgroundColor: 'orange',
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  heroText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginVertical: 10,
  },
});
