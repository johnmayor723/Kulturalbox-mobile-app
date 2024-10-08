import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';

const PaymentScreen = () => {
  const [shippingInfo, setShippingInfo] = useState({
    fullName: '',
    address: '',
    city: '',
    postalCode: ''
  });
  
  const [cardInfo, setCardInfo] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });

  const handleShippingChange = (field, value) => {
    setShippingInfo(prevState => ({
      ...prevState,
      [field]: value
    }));
  };

  const handleCardChange = (field, value) => {
    setCardInfo(prevState => ({
      ...prevState,
      [field]: value
    }));
  };

  const handlePayment = () => {
    console.log('Processing payment with card details:', cardInfo);
    console.log('Shipping Info:', shippingInfo);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Hero Section */}
      <View style={styles.heroSection}>
        <Text style={styles.heroText}>Payment</Text>
      </View>
      
      {/* Bank Payment Information */}
      <View style={styles.bankDetailsSection}>
        <Text style={styles.sectionTitle}>Bank Payment Details</Text>
        <Text>Bank Name: ABC Bank</Text>
        <Text>Account Number: 123456789</Text>
        <Text>Account Name: FoodDeck Store</Text>
        <Text>Bank Code: 123456</Text>
      </View>

      {/* Card Payment Form */}
      <View style={styles.cardPaymentSection}>
        <Text style={styles.sectionTitle}>Card Payment</Text>
        <TextInput
          style={styles.input}
          placeholder="Card Number"
          value={cardInfo.cardNumber}
          onChangeText={value => handleCardChange('cardNumber', value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Expiry Date (MM/YY)"
          value={cardInfo.expiryDate}
          onChangeText={value => handleCardChange('expiryDate', value)}
        />
        <TextInput
          style={styles.input}
          placeholder="CVV"
          value={cardInfo.cvv}
          onChangeText={value => handleCardChange('cvv', value)}
        />
      </View>

      {/* Shipping Information */}
      <View style={styles.shippingInfoSection}>
        <Text style={styles.sectionTitle}>Shipping Information</Text>
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          value={shippingInfo.fullName}
          onChangeText={value => handleShippingChange('fullName', value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Address"
          value={shippingInfo.address}
          onChangeText={value => handleShippingChange('address', value)}
        />
        <TextInput
          style={styles.input}
          placeholder="City"
          value={shippingInfo.city}
          onChangeText={value => handleShippingChange('city', value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Postal Code"
          value={shippingInfo.postalCode}
          onChangeText={value => handleShippingChange('postalCode', value)}
        />
      </View>

      {/* Payment Button */}
      <View style={styles.paymentButtonSection}>
        <Button title="Submit Payment" onPress={handlePayment} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff'
  },
  heroSection: {
    height: 150,
    backgroundColor: '#FF7E00',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20
  },
  heroText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold'
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#2D7B30'
  },
  bankDetailsSection: {
    marginBottom: 20
  },
  cardPaymentSection: {
    marginBottom: 20
  },
  shippingInfoSection: {
    marginBottom: 20
  },
  input: {
    borderWidth: 1,
    borderColor: '#2D7B30',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#F0F0F0'
  },
  paymentButtonSection: {
    marginBottom: 20
  }
});

export default PaymentScreen;
