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
import React from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';

// Dummy data for categories and recommended products
const categories = ['Fruits', 'Vegetables', 'Dairy', 'Meat', 'Snacks'];
const recommendedProducts = [
    { id: '1', name: 'Product 1', price: '$10', stock: 'In Stock', rating: 4.5, image: require('../assets/a1.jpeg') },
    { id: '2', name: 'Product 2', price: '$15', stock: 'In Stock', rating: 4.0, image: require('../assets/a2.jpeg') },
    { id: '3', name: 'Product 3', price: '$12', stock: 'Out of Stock', rating: 4.8, image: require('../assets/a3.jpeg') },
    { id: '4', name: 'Product 4', price: '$20', stock: 'In Stock', rating: 4.3, image: require('../assets/a4.jpeg') },
    { id: '5', name: 'Product 5', price: '$25', stock: 'In Stock', rating: 4.6, image: require('../assets/a5.jpeg') },
];

const CategoriesScreen = ({ navigation }) => {
    // Render individual product card
    const renderProduct = ({ item }) => {
        return (
            <View style={styles.productCard}>
                <TouchableOpacity onPress={() => navigation.navigate('Single Product', { productId: item.id })}>
                    <Image source={item.image} style={styles.productImage} />
                </TouchableOpacity>
                <View style={styles.productInfo}>
                    <Text style={styles.productName}>{item.name}</Text>
                    <Text style={styles.productPrice}>{item.price}</Text>
                    <Text style={styles.productStock}>{item.stock}</Text>
                    <View style={styles.productRatings}>
                        <FontAwesome name="star" size={14} color="#FF7E00" />
                        <Text>{item.rating}</Text>
                    </View>
                    <View style={styles.productActions}>
                        <TouchableOpacity>
                            <Ionicons name="heart-outline" size={24} color="gray" style={styles.wishlistIcon} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.addToCartButton}>
                            <Text style={styles.addToCartText}>Add to Cart</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            {/* Upper Section with Search and Chat */}
            <View style={styles.searchSection}>
                <TextInput
                    placeholder="Search for products..."
                    style={styles.searchInput}
                />
                <Ionicons name="chatbubble-ellipses-outline" size={24} color="gray" style={styles.chatIcon} />
            </View>

            {/* Categories Section */}
            <View style={styles.contentSection}>
                <View style={styles.categoriesSection}>
                    {categories.map((category, index) => (
                        <View key={index} style={styles.categoryBox}>
                            <Text style={styles.categoryText}>{category}</Text>
                        </View>
                    ))}
                </View>

                {/* Recommended Products Section */}
                <View style={styles.productsSection}>
                    <Text style={styles.productsHeader}>Recommended Products</Text>
                    <FlatList
                        data={recommendedProducts}
                        renderItem={renderProduct}
                        keyExtractor={item => item.id}
                        numColumns={3}
                        columnWrapperStyle={styles.productRow}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    searchSection: {
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#D3D3D3', // Gray line
    },
    searchInput: {
        flex: 1,
        padding: 10,
        borderWidth: 1,
        borderColor: '#D3D3D3',
        borderRadius: 5,
        marginRight: 10,
    },
    chatIcon: {
        marginLeft: 10,
    },
    contentSection: {
        flexDirection: 'row',
        flex: 1,
        marginTop: 10,
    },
    categoriesSection: {
        width: '25%',
        backgroundColor: '#F0F0F0', // Light gray background
        padding: 10,
    },
    categoryBox: {
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: 'white',
    },
    categoryText: {
        fontSize: 16,
        color: '#333',
    },
    productsSection: {
        flex: 1,
        padding: 10,
    },
    productsHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    productRow: {
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    productCard: {
        width: '30%', // To display 3 per row
        backgroundColor: 'white',
        borderRadius: 8,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
        padding: 10,
    },
    productImage: {
        width: '100%',
        height: 100,
        resizeMode: 'cover',
    },
    productInfo: {
        marginTop: 10,
    },
    productName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    productPrice: {
        fontSize: 14,
        color: '#FF7E00',
    },
    productStock: {
        fontSize: 12,
        color: 'gray',
    },
    productRatings: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
    },
    productActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    wishlistIcon: {
        marginRight: 10,
    },
    addToCartButton: {
        backgroundColor: '#FF7E00',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    addToCartText: {
        color: 'white',
        fontSize: 14,
    },
});

export default CategoriesScreen;
