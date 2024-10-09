import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';

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

const CartScreen = ({ navigation }) => {
  // Sample cart items with images
  const [cartItems] = useState([
    { id: 1, name: 'Apples', price: 2.99, quantity: 2, image: images.a1 },
    { id: 2, name: 'Bananas', price: 1.99, quantity: 5, image: images.a2 }
  ]);

  // Suggested products with images
  const [suggestedProducts] = useState([
    { id: 3, name: 'Oranges', price: 3.99, image: images.a3 },
    { id: 4, name: 'Grapes', price: 4.99, image: images.a4 },
    { id: 5, name: 'Mangoes', price: 5.99, image: images.a5 },
    { id: 6, name: 'Pineapples', price: 3.49, image: images.a6 },
    { id: 7, name: 'Strawberries', price: 4.99, image: images.a7 },
    { id: 8, name: 'Blueberries', price: 6.99, image: images.a8 },
    { id: 9, name: 'Watermelons', price: 7.99, image: images.a9 },
    { id: 10, name: 'Peaches', price: 5.49, image: images.a10 }
  ]);

  // Enquiry form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  // Handle enquiry form submission
  const handleEnquirySubmit = () => {
    console.log('Enquiry Submitted:', { name, email, message });
  };

  // Calculate total amount
  const totalAmount = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // Navigate to Payment screen
  const handleCheckout = () => {
    navigation.navigate('Payment');
  };

  return (
    <View style={styles.container}>
      {/* Fixed Top Bar */}
      <View style={styles.heroSection}>
        <Text style={styles.heroText}>Your Cart</Text>
      </View>

      {/* Cart Items Section */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.cartItemsSection}>
          {cartItems.map(item => (
            <View key={item.id} style={styles.cartItem}>
              <Image source={item.image} style={styles.productImage} />
              <Text style={styles.itemText}>{item.name} x{item.quantity}</Text>
              <Text style={styles.itemPrice}>${(item.price * item.quantity).toFixed(2)}</Text>
            </View>
          ))}
        </View>

        {/* Products You May Like */}
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

      {/* Fixed Bottom Tab */}
      <View style={styles.bottomTab}>
        <Text style={styles.totalText}>Total: ${totalAmount.toFixed(2)}</Text>
        <Button title="Proceed to Payment" onPress={handleCheckout} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  heroSection: {
    height: 50,
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
  cartItemsSection: {
    marginBottom: 20,
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  productImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  itemText: {
    flex: 1,
    fontSize: 16,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
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
  productDetails: {
    marginLeft: 10,
  },
  bottomTab: {
    padding: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CartScreen;
