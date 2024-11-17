import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, TextInput, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CartScreen = ({ navigation }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartItemCount, setCartItemCount] = useState(0);

  // Retrieve cart items from AsyncStorage
  const getCartItems = async () => {
    try {
      const storedCart = await AsyncStorage.getItem('CartItems');
      if (storedCart) {
        setCartItems(JSON.parse(storedCart));
      }
    } catch (error) {
      console.log('Error retrieving cart:', error);
    }
  };

  // Save updated cart to AsyncStorage
  const updateCartInStorage = async (updatedCart) => {
    try {
      await AsyncStorage.setItem('CartItems', JSON.stringify(updatedCart));
    } catch (error) {
      console.log('Error saving cart:', error);
    }
  };

  // Update the quantity of a cart item
  const handleQuantityChange = (id, newQuantity) => {
    const updatedCartItems = cartItems.map(item => {
      if (item.id === id) {
        return { ...item, quantity: Math.max(1, Number(newQuantity)) };
      }
      return item;
    });
    setCartItems(updatedCartItems);
    updateCartInStorage(updatedCartItems);
  };

  // Delete an item from the cart
  const handleDeleteItem = (id) => {
    const updatedCartItems = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCartItems);
    updateCartInStorage(updatedCartItems);
  };

  // Clear the cart
  const handleClearCart = () => {
    Alert.alert('Clear Cart', 'Are you sure you want to clear the cart?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Clear',
        onPress: async () => {
          setCartItems([]);
          await AsyncStorage.removeItem('cart');
        },
        style: 'destructive',
      },
    ]);
  };

  // Calculate total amount
  const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Navigate to Payment screen
  const handleCheckout = () => {
    navigation.navigate('Payment', { totalAmount, cartItemCount });
  };

  // Calculate total item count whenever cart items change
  useEffect(() => {
    const count = cartItems.reduce((total, item) => total + item.quantity, 0);
    setCartItemCount(count);
  }, [cartItems]);

  // Fetch cart items from AsyncStorage on component mount
  useEffect(() => {
    getCartItems();
  }, []);

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
              <View key={item.id} style={styles.cartItem}>
                <Image source={{ uri: item.imageUrl }} style={styles.productImage} />
                <Text style={styles.itemText}>{item.name}</Text>
                <Text style={styles.itemPrice}>₦{item.price.toFixed(2)}</Text>

                {/* Quantity Input */}
                <TextInput
                  style={styles.quantityInput}
                  value={item.quantity.toString()}
                  keyboardType="numeric"
                  onChangeText={(value) => handleQuantityChange(item.id, value)}
                />

                {/* Delete Button */}
                <TouchableOpacity onPress={() => handleDeleteItem(item.id)} style={styles.deleteButton}>
                  <Text style={styles.deleteText}>Delete</Text>
                </TouchableOpacity>
              </View>
            ))
          ) : (
            <Text>No items in your cart.</Text>
          )}
        </View>
      </ScrollView>

      {/* Fixed Bottom Tab */}
      <View style={styles.bottomTab}>
        <Text style={styles.totalText}>Total:₦{totalAmount.toFixed(2)}</Text>
        <TouchableOpacity style={styles.clearCartButton} onPress={handleClearCart}>
          <Text style={styles.clearCartText}>Clear Cart</Text>
        </TouchableOpacity>
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
  heroText: { fontSize: 24, color: 'green', fontWeight: 'bold' },
  scrollContainer: { padding: 20, flexGrow: 1 },
  cartItemsSection: { marginBottom: 20 },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  productImage: { width: 50, height: 50, marginRight: 10 },
  itemText: { flex: 1, fontSize: 16 },
  itemPrice: { fontSize: 16, fontWeight: 'bold' },
  quantityInput: {
    width: 40,
    height: 30,
    borderWidth: 1,
    borderColor: '#ccc',
    textAlign: 'center',
    marginRight: 10,
  },
  deleteButton: { padding: 10, backgroundColor: 'red', borderRadius: 5 },
  deleteText: { color: 'white', fontWeight: 'bold' },
  bottomTab: {
    padding: 20,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalText: { fontSize: 18, fontWeight: 'bold' },
  clearCartButton: { backgroundColor: 'gray', borderRadius: 5, padding: 10 },
  clearCartText: { color: 'white', fontWeight: 'bold' },
  checkoutButton: { backgroundColor: '#FF7E00', borderRadius: 5, padding: 10, width: '50%', alignItems: 'center' },
  checkoutText: { color: 'white', fontWeight: 'bold' },
});

export default CartScreen;
