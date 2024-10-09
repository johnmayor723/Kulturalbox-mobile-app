import React from 'react';
import { View, Text, TextInput, Button, FlatList, Image, StyleSheet } from 'react-native';

const TrackingScreen = ({ navigation }) => {
  // Dummy data for recommended products
  const products = [
    { id: '1', image: require('../assets/a1.jpeg') },
    { id: '2', image: require('../assets/a2.jpeg') },
    { id: '3', image: require('../assets/a3.jpeg') },
    { id: '4', image: require('../assets/a4.jpeg') },
    { id: '5', image: require('../assets/a5.jpeg') },
    { id: '6', image: require('../assets/a6.jpeg') },
    { id: '7', image: require('../assets/a7.jpeg') },
    { id: '8', image: require('../assets/a8.jpg') },
    { id: '9', image: require('../assets/a9.jpg') },
    { id: '10', image: require('../assets/a10.jpg') },
  ];

  // Render individual product in grid
  const renderProduct = ({ item }) => (
    <View style={styles.productContainer}>
      <Image source={item.image} style={styles.productImage} />
    </View>
  );

  return (
    <View style={styles.container}>
      {/* First Section - Tracking Form */}
      <View style={styles.trackingFormSection}>
        <Text style={styles.sectionHeader}>Track Your Order</Text>
        <TextInput 
          placeholder="Enter Tracking Number" 
          style={styles.input} 
        />
        <Button 
          title="Track Order" 
          color="#FF7E00" // Amber button color
          onPress={() => navigation.navigate('TrackingResult')}
        />
      </View>

      {/* Second Section - Recommended Products */}
      <View >
        <Text style={styles.sectionHeader}>Products You May Like</Text>
        <FlatList
          data={products}
          renderItem={renderProduct}
          keyExtractor={(item) => item.id}
          numColumns={3} // Three items per row
          columnWrapperStyle={styles.columnWrapper} // Ensure proper spacing
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#f5f5f5',
  },
  trackingFormSection: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50', // Green for the header
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
  recommendedSection: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    flex: 1,
  },
  columnWrapper: {
    justifyContent: 'space-between', // Spacing between products
    marginBottom: 15,
  },
  productContainer: {
    flex: 1,
    marginHorizontal: 5, // Add horizontal margin for spacing
    alignItems: 'center',
  },
  productImage: {
    width: '100%',
    height: 100,
    borderRadius: 10,
  },
});

export default TrackingScreen;
