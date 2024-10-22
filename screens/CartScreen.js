import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { deleteItem } from '../services/cartService'; // Assuming deleteItem is imported correctly

const CartScreen = ({ navigation }) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  // Fetch cart items from AsyncStorage
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const storedCartItems = await AsyncStorage.getItem('cartItems');
        const parsedCartItems = storedCartItems ? JSON.parse(storedCartItems) : [];
        setCartItems(parsedCartItems);
        calculateTotal(parsedCartItems);
      } catch (error) {
        console.log('Error fetching cart items:', error);
      }
    };

    fetchCartItems();
  }, []);

  // Calculate total price
  const calculateTotal = (items) => {
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setTotalAmount(total);
  };

  // Increase quantity
  const increaseQuantity = (id) => {
    const updatedItems = cartItems.map(item => {
      if (item.id === id) {
        item.quantity += 1;
      }
      return item;
    });
    setCartItems(updatedItems);
    calculateTotal(updatedItems);
    saveCartToStorage(updatedItems);
  };

  // Decrease quantity
  const decreaseQuantity = (id) => {
    const updatedItems = cartItems.map(item => {
      if (item.id === id && item.quantity > 1) {
        item.quantity -= 1;
      }
      return item;
    });
    setCartItems(updatedItems);
    calculateTotal(updatedItems);
    saveCartToStorage(updatedItems);
  };

  // Delete an item
  const handleDelete = async (id) => {
    const updatedItems = cartItems.filter(item => item.id !== id);
    setCartItems(updatedItems);
    calculateTotal(updatedItems);
    saveCartToStorage(updatedItems);
    await deleteItem(id); // Call the deleteItem service
  };

  // Save cart data to AsyncStorage
  const saveCartToStorage = async (items) => {
    try {
      await AsyncStorage.setItem('cartItems', JSON.stringify(items));
    } catch (error) {
      console.log('Error saving cart to storage:', error);
    }
  };

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

              {/* Quantity Buttons */}
              <View style={styles.quantityContainer}>
                <TouchableOpacity onPress={() => decreaseQuantity(item.id)}>
                  <Text style={styles.quantityButton}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantityText}>{item.quantity}</Text>
                <TouchableOpacity onPress={() => increaseQuantity(item.id)}>
                  <Text style={styles.quantityButton}>+</Text>
                </TouchableOpacity>
              </View>

              {/* Delete Button */}
              <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.deleteButton}>
                <Text style={styles.deleteText}>Delete</Text>
              </TouchableOpacity>
            </View>
          ))}
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
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingHorizontal: 10,
  },
  quantityText: {
    marginHorizontal: 10,
  },
  deleteButton: {
    backgroundColor: '#FF7E00', // Amber orange
    padding: 5,
    borderRadius: 5,
  },
  deleteText: {
    color: 'white',
    fontWeight: 'bold',
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
    backgroundColor: '#FF7E00', // Amber orange for checkout button
    borderRadius: 5,
    padding: 10,
    width: '50%', // Adjust width to fit nicely
    alignItems: 'center',
  },
  checkoutText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default CartScreen;
