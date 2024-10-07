import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';

// Dummy product data
const dummyProducts = [
    { id: '1', title: 'Apple', price: '500', image: require('../assets/a1.jpeg') },
    { id: '2', title: 'Tomato', price: '200', image: require('../assets/a2.jpeg') },
    { id: '3', title: 'Pepper', price: '800', image: require('../assets/a3.jpeg') },
    { id: '4', title: 'Ugu', price: '300', image: require('../assets/a4.jpeg') },
    { id: '5', title: 'Beef', price: '1000', image: require('../assets/a5.jpeg') },
    { id: '6', title: 'Onions', price: '400', image: require('../assets/a6.jpeg') },
    { id: '7', title: 'Ponmo', price: '600', image: require('../assets/a7.jpeg') },
    { id: '8', title: 'Tete', price: '700', image: require('../assets/a8.jpg') },
    { id: '9', title: 'Beans', price: '900', image: require('../assets/a9.jpg') },
    { id: '10', title: 'Yam', price: '150', image: require('../assets/a10.jpg') }
];

// Categories Data
const categories = [
    { id: '1', title: 'Fruits', icon: '🍏' },
    { id: '2', title: 'Vegetables', icon: '🥕' },
    { id: '3', title: 'Meat', icon: '🍗' },
    { id: '4', title: 'Dairy', icon: '🥛' },
];

const HomeScreen = () => {
    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <Image source={item.image} style={styles.cardImage} />
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardPrice}>₦{item.price}</Text>
            <TouchableOpacity style={styles.addButton}>
                <Text style={styles.buttonText}>Add to Cart</Text>
            </TouchableOpacity>
        </View>
    );

    const renderCategory = ({ item }) => (
        <TouchableOpacity style={styles.categoryButton}>
            <Text style={styles.categoryIcon}>{item.icon}</Text>
            <Text style={styles.categoryText}>{item.title}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            {/* Hero Section */}
            <View style={styles.heroSection}>
                <Text style={styles.heroText}>Welcome to PantryHub</Text>
                <Image source={require('../assets/hero.jpeg')} style={styles.heroImage} />
            </View>

            {/* Categories Section */}
            <FlatList
                data={categories}
                renderItem={renderCategory}
                keyExtractor={item => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.categoriesContainer}
            />

            {/* Featured Section */}
            <Text style={styles.featuredTitle}>Featured Products</Text>

            {/* Products Section */}
            <FlatList
                data={dummyProducts}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                numColumns={2}
                columnWrapperStyle={styles.row}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        padding: 16,
    },
    heroSection: {
        alignItems: 'center',
        marginBottom: 16,
    },
    heroText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2D7B30',
        marginBottom: 8,
    },
    heroImage: {
        width: '100%',
        height: 170,
        borderRadius: 10,
    },
    categoriesContainer: {
        paddingVertical: 10,
    },
    categoryButton: {
        backgroundColor: '#F0F0F0',
        borderRadius: 15,
        padding: 10,
        marginRight: 10,
        alignItems: 'center',
        width: 80,
    },
    categoryIcon: {
        fontSize: 24,
    },
    categoryText: {
        marginTop: 5,
        textAlign: 'center',
    },
    featuredTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#2D7B30',
        textAlign: 'center',
        marginVertical: 10,
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        padding: 10,
        margin: 5,
        elevation: 3,
        width: '48%', // Each card takes up almost half the width
    },
    cardImage: {
        width: '100%',
        height: 100,
        borderRadius: 10,
    },
    cardTitle: {
        fontWeight: 'bold',
        marginVertical: 5,
    },
    cardPrice: {
        color: '#2D7B30',
    },
    addButton: {
        backgroundColor: '#2D7B30',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 5,
    },
    buttonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    row: {
        justifyContent: 'space-between',
    },
});

export default HomeScreen;
