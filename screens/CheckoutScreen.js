// PaymentScreen.js
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
import { PaystackWebView } from 'react-native-paystack-webview';
import axios from 'axios';

const CheckoutScreen = ({ route }) => {
  const { totalAmount } = route.params; // Retrieve totalAmount from route
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');

  const handlePayment = async (data) => {
    try {
      // Create order in your backend
      const orderData = {
        name,
        email,
        address,
        paymentReference: data.reference,
      };

      const response = await axios.post('https://pantry-hub-server.onrender.com/api/orders', orderData);
      Alert.alert('Order Created', `Order ID: ${response.data.id}`);
      // Handle successful order creation
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to create order.');
    }
  };

  const handlePaystackSuccess = (data) => {
    handlePayment(data);
  };

  const handlePaystackClose = () => {
    Alert.alert('Payment', 'Payment was closed without completion.');
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
      <Text style={styles.amountText}>Amount: ₦{totalAmount}</Text> {/* Display total amount */}
      <PaystackWebView
        style={styles.paystack}
        paystackKey="your-paystack-public-key" // Replace with your Paystack public key
        amount={totalAmount * 100} // Paystack accepts amount in kobo
        billingEmail={email}
        onSuccess={handlePaystackSuccess}
        onCancel={handlePaystackClose}
      />
      <Button
        title="Pay"
        onPress={() => {
          if (!name || !email || !address) {
            Alert.alert('Error', 'Please fill in all fields.');
            return;
          }
          Alert.alert('Redirecting to Paystack...', 'Please wait...');
        }}
      />
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
  paystack: {
    marginVertical: 20,
    height: 300,
  },
  amountText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
  },
});

export default CheckoutScreen;
