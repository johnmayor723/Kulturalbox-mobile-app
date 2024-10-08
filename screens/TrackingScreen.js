import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const OrderTrackingScreen = () => {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [orderStatus] = useState('Delivered');  // Hardcoded for now
const navigation = useNavigation();
  const handleTracking = () => {
    // Navigate to Tracking Results screen without validation
    navigation.navigate('Tracking Result');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.heroSection}>
        <Text style={styles.heroText}>Track Your Order</Text>
      </View>
      
      <View style={styles.trackingSection}>
        <Text>Order Status: {orderStatus}</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Tracking or Order Number"
          value={trackingNumber}
          onChangeText={setTrackingNumber}
        />
        <Button title="Track Order" onPress={handleTrackOrder} />
      </View>

      {/* Enquiry Section */}
      <View style={styles.enquirySection}>
        <Text style={styles.enquiryTitle}>Have a question? Send us a message</Text>
        {/* Add your enquiry form here */}
           <View style={styles.enquirySection}>
        <Text style={styles.enquiryTitle}>Send us a message</Text>
        <TextInput
          style={styles.input}
          placeholder="Your Name"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Your Email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Your Message"
          value={message}
          onChangeText={setMessage}
        />
        <Button title="Submit" onPress={handleEnquirySubmit} />
      </View>
  
      
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20, backgroundColor: '#fff' },
  heroSection: { height: 150, backgroundColor: '#FF7E00', justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  heroText: { fontSize: 24, color: '#fff', fontWeight: 'bold' },
  trackingSection: { marginBottom: 20 },
  input: { borderWidth: 1, borderColor: '#2D7B30', borderRadius: 5, padding: 10, marginBottom: 15, backgroundColor: '#F0F0F0' },
  enquirySection: { padding: 20, borderColor: '#FF7E00', borderWidth: 1, borderRadius: 10 },
  enquiryTitle: { fontSize: 18, color: '#FF7E00', marginBottom: 10 }
});

export default TrackingScreen;
