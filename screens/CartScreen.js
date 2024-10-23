import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet, Button, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";

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
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(null);
  const [cartTotal, setCartTotal] = useState(0);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch products once when the component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://pantry-hub-server.onrender.com/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []); // No dependencies so it runs once on component mount

  // Load data from AsyncStorage whenever the screen comes into focus
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getDataFromDB();
    });

    return () => {
      unsubscribe();
    };
  }, [navigation]); // Depend on navigation

  const getDataFromDB = async () => {
    let items = await AsyncStorage.getItem('cartItem');
    items = JSON.parse(items);
    let productData = [];
    if (items) {
      products.forEach(data => {
        if (items.includes(data.id)) {
          productData.push(data);
        }
      });
      setCart(productData);
      getTotal(productData);
    } else {
      setCart(false);
      getTotal(false);
    }
  };

  // Calculate total price of items in cart
  const getTotal = productData => {
    let total = 0;
    for (let index = 0; index < productData.length; index++) {
      let productPrice = productData[index].productPrice;
      total = total + productPrice;
    }
    setTotal(total);
  };

  // Handle saving to storage
  const saveCartToStorage = async (updatedCart) => {
    try {
      await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
    } catch (error) {
      console.log('Error saving cart to storage:', error);
    }
  };

  const removeItemFromCart = (itemId) => {
    const updatedCart = cart.filter((cartItem) => cartItem.id !== itemId);
    setCart(updatedCart);
    saveCartToStorage(updatedCart);
  };

  const updateQuantity = (itemId, quantity) => {
    const updatedCart = cart.map((cartItem) =>
      cartItem.id === itemId ? { ...cartItem, quantity } : cartItem
    );
    setCart(updatedCart);
    saveCartToStorage(updatedCart);
  };

  const calculateTotal = () => {
    const total = cart.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
    setCartTotal(total);
  };

  const handleCheckout = () => {
    navigation.navigate('Payment');
  };

  // Handle loading state before data is fetched
  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.heroSection}>
        <Text style={styles.heroText}>Your Cart</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.cartItemsSection}>
          {cart.length > 0 ? (
            cart.map(item => (
              <View key={item.id} style={styles.cartItem}>
                <Image source={{uri: item.imageUrl}} style={styles.productImage} />
                <Text style={styles.itemText}>{item.name} x{item.quantity}</Text>
                <Text style={styles.itemPrice}>${(item.unitPrice * item.quantity).toFixed(2)}</Text>
                <View style={styles.actions}>
                  <Button title="+" onPress={() => updateQuantity(item.id, item.quantity + 1)} />
                  <Button title="-" onPress={() => item.quantity > 1 ? updateQuantity(item.id, item.quantity - 1) : removeItemFromCart(item.id)} />
                  <Button title="Remove" onPress={() => removeItemFromCart(item.id)} />
                </View>
              </View>
            ))
          ) : (
            <Text>No items in your cart</Text>
          )}
        </View>

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

      <View style={styles.bottomTab}>
        <Text style={styles.totalText}>Total: ${cartTotal.toFixed(2)}</Text>
        <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
          <Text style={styles.checkoutText}>Proceed to Payment</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // Your styles here
});

export default CartScreen;
