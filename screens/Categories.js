import React from 'react';
import { View, Text, TextInput, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CategoriesScreen = () => {
  // Dummy data for categories
  const categories = [
    { id: '1', title: 'Fruits' },
    { id: '2', title: 'Vegetables' },
    { id: '3', title: 'Snacks' },
    { id: '4', title: 'Beverages' },
    { id: '5', title: 'Dairy' },
  ];

  // Dummy data for recommended products
  const products = [
    { id: '1', image: require('../assets/a1.jpeg') },
    { id: '2', image: require('../assets/a2.jpeg') },
    { id: '3', image: require('../assets/a3.jpeg') },
    { id: '4', image: require('../assets/a4.jpeg') },
    { id: '5', image: require('../assets/a5.jpeg') },
    { id: '6', image: require('../assets/a6.jpeg') },
    { id: '7', image: require('../assets/a7.jpeg') },
    { id: '8', image: require('../assets/a8.jpg') },
    { id: '9', image: require('../assets/a9.jpg') },
  ];

  // Render category item
  const renderCategory = ({ item }) => (
    <TouchableOpacity style={styles.categoryItem}>
      <Text style={styles.categoryText}>{item.title}</Text>
    </TouchableOpacity>
  );

  // Render product item
  const renderProduct = ({ item }) => (
    <View style={styles.productItem}>
      <Image source={item.image} style={styles.productImage} />
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Search form and chat icon */}
      <View style={styles.topSection}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search categories..."
        />
        <Ionicons name="chatbubble-outline" size={24} color="green" />
      </View>
      <View style={styles.divider} />

      {/* Categories and Recommended Products */}
      <View style={styles.mainSection}>
        {/* Categories on the left */}
        <View style={styles.categoryList}>
          <FlatList
            data={categories}
            renderItem={renderCategory}
            keyExtractor={(item) => item.id}
          />
        </View>

        {/* Recommended products on the right */}
        <FlatList
          data={products}
          renderItem={renderProduct}
          keyExtractor={(item) => item.id}
          numColumns={3}
          columnWrapperStyle={styles.productRow}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    height: 35,
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 10,
    borderRadius: 8,
    marginRight: 10,
  },
  divider: {
    height: 2,
    backgroundColor: '#FF7E00', // Amber color rule
    marginVertical: 10,
  },
  mainSection: {
    flexDirection: 'row',
    flex: 1,
  },
  categoryList: {
    width: '30%',
    backgroundColor: '#D3D3D3', // Gray background for categories
    padding: 10,
  },
  categoryItem: {
    backgroundColor: '#D3D3D3',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
  },
  categoryText: {
    color: '#000',
    fontWeight: 'bold',
  },
  productRow: {
    justifyContent: 'space-between',
  },
  productItem: {
    width: '30%',
    backgroundColor: '#fff',
    marginBottom: 10,
    alignItems: 'center',
  },
  productImage: {
    width: '100%',
    height: 100,
    borderRadius: 8,
  },
});

export default CategoriesScreen;
