import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
//import { useNavigation } from '@react-navigation/native';

// Importing images from the assets folder
const images = {
  a1: require('../assets/a1.jpeg'),
  a2: require('../assets/a2.jpeg'),
  a3: require('../assets/a3.jpeg'),
  a4: require('../assets/a4.jpeg'),
  a5: require('../assets/a5.jpeg'),
  a6: require('../assets/a6.jpeg'),
  a7: require('../assets/a7.jpeg'),
  a8: require('../assets/a8.jpg'),
  a9: require('../assets/a9.jpg'),
  a10: require('../assets/a10.jpg'),
};


//const navigation = useNavigation();
const TrackingScreen = ({ navigation }) => {
  const [trackingNumber, setTrackingNumber] = useState('');

  const handleTrackingSubmit = () => {
    // Handle tracking submission, e.g., navigate to Tracking Result screen
    navigation.navigate('TrackingResult', { trackingNumber });
  };

  // Suggested products
  const suggestedProducts = [
    { id: 1, name: 'Oranges', price: 3.99, image: images.a3 },
    { id: 2, name: 'Grapes', price: 4.99, image: images.a4 },
    { id: 3, name: 'Mangoes', price: 5.99, image: images.a5 },
    { id: 4, name: 'Pineapples', price: 3.49, image: images.a6 },
    { id: 5, name: 'Strawberries', price: 4.99, image: images.a7 },
    { id: 6, name: 'Blueberries', price: 6.99, image: images.a8 },
    { id: 7, name: 'Watermelons', price: 7.99, image: images.a9 },
    { id: 8, name: 'Peaches', price: 5.49, image: images.a10 },
  ];

  return (
    <View style={styles.container}>
      {/* Fixed Green Top Bar */}
      <View style={styles.heroSection}>
        <Text style={styles.heroText}>Track Your Order</Text>
      </View>

      {/* Tracking Form */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.trackingForm}>
          <TextInput
            style={styles.input}
            placeholder="Enter Tracking Number"
            value={trackingNumber}
            onChangeText={setTrackingNumber}
          />
          <Button title="Track Order" onPress={handleTrackingSubmit} />
        </View>

        {/* Products You May Like Section */}
        <View style={styles.suggestedProductsSection}>
          <Text style={styles.sectionTitle}>Products You May Like</Text>
          {suggestedProducts.map(product => (
            <TouchableOpacity key={product.id} style={styles.suggestedProduct}>
              <Image source={product.image} style={styles.productImage} />
              <View style={styles.productDetails}>
                <Text>{product.name}</Text>
                <Text>${product.price.toFixed(2)}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  heroSection: {
    height: 100,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  heroText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  scrollContainer: {
    padding: 20,
    flexGrow: 1,
  },
  trackingForm: {
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
    borderRadius: 5,
  },
  suggestedProductsSection: {
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  suggestedProduct: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  productImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  productDetails: {
    marginLeft: 10,
  },
});

export default TrackingScreen;
