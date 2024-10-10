import React from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Dummy data for categories and recommended products
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
    // Render individual product card
    const renderProduct = ({ item }) => {
        return (
            <View style={styles.productCard}>
                <TouchableOpacity onPress={() => navigation.navigate('Single Product', { productId: item.id })}>
                    <Image source={item.image} style={styles.productImage} />
                    <Text style={styles.productName}>{item.name}</Text>
                </TouchableOpacity>
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

            {/* Margin below the search form */}
            <View style={styles.marginBottom} />

            {/* Main Content Section with Categories and Recommended Products */}
            <View style={styles.contentSection}>
                <View style={styles.categoriesSection}>
                    {/* Categories Header */}
                    <Text style={styles.sectionTitle}>Categories</Text>

                    {/* Categories List */}
                    {categories.map((category, index) => (
                        <TouchableOpacity key={index} style={styles.categoryBox} onPress={() => {/* Navigate to category screen */}}>
                            <Text style={styles.categoryText}>{category}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Recommended Products Section */}
                <View style={styles.productsSection}>
                    <Text style={styles.sectionTitle}>Recommended Products</Text>
                    <FlatList
                        data={recommendedProducts}
                        renderItem={renderProduct}
                        keyExtractor={item => item.id}
                        numColumns={3}  // Set to 3 columns per row
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
        marginBottom: 10,
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
    marginBottom: {
        height: 10, // Small margin below the search form
    },
    contentSection: {
        flex: 1,
        flexDirection: 'row',  // Row to align categories and recommended products
        backgroundColor: 'white',
    },
    categoriesSection: {
        width: '30%',  // Categories take 30% of the screen width
        backgroundColor: '#F0F0F0',  // Light gray background for categories
        padding: 10,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
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
        width: '70%',  // Recommended products take 70% of the screen width
        padding: 10,
    },
    productRow: {
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    productCard: {
        width: '30%',  // Adjusted for 3 columns
        alignItems: 'center',
        marginBottom: 10,
    },
    productImage: {
        width: '100%',
        height: 100,
        resizeMode: 'cover',
    },
    productName: {
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 5,
        color: '#333',
    },
});

export default CategoriesScreen;
