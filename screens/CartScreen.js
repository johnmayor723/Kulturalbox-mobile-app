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
      console.log(products);
    } catch (error) {
      console.log('Error fetching products:', error);
    }
  };

  // Retrieve cart items from AsyncStorage and filter products
  const getCartItems = async () => {
    try {
      const cart = await AsyncStorage.getItem('cartItems');
      console.log(cart);
      if (cart) {
        const cartIds = JSON.parse(cart).map(item => item._id); // Extract the product IDs
        console.log(" got cardids");
        console.log(cartIds)
        const filteredCartItems = products.filter(product => cartIds.includes(product._id));
        console.log("filtered cart items")
        console.log(filteredCartItems);
        setCartItems(filteredCartItems);
      }
    } catch (error) {
      console.log('Error retrieving cart:', error);
    }
  };

  // UseEffect to fetch products and set cart items
  useEffect(() => {
    fetchProducts(); // Fetch products on mount
  }, []);

  // UseEffect to filter cart items when products are fetched
  useEffect(() => {
    if (products.length > 0) {
      getCartItems(); 
      console.log(cartItems)
      // Get cart items whenever products are updated
    }
  }, [products]);

  return (
    <View>
      <Text>Cart Items</Text>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id.toString()} // Use _id for key extraction
        renderItem={({ item }) => (
          <View>
            <Text>{item.name}</Text>
            <Text>Price: {item.price}</Text> {/* You may want to retrieve quantity from AsyncStorage or manage it elsewhere */}
          </View>
        )}
      />
    </View>
  );
};

export default CartScreen;
