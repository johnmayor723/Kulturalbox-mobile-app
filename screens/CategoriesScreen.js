import React from 'react';
import { View, Text, TextInput, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';

const categories = ['Fruits', 'Vegetables', 'Dairy', 'Meat', 'Snacks'];

const recommendedProducts = [
  { id: '1', name: 'Product 1', image: require('../assets/a1.jpeg') },
  { id: '2', name: 'Product 2', image: require('../assets/a2.jpeg') },
  { id: '3', name: 'Product 3', image: require('../assets/a3.jpeg') },
  { id: '4', name: 'Product 4', image: require('../assets/a4.jpeg') },
  { id: '5', name: 'Product 5', image: require('../assets/a5.jpeg') },
  { id: '6', name: 'Product 6', image: require('../assets/a6.jpeg') },
  { id: '7', name: 'Product 7', image: require('../assets/a7.jpeg') },
  { id: '8', name: 'Product 8', image: require('../assets/a8.jpg') },
  { id: '9', name: 'Product 9', image: require('../assets/a9.jpg') },
  { id: '10', name: 'Product 10', image: require('../assets/a10.jpg') },
];

const CategoriesScreen = ({ navigation }) => {

  const renderCategory = (category) => (
    <TouchableOpacity style={styles.categoryBox}>
      <Text style={styles.categoryText}>{category.item}</Text>
    </TouchableOpacity>
  );

  const renderProduct = ({ item }) => (
    <View style={styles.productCard}>
      <TouchableOpacity onPress={() => navigation.navigate('Single Product')}>
        <Image source={item.image} style={styles.productImage} />
        <Text style={styles.productTitle}>{item.name}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Search Section */}
      <View style={styles.searchSection}>
        <TextInput style={styles.searchInput} placeholder="Search" />
        <TouchableOpacity>
          <Text style={styles.chatIcon}>💬</Text>
        </TouchableOpacity>
      </View>

      {/* Horizontal Line */}
      <View style={styles.horizontalLine} />

      {/* Categories Header Section */}
      <View style={styles.headerSection}>
        <Text style={styles.categoriesHeader}>Categories</Text>
      </View>

      {/* Categories and Recommended Products Section */}
      <View style={styles.contentSection}>
        {/* Categories Section */}
        <View style={styles.categoriesContainer}>
          <FlatList
            data={categories}
            renderItem={renderCategory}
            keyExtractor={(item) => item}
          />
        </View>

        {/* Recommended Products Section */}
        <View style={styles.productsContainer}>
          <Text style={styles.productsHeader}>Recommended Products</Text>
          <FlatList
            data={recommendedProducts}
            renderItem={renderProduct}
            keyExtractor={(item) => item.id}
            numColumns={3}  // Display 3 products per row
            contentContainerStyle={styles.productsGrid}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    marginBottom: 5,  // Added space between the search form and horizontal line
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 8,
  },
  chatIcon: {
    marginLeft: 10,
    fontSize: 20,
  },
  horizontalLine: {
    height: 1,
    backgroundColor: 'gray',
    marginBottom: 5, // Reduced margin here
  },
  headerSection: {
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  categoriesHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF7E00',  // Amber color for the header
  },
  contentSection: {
    flexDirection: 'row',
    flex: 1,
  },
  categoriesContainer: {
    width: '30%',
    backgroundColor: '#f2f2f2',
    padding: 10,
  },
  categoryBox: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
    backgroundColor: '#d3d3d3', // Lighter gray background
    marginBottom: 10,
  },
  categoryText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#000',
  },
  productsContainer: {
    width: '70%',
    padding: 10,
  },
  productsHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF7E00',
    marginBottom: 10,
  },
  productsGrid: {
    justifyContent: 'space-between',
  },
  productCard: {
    flex: 1,
    marginBottom: 10,
    paddingHorizontal: 5,
  },
  productImage: {
    width: '100%',
    height: 100,
    resizeMode: 'cover',
  },
  productTitle: {
    textAlign: 'center',
    marginTop: 5,
    fontSize: 14,
  },
});

export default CategoriesScreen;
