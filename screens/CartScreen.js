import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CartScreen = () => {
  const [cartItems, setCartItems] = useState([]);

  // Function to retrieve the cart from AsyncStorage
  const getCartItems = async () => {
    try {
      const cart = await AsyncStorage.getItem('cart');
      if (cart) {
        setCartItems(JSON.parse(cart));
      }
    } catch (error) {
      console.log('Error retrieving cart: ', error);
    }
  };

  // Fetch cart items when the screen loads
  useEffect(() => {
    getCartItems();
  }, []);

  return (
    <View>
      <Text>Cart Items</Text>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item_id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{item.name}</Text>
            <Text>Quantity: {item.quantity}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default CartScreen;
