// OrderTrackingScreen.js

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const OrderTrackingScreen = () => {
  // Simulate order status for now (later fetched from API)
  const [orderStatus, setOrderStatus] = useState('Delivered');
  const [orderDetails, setOrderDetails] = useState({
    id: '12345',
    items: [
      { id: '1', name: 'Organic Apples', quantity: 3, price: 4.99 },
      { id: '2', name: 'Bananas', quantity: 2, price: 2.99 },
    ],
    total: 15.95,
  });

  // Status levels (e.g., Pending, Shipped, Delivered)
  const statusSteps = ['Pending', 'Shipped', 'Delivered'];

  return (
    <View style={styles.container}>
      {/* Hero Section */}
      <View style={styles.hero}>
        <Text style={styles.heroText}>Order Tracking</Text>
      </View>

      {/* Activity Status Bar */}
      <View style={styles.statusBar}>
        {statusSteps.map((status, index) => (
          <View key={index} style={styles.statusStep}>
            <Ionicons
              name={status === orderStatus ? 'checkmark-circle' : 'ellipse'}
              size={32}
              color={status === orderStatus ? '#2D7B30' : '#999'}
            />
            <Text
              style={[
                styles.statusText,
                { color: status === orderStatus ? '#2D7B30' : '#999' },
              ]}
            >
              {status}
            </Text>
          </View>
        ))}
      </View>

      {/* Order Details */}
      <View style={styles.orderDetailsContainer}>
        <Text style={styles.detailsTitle}>Order Details</Text>
        <Text style={styles.detailsText}>Order ID: {orderDetails.id}</Text>
        <FlatList
          data={orderDetails.items}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.orderItem}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemQuantity}>Qty: {item.quantity}</Text>
              <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
            </View>
          )}
        />
        <Text style={styles.total}>Total: ${orderDetails.total.toFixed(2)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  hero: {
    height: 150,
    backgroundColor: '#Ff7e00',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  statusBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  statusStep: {
    alignItems: 'center',
  },
  statusText: {
    marginTop: 5,
    fontSize: 16,
  },
  orderDetailsContainer: {
    paddingHorizontal: 16,
  },
  detailsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2D7B30',
  },
  detailsText: {
    fontSize: 16,
    marginBottom: 10,
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemQuantity: {
    fontSize: 16,
  },
  itemPrice: {
    fontSize: 16,
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#2D7B30',
  },
});

export default OrderTrackingScreen;
