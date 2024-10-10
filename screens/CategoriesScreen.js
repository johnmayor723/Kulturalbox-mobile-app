import React from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';

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
];

const CategoriesScreen = () => {
    return (
        <ScrollView style={styles.container}>
            {/* Search and Chat Section */}
            <View style={styles.searchContainer}>
                <TextInput placeholder="Search" style={styles.searchInput} />
                <TouchableOpacity style={styles.chatIcon}>
                    <Text>Chat</Text>
                </TouchableOpacity>
            </View>

            {/* Divider */}
            <View style={styles.horizontalLine}></View>

            {/* Header Section */}
            <View style={styles.headerSection}>
                <Text style={styles.headerTitle}>Categories</Text>
                <Text style={styles.headerTitle}>Recommended Products</Text>
            </View>

            {/* Categories and Recommended Products */}
            <View style={styles.contentSection}>
                {/* Categories */}
                <View style={styles.categoriesContainer}>
                    {categories.map((category, index) => (
                        <TouchableOpacity key={index} style={styles.categoryBox}>
                            <Text>{category}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Recommended Products */}
                <FlatList
                    data={recommendedProducts}
                    keyExtractor={(item) => item.id}
                    numColumns={3}
                    renderItem={({ item }) => (
                        <View style={styles.productCard}>
                            <TouchableOpacity>
                                <Image source={item.image} style={styles.productImage} />
                                <Text style={styles.productTitle}>{item.name}</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        backgroundColor: '#fff',
        borderBottomColor: 'grey',
        borderBottomWidth: 1,
        marginBottom: 10, // Small space between search form and horizontal line
    },
    searchInput: {
        flex: 1,
        height: 35,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingLeft: 10,
    },
    chatIcon: {
        marginLeft: 10,
    },
    horizontalLine: {
        height: 2,
        backgroundColor: 'grey',
        marginBottom: 10,
    },
    headerSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    contentSection: {
        flexDirection: 'row',
    },
    categoriesContainer: {
        width: '25%',
        padding: 10,
        backgroundColor: '#f0f0f0',
    },
    categoryBox: {
        padding: 10,
        backgroundColor: '#ddd',
        marginBottom: 10,
    },
    productCard: {
        width: '30%',
        margin: 5,
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 5,
        elevation: 2, // For shadow on Android
    },
    productImage: {
        width: 80,
        height: 80,
        marginBottom: 5,
    },
    productTitle: {
        fontSize: 14,
        textAlign: 'center',
    },
});

export default CategoriesScreen;
