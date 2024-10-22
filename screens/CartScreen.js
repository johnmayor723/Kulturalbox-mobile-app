import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { deleteItem } from '../services/cartService'; // Import deleteItem function

const CartScreen = ({ route, navigation }) => {
  const { cart } = route.params; // Get cart data from route parameters
  const [cartItems, setCartItems] = useState(cart); // Set cart items using passed data

  // Function to update the quantity of a cart item
  const updateQuantity = (id, type) => {
    const updatedCart = cartItems.map(item => {
      if (item.id === id) {
        return {
          ...item,
          quantity: type === 'increase' ? item.quantity + 1 : Math.max(item.quantity - 1, 1) // Prevent quantity from going below 1
        };
      }
      return item;
    });
    setCartItems(updatedCart);
  };

  // Calculate total amount
  const totalAmount = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // Handle item deletion
  const handleDelete = (id) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);
    deleteItem(id); // Trigger the deleteItem function
  };

  // Navigate to Payment screen
  const handleCheckout = () => {
    navigation.navigate('Payment', { cartItems });
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
              <Text style={styles.itemText}>{item.name}</Text>

              {/* Quantity Adjustment Buttons */}
              <View style={styles.quantityContainer}>
                <TouchableOpacity onPress={() => updateQuantity(item.id, 'decrease')} style={styles.quantityButton}>
                  <Text style={styles.quantityText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantityText}>{item.quantity}</Text>
                <TouchableOpacity onPress={() => updateQuantity(item.id, 'increase')} style={styles.quantityButton}>
                  <Text style={styles.quantityText}>+</Text>
                </TouchableOpacity>
              </View>

              <Text style={styles.itemPrice}>${(item.price * item.quantity).toFixed(2)}</Text>

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
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    backgroundColor: '#FF7E00', // Amber orange for buttons
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  quantityText: {
    fontSize: 16,
    marginHorizontal: 10,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: '#ff4d4d',
    paddingHorizontal: 10,
    paddingVertical: 5,
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
    width: '50%',
    alignItems: 'center',
  },
  checkoutText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default CartScreen;
