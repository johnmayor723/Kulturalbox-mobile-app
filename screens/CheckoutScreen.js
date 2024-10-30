import React, { useRef, useState } from 'react';
import { Paystack, paystackProps } from 'react-native-paystack-webview';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';

function CheckoutScreen({ route }) {
  const { totalAmount } = route.params; // Get amount from route
  const paystackWebViewRef = useRef<paystackProps.PayStackRef>();
  const [shippingAddress, setShippingAddress] = useState('');
  const [email, setEmail] = useState('');

  const handleCheckout = async () => {
    try {
      const response = await axios.post('https://pantry-hub-server.onrender.com/api/orders', {
        //status: 'processing',
        shippingAddress,
        email,
        amount: totalAmount,
      });
      console.log('Order created:', response.data);
      paystackWebViewRef.current.startTransaction(); // Initiate the transaction
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.heroSection}>
        <Text style={styles.headerText}>Checkout</Text>
        <Text style={styles.amountText}>Total: ₦{totalAmount}</Text>
      </View>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Enter Shipping Address"
          value={shippingAddress}
          onChangeText={setShippingAddress}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
      </View>

      <Paystack
        paystackKey="pk_test_bec2adfc8f46afff889349e2bf76e50477939d74"
        billingEmail={email}
        amount={totalAmount}
        onCancel={(e) => {
          console.log('Transaction cancelled', e);
        }}
        onSuccess={(res) => {
          console.log('Transaction successful', res);
        }}
        ref={paystackWebViewRef}
      />

      <TouchableOpacity style={styles.payButton} onPress={handleCheckout}>
        <Text style={styles.buttonText}>Pay Now</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 20,
  },
  heroSection: {
    backgroundColor: '#FFBF00', // Orange amber color
    padding: 20,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  amountText: {
    fontSize: 18,
    color: '#fff',
    marginTop: 5,
  },
  form: {
    marginTop: 20,
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  payButton: {
    backgroundColor: '#32CD32', // Green color
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default CheckoutScreen;
