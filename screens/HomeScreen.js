import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Dummy categories and products with local images from the assets folder
const dummyCategories = ['Fruits', 'Vegetables', 'Dairy', 'Bakery', 'Beverages'];
const dummyProducts = [
    { id: '1', title: 'Apple', price: '500', image: require('../assets/a1.jpeg') },
    { id: '2', title: 'Tomato', price: '200', image: require('../assets/a2.jpeg') },
    { id: '3', title: 'Pepper', price: '800', image: require('../assets/a3.jpeg') },
    { id: '4', title: 'Ugu', price: '300', image: require('../assets/a4.jpeg') },
    { id: '5', title: 'Beef', price: '1000', image: require('../assets/a5.jpeg') },
    { id: '6', title: 'Onions', price: '400', image: require('../assets/a6.jpeg') },
    { id: '7', title: 'Ponmo', price: '600', image: require('../assets/a7.jpeg') },
    { id: '8', title: 'Tete', price: '700', image: require('../assets/a8.jpg') },
    { id: '9', title: 'beans', price: '900', image: require('../assets/a9.jpg') },
    { id: '10', title: 'yam', price: '150', image: require('../assets/a10.jpg') }
];

const HomeScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            {/* Top Bar */}
            <View style={styles.topBar}>
                {/* Replace Ionicons logo with the brand logo */}
                <Image source={require('../assets/Logo1.jpg')} style={styles.logo} />
                <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
                    <Ionicons name="menu" size={30} color="black" />
                </TouchableOpacity>
            </View>

            {/* Featured Title */}
            <Text style={styles.featuredTitle}>Featured</Text>

            {/* Categories Section */}
            <View style={styles.categoriesContainer}>
                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={dummyCategories}
                    keyExtractor={(item) => item}
                    renderItem={({ item }) => (
                        <View style={styles.categoryCard}>
                            <Text style={styles.categoryText}>{item}</Text>
                        </View>
                    )}
                />
            </View>

            {/* Products Section */}
            <FlatList
                data={dummyProducts}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.productCard}>
                        <Image source={item.image} style={styles.productImage} />
                        <Text style={styles.productTitle}>{item.title}</Text>
                        <Text style={styles.productPrice}>₦{item.price}</Text>
                        <TouchableOpacity style={styles.addToCartButton}>
                            <Text style={styles.addToCartText}>Add to Cart</Text>
                        </TouchableOpacity>
                    </View>
                )}
                contentContainerStyle={styles.productList}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        paddingTop: 50,
    },
    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: '#fff',
        elevation: 5,
    },
    logo: {
        width: 100,
        height: 50,
        resizeMode: 'contain',
    },
    featuredTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 15,
        marginLeft: 15,
        color: '#333',
    },
    categoriesContainer: {
        height: 50,
        marginBottom: 20,
    },
    categoryCard: {
        backgroundColor: '#e0e0e0',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 20,
        marginHorizontal: 10,
    },
    categoryText: {
        fontSize: 16,
        color: '#333',
    },
    productList: {
        paddingHorizontal: 15,
    },
    productCard: {
        backgroundColor: '#fff',
        borderRadius: 10,
        marginBottom: 20,
        padding: 15,
        elevation: 3,
        alignItems: 'center',
    },
    productImage: {
        width: 100,
        height: 100,
        marginBottom: 10,
    },
    productTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    productPrice: {
        fontSize: 16,
        color: '#666',
        marginVertical: 5,
    },
    addToCartButton: {
        backgroundColor: '#1E90FF',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    addToCartText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default HomeScreen;
