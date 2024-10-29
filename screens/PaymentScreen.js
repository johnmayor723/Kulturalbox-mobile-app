import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRoute, useNavigation } from '@react-navigation/native';

const PaymentScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  
  // Log route parameters for debugging
  console.log('Route Params:', route.params);

  // Extracting cart items count and total amount from route params
  const { cartItemCount = 0, totalAmount = 0 } = route.params || {};
  
  // Convert totalAmount to Naira format
  const formattedTotalAmount = `₦${totalAmount.toFixed(2)}`;
  
  const handleCheckout = () => {
    navigation.navigate("Checkout", { formattedTotalAmount });
  };

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
          <Text style={styles.cartText}>Your cart has {cartItemCount} items</Text>
          <Text style={styles.totalAmount}>{formattedTotalAmount}</Text>
        </View>
        <TouchableOpacity onPress={handleCheckout} style={styles.checkoutButton}>
          <Text style={styles.checkoutText}>Check Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // Your styles go here
});

export default PaymentScreen;
