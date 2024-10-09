import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // Using FontAwesome icons

const OrderTrackingScreen = () => {
  const [status] = useState('Shipped'); // Change this value to 'Processing', 'Shipped', or 'Delivered' to test different status visuals

  // Dummy product data
  const products = [
    { id: 1, image: require('../assets/a1.jpeg'), name: 'Product 1', price: '$10' },
    { id: 2, image: require('../assets/a2.jpeg'), name: 'Product 2', price: '$15' },
    { id: 3, image: require('../assets/a3.jpeg'), name: 'Product 3', price: '$20' },
    { id: 4, image: require('../assets/a4.jpeg'), name: 'Product 4', price: '$25' },
    { id: 5, image: require('../assets/a5.jpeg'), name: 'Product 5', price: '$30' },
    { id: 6, image: require('../assets/a6.jpeg'), name: 'Product 6', price: '$35' },
    { id: 7, image: require('../assets/a7.jpeg'), name: 'Product 7', price: '$40' },
    { id: 8, image: require('../assets/a8.jpg'), name: 'Product 8', price: '$45' },
    { id: 9, image: require('../assets/a9.jpg'), name: 'Product 9', price: '$50' },
    { id: 10, image: require('../assets/a10.jpg'), name: 'Product 10', price: '$55' },
  ];

  // Define colors for status steps based on tracking status
  const getCircleColor = (step) => {
    if (status === 'Delivered') return '#4CAF50'; // All green
    if (status === 'Shipped' && step < 3) return '#4CAF50'; // First two green, last one orange
    if (status === 'Processing' && step < 2) return '#4CAF50'; // Only first green, others orange
    return '#FF7E00'; // Amber orange
  };

  // Render product item function
  const renderProductItem = ({ item }) => (
    <View style={styles.productItem}>
      <Image source={item.image} style={styles.productImage} />
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productPrice}>{item.price}</Text>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Tracking Section */}
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Tracking Details</Text>

        {/* Status Indicator */}
        <View style={styles.statusContainer}>
          <View style={styles.statusItem}>
            <FontAwesome name="hourglass-start" size={24} color={getCircleColor(1)} />
            <View style={[styles.circle, { backgroundColor: getCircleColor(1) }]} />
            <Text style={styles.statusText}>Processing</Text>
          </View>
          <View style={[styles.pipe, { backgroundColor: getCircleColor(1) }]} />
          <View style={styles.statusItem}>
            <FontAwesome name="truck" size={24} color={getCircleColor(2)} />
            <View style={[styles.circle, { backgroundColor: getCircleColor(2) }]} />
            <Text style={styles.statusText}>Shipped</Text>
          </View>
          <View style={[styles.pipe, { backgroundColor: getCircleColor(2) }]} />
          <View style={styles.statusItem}>
            <FontAwesome name="check-circle" size={24} color={getCircleColor(3)} />
            <View style={[styles.circle, { backgroundColor: getCircleColor(3) }]} />
            <Text style={styles.statusText}>Delivered</Text>
          </View>
        </View>

        {/* Order Details Section */}
        <View style={styles.orderDetails}>
          <Text style={styles.orderDetailHeader}>Order Details</Text>
          <Text style={styles.orderDetailText}>Order Number: 123456789</Text>
          <Text style={styles.orderDetailText}>Order Date: 01-10-2024</Text>
          <Text style={styles.orderDetailText}>Total Amount: $100.00</Text>
        </View>
      </View>

      {/* Products Section */}
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Products You Might Like</Text>
        <FlatList
          data={products}
          renderItem={renderProductItem}
          keyExtractor={(item) => item.id.toString()}
          horizontal={false}
          numColumns={3} // Adjust number of columns here
          contentContainerStyle={styles.productGrid}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#D3D3D3', // Light grey background
    paddingVertical: 20,
  },
  section: {
    backgroundColor: '#fff', // White background for sections
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statusItem: {
    alignItems: 'center',
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  pipe: {
    width: 50,
    height: 5,
    backgroundColor: '#FF7E00', // Default to orange
  },
  statusText: {
    marginTop: 5,
    fontSize: 14,
    color: '#333',
  },
  orderDetails: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#F5F5F5', // Light background for order details
    borderRadius: 8,
  },
  orderDetailHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  orderDetailText: {
    fontSize: 14,
    color: '#333',
  },
  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  productItem: {
    width: '30%',
    marginBottom: 20,
  },
  productImage: {
    width: '100%',
    height: 100,
    borderRadius: 10,
  },
  productName: {
    fontSize: 14,
    marginTop: 5,
  },
  productPrice: {
    fontSize: 12,
    color: '#FF7E00',
  },
});

export default OrderTrackingScreen;
