import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Navigation hook

const TrackingScreen = () => {
  const navigation = useNavigation(); // Use the navigation hook to navigate between screens
  const [orderNumber, setOrderNumber] = useState('');

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

  // Render product item function
  const renderProductItem = ({ item }) => (
    <View style={styles.productItem}>
      <Image source={item.image} style={styles.productImage} />
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productPrice}>{item.price}</Text>
    </View>
  );

  // Navigate to TrackingResultsScreen when track button is pressed
  const handleTrackOrder = () => {
    // Navigate to the TrackingResultsScreen (dummy for now)
    navigation.navigate('TrackingResult');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Tracking Form Section */}
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Track Your Order</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your order number"
          value={orderNumber}
          onChangeText={setOrderNumber}
        />
        <TouchableOpacity style={styles.trackButton} onPress={handleTrackOrder}>
          <Text style={styles.trackButtonText}>Track Order</Text>
        </TouchableOpacity>
      </View>

      {/* Recommended Products Section */}
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Products You Might Like</Text>
        <FlatList
          data={products}
          renderItem={renderProductItem}
          keyExtractor={(item) => item.id.toString()}
          horizontal={false}
          numColumns={3} // Single column without flexWrap
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
  input: {
    height: 40,
    borderColor: '#CCCCCC',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  trackButton: {
    backgroundColor: '#4CAF50', // Green button
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  trackButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  productGrid: {
    flexDirection: 'column', // Single column layout
  },
  productItem: {
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
    color: '#FF7E00', // Amber orange text for price
  },
});

export default TrackingScreen;
