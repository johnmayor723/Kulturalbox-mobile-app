// CartScreen.js
import React from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';

const dummyCart = [
  { id: '1', title: 'Apple', price: '500', quantity: 2, image: require('../assets/a1.jpeg') },
  { id: '2', title: 'Tomato', price: '200', quantity: 1, image: require('../assets/a2.jpeg') },
  { id: '3', title: 'Pepper', price: '800', quantity: 3, image: require('../assets/a3.jpeg') },
];

const CartScreen = ({ navigation }) => {
  const renderItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Image source={item.image} style={styles.cartImage} />
      <View style={styles.cartDetails}>
        <Text style={styles.cartTitle}>{item.title}</Text>
        <Text style={styles.cartPrice}>₦{item.price}</Text>
        <Text style={styles.cartQuantity}>Qty: {item.quantity}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <Text style={styles.logo}>PantryHub</Text>
      </View>
      <Text style={styles.title}>Your Cart</Text>
      <FlatList
        data={dummyCart}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  topBar: {
    height: 60,
    backgroundColor: '#4CAF50', // Green background
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 20,
    margin: 10,
    color: '#4CAF50',
  },
  cartItem: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  cartImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  cartDetails: {
    justifyContent: 'center',
  },
  cartTitle: {
    fontSize: 18,
  },
  cartPrice: {
    color: '#4CAF50',
  },
  cartQuantity: {
    color: '#666',
  },
});

export default CartScreen;
