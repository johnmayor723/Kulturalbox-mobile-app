import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const PaymentScreen = () => {
  const cartItemsCount = 3; // Example count of items in cart
  const totalAmount = "$50.00"; // Example total amount

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {/* First Section: Search Form */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search product"
          />
        </View>

        {/* Second Section: Delivery Options */}
        <Text style={styles.deliveryHeader}>How would you like your order delivered?</Text>

        {/* Delivery Option Boxes */}
        <View style={styles.deliveryOptionsContainer}>
          {/* Home Delivery Box */}
          <View style={styles.deliveryBox}>
            <Ionicons name="home-outline" size={24} color="black" />
            <Text style={styles.boxTitle}>Home Delivery</Text>
            <Text style={styles.boxText}>Pay now and have your order delivered at home.</Text>
          </View>

          {/* Store Pickup Box */}
          <View style={styles.deliveryBox}>
            <Ionicons name="storefront-outline" size={24} color="black" />
            <Text style={styles.boxTitle}>Store Pickup</Text>
            <Text style={styles.boxText}>Pay now and pick up your item at our store.</Text>
          </View>

          {/* Payment on Delivery Box */}
          <View style={styles.deliveryBox}>
            <Ionicons name="cash-outline" size={24} color="black" />
            <Text style={styles.boxTitle}>Payment on Delivery</Text>
            <Text style={styles.boxText}>Pay for your order upon delivery.</Text>
          </View>
        </View>
      </ScrollView>

      {/* Third Section: Bottom Tab */}
      <View style={styles.bottomTab}>
        <View style={styles.cartInfo}>
          <Text style={styles.cartText}>Your cart has {cartItemsCount} items</Text>
          <Text style={styles.totalAmount}>{totalAmount}</Text>
        </View>
        <TouchableOpacity style={styles.checkoutButton}>
          <Text style={styles.checkoutText}>Check Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollView: {
    paddingBottom: 80, // Ensure space for the bottom tab
  },
  searchContainer: {
    backgroundColor: 'lightgray',
    padding: 10,
    borderRadius: 5,
    marginBottom: 25,
  },
  searchInput: {
    height: 40,
    paddingHorizontal: 10,
  },
  deliveryHeader: {
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#FF7E00', // Amber orange for header text
  },
  deliveryOptionsContainer: {
    marginHorizontal: 16,
  },
  deliveryBox: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 15,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  boxTitle: {
    fontWeight: 'bold',
    marginVertical: 5,
    color: '#4CAF50', // Green color for titles
  },
  boxText: {
    color: '#555',
  },
  bottomTab: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: 'lightgray',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  cartInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cartText: {
    color: 'black',
  },
  totalAmount: {
    color: 'black',
  },
  checkoutButton: {
    backgroundColor: '#FF7E00', // Amber orange for checkout button
    borderRadius: 5,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkoutText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default PaymentScreen;
