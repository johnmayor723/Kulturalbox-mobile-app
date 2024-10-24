import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  // Suggested products with images
  const [suggestedProducts] = useState([
    { id: 3, name: 'Oranges', price: 3.99, image: images.a3 },
    { id: 4, name: 'Grapes', price: 4.99, image: images.a4 },
    { id: 5, name: 'Mangoes', price: 5.99, image: images.a5 },
    { id: 6, name: 'Pineapples', price: 3.49, image: images.a6 },
    { id: 7, name: 'Strawberries', price: 4.99, image: images.a7 },
    { id: 8, name: 'Blueberries', price: 6.99, image: images.a8 },
    { id: 9, name: 'Watermelons', price: 7.99, image: images.a9 },
    { id: 10, name: 'Peaches', price: 5.49, image: images.a10 },
  ]);

  // Fetch products from API
  const fetchProducts = async () => {
    try {
      const response = await axios.get('https://pantry-hub-server.onrender.com/api/products'); // Replace with your API endpoint
      setProducts(response.data); // Assuming response.data contains the products array
      console.log('Fetched products:', response.data); 
    } catch (error) {
      console.log('Error fetching products:', error);
    }
  };

  // Retrieve cart items from AsyncStorage and filter products
  const getCartItems = async () => {
    try {
      const cart = await AsyncStorage.getItem('cartItem');
      console.log('Stored cart items:', cart); // Log raw cart items from storage
      if (cart) {
        const cartIds = JSON.parse(cart); // Assuming cart is an array of product IDs
        console.log('Parsed cart IDs:', cartIds); // Log parsed cart item IDs

        // Filter products to match cart items
        const filteredCartItems = products.filter(product => cartIds.includes(product._id)).map(product => ({
          ...product,
          quantity: 1 // Default quantity to 1 if not already set
        }));

        console.log('Filtered cart items:', filteredCartItems); // Log filtered cart items

        setCartItems(filteredCartItems); // Update cart items state
      }
    } catch (error) {
      console.log('Error retrieving cart:', error);
    }
  };

  // UseEffect to fetch products on mount
  useEffect(() => {
    fetchProducts(); // Fetch products when component mounts
  }, []);

  // UseEffect to get cart items after products are fetched
  useEffect(() => {
    if (products.length > 0) {
      getCartItems(); // Get cart items after products are loaded
    }
  }, [products]);

  // Function to handle quantity change
  const handleQuantityChange = (id, newQuantity) => {
    const updatedCartItems = cartItems.map(item => {
      if (item._id === id) {
        return { ...item, quantity: Number(newQuantity) };
      }
      return item;
    });
    setCartItems(updatedCartItems);
  };

  // Function to delete an item from the cart
  const handleDeleteItem = (id) => {
    const updatedCartItems = cartItems.filter(item => item._id !== id);
    setCartItems(updatedCartItems);
  };

  // Calculate total amount
  const totalAmount = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // Navigate to Payment screen
  const handleCheckout = () => {
    navigation.navigate('Payment', { totalAmount }); // Pass total price to Payment screen
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
          {cartItems.length > 0 ? (
            cartItems.map(item => (
              <View key={item._id} style={styles.cartItem}>
                <Image source={{ uri: item.imageUrl }} style={styles.productImage} />
                <Text style={styles.itemText}>{item.name}</Text>
                <Text style={styles.itemPrice}>₦{item.price.toFixed(2)}</Text>

                {/* Quantity Input */}
                <TextInput
                  style={styles.quantityInput}
                  value={item.quantity.toString()}
                  keyboardType="numeric"
                  onChangeText={(value) => handleQuantityChange(item._id, value)}
                />

                {/* Delete Button */}
                <TouchableOpacity onPress={() => handleDeleteItem(item._id)} style={styles.deleteButton}>
                  <Text style={styles.deleteText}>Delete</Text>
                </TouchableOpacity>
              </View>
            ))
          ) : (
            <Text>No items in your cart.</Text>
          )}
        </View>

        {/* Products You May Like */}
        <View style={styles.suggestedProductsSection}>
          <Text style={styles.sectionTitle}>Products You May Like</Text>
          <View style={styles.suggestedProductsGrid}>
            {suggestedProducts.map(product => (
              <TouchableOpacity key={product.id} style={styles.suggestedProduct}>
                <Image source={product.image} style={styles.suggestedProductImage} />
                <Text style={styles.productName}>{product.name}</Text>
                <Text style={styles.productPrice}>${product.price.toFixed(2)}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Fixed Bottom Tab */}
      <View style={styles.bottomTab}>
        <Text style={styles.totalText}>Total: ${totalAmount.toFixed(2)}</Text>
        <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
          <Text style={styles.checkoutText}>Proceed to Payment</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  heroSection: {
    height: 50,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
    marginBottom: 10,
  },
  heroText: {
    fontSize: 24,
    color: 'green',
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
  quantityInput: {
    width: 40,
    height: 30,
    borderWidth: 1,
    borderColor: '#ccc',
    textAlign: 'center',
    marginRight: 10,
  },
  deleteButton: {
    padding: 10,
    backgroundColor: 'red',
    borderRadius: 5,
  },
  deleteText: {
    color: 'white',
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
  suggestedProductsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  suggestedProduct: {
    width: '48%',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    alignItems: 'center',
  },
  suggestedProductImage: {
    width: '100%',
    height: 100,
    borderRadius: 8,
  },
  productName: {
    fontWeight: 'bold',
    marginVertical: 5,
  },
  productPrice: {
    color: '#555',
  },
  bottomTab: {
    padding: 20,
    backgroundColor: 'white',
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
  checkoutButton: {
    backgroundColor: '#FF7E00',
    borderRadius: 5,
    padding: 10,
    width: '50%',
    alignItems: 'center',
  },
  checkoutText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default CartScreen;
