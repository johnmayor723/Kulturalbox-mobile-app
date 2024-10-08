import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';

const CartScreen = ({ navigation }) => {
  const [cartItems] = useState([
    { id: 1, name: 'Apples', price: 2.99, quantity: 2 },
    { id: 2, name: 'Bananas', price: 1.99, quantity: 5 }
  ]);
  
  const totalAmount = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  const handleCheckout = () => {
    navigation.navigate('Payment');
  };
  
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.heroSection}>
        <Text style={styles.heroText}>Your Cart</Text>
      </View>
      
      <View style={styles.cartItemsSection}>
        {cartItems.map(item => (
          <View key={item.id} style={styles.cartItem}>
            <Text>{item.name} x{item.quantity}</Text>
            <Text>${(item.price * item.quantity).toFixed(2)}</Text>
          </View>
        ))}
      </View>

      <View style={styles.totalSection}>
        <Text style={styles.totalText}>Total: ${totalAmount.toFixed(2)}</Text>
        <Button title="Proceed to Payment" onPress={handleCheckout} />
      </View>

      {/* Enquiry Section */}
      <View style={styles.enquirySection}>
        <Text style={styles.enquiryTitle}>Have a question? Send us a message</Text>
        {/* Add your form here like in the contact screen */}
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
  cartItemsSection: { marginBottom: 20 },
  cartItem: { flexDirection: 'row', justifyContent: 'space-between', padding: 10, borderBottomWidth: 1, borderColor: '#ccc' },
  totalSection: { padding: 20 },
  totalText: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  enquirySection: { padding: 20, borderColor: '#FF7E00', borderWidth: 1, borderRadius: 10 },
  enquiryTitle: { fontSize: 18, color: '#FF7E00', marginBottom: 10 }
});

export default CartScreen;
