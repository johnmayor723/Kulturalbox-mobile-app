import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const CartScreen = () => {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);

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
        
        // Make sure that the cartIds are correctly formatted and matching the _id from products
        const filteredCartItems = products.filter(product => cartIds.includes(product._id));
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

  return (
    <View>
      <Text>Cart Items</Text>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item._id.toString()} // Use _id for key extraction
        renderItem={({ item }) => (
          <View>
            <Text>{item.name}</Text>
            <Text>Price: {item.price}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default CartScreen;
