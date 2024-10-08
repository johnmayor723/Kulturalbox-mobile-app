import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ContactScreen = () => {
  return (
    <View style={styles.container}>
      {/* Hero Section */}
      <View style={styles.heroSection}>
        <Text style={styles.heroText}>Contact Us</Text>
      </View>

      {/* Contact Information */}
      <View style={styles.contactInfo}>
        <Text style={styles.contactTitle}>Get in Touch</Text>

        <View style={styles.contactItem}>
          <Ionicons name="call" size={24} color="#Ff7e00" />
          <Text style={styles.contactText}>+1 123 456 7890</Text>
        </View>

        <View style={styles.contactItem}>
          <Ionicons name="mail" size={24} color="#Ff7e00" />
          <Text style={styles.contactText}>info@fooddeck.com</Text>
        </View>

        <View style={styles.contactItem}>
          <Ionicons name="location" size={24} color="#Ff7e00" />
          <Text style={styles.contactText}>123 Food Street, Grocery City</Text>
        </View>
      </View>

      {/* Contact Button */}
      <TouchableOpacity style={styles.contactButton}>
        <Text style={styles.buttonText}>Send a Message</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  heroSection: {
    height: 150,
    backgroundColor: '#Ff7e00',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  contactInfo: {
    padding: 20,
  },
  contactTitle: {
    fontSize: 20,
    color: '#2D7B30',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  contactText: {
    fontSize: 16,
    color: '#2D7B30',
    marginLeft: 10,
  },
  contactButton: {
    backgroundColor: '#Ff7e00',
    padding: 15,
    margin: 20,
    borderRadius: 25,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ContactScreen;
