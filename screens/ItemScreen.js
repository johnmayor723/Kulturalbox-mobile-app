import React, { useState } from 'react';
import { View, Text, Image, Button, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

// Dummy products for "You may also like" section
const dummyProducts = [
  { id: '1', name: 'Organic Bananas', price: 3.99, imageUrl: 'https://example.com/images/bananas.jpg' },
  { id: '2', name: 'Fresh Strawberries', price: 5.99, imageUrl: 'https://example.com/images/strawberries.jpg' },
  { id: '3', name: 'Almond Milk', price: 4.99, imageUrl: 'https://example.com/images/almond_milk.jpg' },
];

const ItemScreen = () => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [totalPrice, setTotalPrice] = useState(12.99); // Placeholder for item price
  const navigation = useNavigation();

  const handleAddToWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  const handleAddToCart = () => {
    // Handle add to cart logic
    console.log("Item added to cart");
  };

  const handleBuyNow = () => {
    // Handle buy now logic
    console.log("Proceed to buy");
  };

  const handleViewCart = () => {
    // Navigate to the CartScreen
    navigation.navigate('Cart');
  };

  return (
    <View style={styles.container}>
      {/* Fixed Top Bar */}
      <View style={styles.topBar}>
        <Text style={styles.topBarText}>Item Details</Text>
      </View>

      {/* Full-width Image Section */}
      <View style={styles.imageSection}>
        <Image 
          source={{ uri: 'https://example.com/images/sample_item.jpg' }} 
          style={styles.productImage} 
        />
        <TouchableOpacity style={styles.wishlistButton} onPress={handleAddToWishlist}>
          <Ionicons 
            name={isWishlisted ? 'heart' : 'heart-outline'} 
            size={28} 
            color={isWishlisted ? 'red' : 'white'} 
          />
        </TouchableOpacity>
      </View>

      {/* Product Details Section */}
      <View style={styles.detailsSection}>
        <Text style={styles.price}>$12.99</Text> {/* Placeholder for price */}
        <Text style={styles.description}>
          Fresh organic apples directly from the farm, free from pesticides and naturally grown.
        </Text>
        {/* Product Rating */}
        <View style={styles.rating}>
          <Ionicons name="star" size={20} color="#FF7E00" />
          <Ionicons name="star" size={20} color="#FF7E00" />
          <Ionicons name="star" size={20} color="#FF7E00" />
          <Ionicons name="star" size={20} color="#FF7E00" />
          <Ionicons name="star-half" size={20} color="#FF7E00" />
          <Text style={styles.ratingText}>4.5</Text>
        </View>
      </View>

      {/* Products You May Like Section */}
      <View style={styles.featuredSection}>
        <Text style={styles.featuredTitle}>Products You May Like</Text>
        <FlatList
          horizontal
          data={dummyProducts}
          renderItem={({ item }) => (
            <View style={styles.productCard}>
              <Image source={{ uri: item.imageUrl }} style={styles.productCardImage} />
              <Text style={styles.productCardName}>{item.name}</Text>
              <Text style={styles.productCardPrice}>${item.price}</Text>
            </View>
          )}
          keyExtractor={item => item.id}
        />
      </View>

      {/* Fixed Bottom Bar */}
      <View style={styles.bottomBar}>
        <Text style={styles.totalPrice}>Total: ${totalPrice.toFixed(2)}</Text>
        <View style={styles.bottomBarButtons}>
          <Button title="Add to Cart" onPress={handleAddToCart} color="#FF7E00" />
          <Button title="Buy Now" onPress={handleBuyNow} color="green" />
        </View>
        {/* View Cart Icon */}
        <TouchableOpacity onPress={handleViewCart} style={styles.viewCartButton}>
          <Ionicons name="cart" size={30} color="green" />
          <Text style={styles.viewCartText}>View Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topBar: {
    height: 50,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
  },
  topBarText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  imageSection: {
    position: 'relative',
  },
  productImage: {
    width: '100%',
    height: 250,
  },
  wishlistButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#00000080',
    padding: 10,
    borderRadius: 30,
  },
  detailsSection: {
    padding: 15,
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'green',
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginVertical: 10,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 5,
    fontSize: 16,
    color: '#FF7E00',
  },
  featuredSection: {
    marginTop: 20,
  },
  featuredTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'green',
  },
  productCard: {
    width: 150,
    padding: 10,
    alignItems: 'center',
  },
  productCardImage: {
    width: 100,
    height: 100,
    marginBottom: 5,
  },
  productCardName: {
    fontSize: 14,
    color: '#333',
  },
  productCardPrice: {
    fontSize: 14,
    color: '#FF7E00',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalPrice: {
    fontSize: 18,
    color: 'green',
  },
  bottomBarButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  viewCartButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewCartText: {
    marginLeft: 5,
    fontSize: 16,
    color: 'green',
  },
});

export default ItemScreen;
