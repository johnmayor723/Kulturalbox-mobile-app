// PaymentScreen.js

import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const PaymentScreen = ({ navigation }) => {
  const handleConfirmPayment = () => {
    alert('Payment Successful!');  // Placeholder action for now
  };

  return (
    <View style={styles.container}>
      {/* Hero Section */}
      <View style={styles.hero}>
        <Text style={styles.heroText}>Payment</Text>
      </View>

      {/* Payment Section */}
      <View style={styles.paymentContainer}>
        <Text style={styles.paymentText}>Confirm your payment details below:</Text>
        {/* Add actual payment form here */}
        <Button
          title="Confirm Payment"
          onPress={handleConfirmPayment}
          color="#Ff7e00" // Amber-orange button color
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  hero: {
    height: 150,
    backgroundColor: '#Ff7e00',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  paymentContainer: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  paymentText: {
    fontSize: 18,
    marginBottom: 20,
    color: '#2D7B30',
  },
});

export default PaymentScreen;
