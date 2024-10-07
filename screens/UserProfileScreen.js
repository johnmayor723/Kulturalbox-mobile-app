// UserProfileScreen.js
import React from 'react';
import { View, Text, StyleSheet, Image, FlatList } from 'react-native';

const UserProfileScreen = () => {
  const user = {
    name: 'John Doe',
    email: 'johndoe@example.com',
    phone: '123-456-7890',
    address: '123 Main St, City, Country',
    image: require('../assets/user.png'), // replace with actual user image
  };

  const activities = [
    { id: '1', title: 'Order #1234', date: '2024-09-20', status: 'Delivered' },
    { id: '2', title: 'Order #1235', date: '2024-09-25', status: 'Processing' },
    { id: '3', title: 'Order #1236', date: '2024-09-30', status: 'Cancelled' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={user.image} style={styles.userImage} />
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.email}>{user.email}</Text>
        <Text style={styles.phone}>{user.phone}</Text>
        <Text style={styles.address}>{user.address}</Text>
      </View>

      <View style={styles.activitiesSection}>
        <Text style={styles.activitiesTitle}>Recent Activities</Text>
        <FlatList
          data={activities}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.activityItem}>
              <Text style={styles.activityTitle}>{item.title}</Text>
              <Text style={styles.activityDate}>{item.date}</Text>
              <Text style={styles.activityStatus}>{item.status}</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  userImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  email: {
    fontSize: 16,
    color: '#666',
  },
  phone: {
    fontSize: 16,
    color: '#666',
  },
  address: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  activitiesSection: {
    marginTop: 30,
  },
  activitiesTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#4CAF50',
  },
  activityItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  activityDate: {
    fontSize: 14,
    color: '#888',
  },
  activityStatus: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
});

export default UserProfileScreen;
