import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons'; // Ensure you have installed these: expo install @expo/vector-icons

export default function UserProfileScreen({navigation}) {
  const [orderStatus, setOrderStatus] = useState('pending'); // Example of order status coming from backend ('pending', 'shipped', 'delivered', etc.)

  // Logic to change icon colors based on order status
  const getOrderIconColor = (status) => {
    if (status === 'pending') return 'orange';
    if (status === 'shipped') return '#FF7E00'; // Amber orange
    if (status === 'delivered') return 'green';
    if (status === 'returned' || status === 'problem') return 'red'; // Problem status
    return 'gray';
  };

  // Simulate getting order status from backend
  useEffect(() => {
    // Fetch order status from the backend here
    // Example: setOrderStatus(response.data.orderStatus);
  }, []);

  return (
    <View style={styles.container}>
      {/* Hero Section */}
      <View style={styles.heroSection}>
        <View style={styles.profileContent}>
          <View style={styles.profileHeader}>
            {/* Profile Image and Icon */}
            <View style={styles.profileImageWrapper}>
              <Image
                source={{ uri: 'https://via.placeholder.com/100' }} // Dummy profile image URL
                style={styles.profileImage}
              />
              <TouchableOpacity style={styles.editIcon}>
                <Ionicons name="camera" size={20} color="white" />
              </TouchableOpacity>
            </View>
            {/* User's Name and Edit Icon */}
            <Text style={styles.userName}>John Doe</Text>
            <TouchableOpacity>
              <MaterialIcons name="edit" size={24} color="gray" style={styles.editProfileIcon} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* My Order Section */}
      <View style={styles.myOrderSection}>
        <Text style={styles.sectionTitle}>My Order</Text>
        <View style={styles.orderTracking}>
          <TouchableOpacity>
            <FontAwesome
              name="hourglass-half"
              size={24}
              color={getOrderIconColor(orderStatus === 'pending' ? 'pending' : 'gray')}
            />
            <Text>Pending Payment</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <FontAwesome
              name="truck"
              size={24}
              color={getOrderIconColor(orderStatus === 'shipped' ? 'shipped' : 'gray')}
            />
            <Text>Shipped</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons
              name={orderStatus === 'delivered' ? 'checkmark-circle' : 'close-circle'}
              size={24}
              color={getOrderIconColor(orderStatus === 'delivered' ? 'delivered' : 'returned')}
            />
            <Text>{orderStatus === 'returned' ? 'Returned' : 'Delivered'}</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Wishlist, Recently Viewed, and Address Management Section */}
      <View style={styles.extraSection}>
        <TouchableOpacity style={styles.extraItem}>
          <Ionicons name="heart-outline" size={24} color="gray" />
          <Text>Wishlist</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.extraItem}>
          <Ionicons name="eye-outline" size={24} color="gray" />
          <Text>Recently Viewed</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.extraItem}>
          <Ionicons name="location-outline" size={24} color="gray" />
          <Text>Address Management</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  heroSection: {
    backgroundColor: '#FF7E00', // Amber orange
    height: 200,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileContent: {
    backgroundColor: 'white',
    width: '70%',
    padding: 20,
    borderRadius: 10,
    position: 'absolute',
    top: '60%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 3,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  profileImageWrapper: {
    position: 'relative',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  editIcon: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: 'green',
    borderRadius: 20,
    padding: 5,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  editProfileIcon: {
    marginLeft: 10,
  },
  myOrderSection: {
    backgroundColor: 'white',
    padding: 20,
    margin: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#d3d3d3',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  orderTracking: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  extraSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    padding: 20,
    margin: 10,
  },
  extraItem: {
    alignItems: 'center',
  },
});
