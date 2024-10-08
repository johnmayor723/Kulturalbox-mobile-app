// CartScreen.js

import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Button, Alert } from 'react-native';

const CartScreen = ({ navigation }) => {
  // Example cart items
  const [cartItems, setCartItems] = useState([
    { id: '1', name: 'Organic Apples', quantity: 2, price: 4.99 },
    { id: '2', name: 'Bananas', quantity: 3, price: 2.99 },
  ]);

  // Calculate the total amount
  const totalAmount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Handle payment navigation
  const handlePayment = () => {
    navigation.navigate('Payment');  // Navigate to Payment Screen
  };

  return (
    <View style={styles.container}>
      {/* Hero Section */}
      <View style={styles.hero}>
        <Text style={styles.heroText}>Your Cart</Text>
      </View>

      {/* Cart Items */}
      <View style={styles.cartItemsContainer}>
        <FlatList
          data={cartItems}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.cartItem}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemQuantity}>Qty: {item.quantity}</Text>
              <Text style={styles.itemPrice}>${(item.price * item.quantity).toFixed(2)}</Text>
            </View>
          )}
        />
        {/* Total Amount */}
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Total: ${totalAmount.toFixed(2)}</Text>
        </View>

        {/* Payment Button */}
        <View style={styles.paymentButtonContainer}>
          <Button
            title="Proceed to Payment"
            onPress={handlePayment}
            color="#Ff7e00" // Amber-orange button color
          />
        </View>
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
  cartItemsContainer: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemQuantity: {
    fontSize: 16,
  },
  itemPrice: {
    fontSize: 16,
  },
  totalContainer: {
    marginTop: 20,
    borderTopWidth: 1,
    borderColor: '#ccc',
    paddingTop: 10,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2D7B30',
    textAlign: 'right',
  },
  paymentButtonContainer: {
    marginTop: 20,
  },
});

export default CartScreen;
