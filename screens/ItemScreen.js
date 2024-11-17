import React, { useState } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const addToCart = async (id, navigation) => {
    let itemArray = await AsyncStorage.getItem('cartItem');
    itemArray = JSON.parse(itemArray) || []; // Initialize as an empty array if null

    console.log('Initial cart items:', itemArray); // Log the current items in the cart

    if (itemArray) {
        let array = itemArray;

        // Add the new id to the array
        array.push(id);

        console.log('Updated cart items:', array); // Log the updated array

        try {
            // Save the updated array back to AsyncStorage
            await AsyncStorage.setItem('cartItem', JSON.stringify(array));

            // Notify the user
            Alert.alert('Item Added To Cart', JSON.stringify(array, null, 2));

            console.log('Final cart items:', array); // Log the final array after storing

            // Navigate to the Cart screen
            navigation.navigate('Cart');
        } catch (error) {
            console.error('Error saving cart items:', error); // Log any error
            return error;
        }
    } else {
        let array = [];
        array.push(id);
        try {
            await AsyncStorage.setItem('cart', JSON.stringify(array));
            Alert.alert("Item Added To Cart");
            console.log(array);

            // Navigate to the Cart screen
            navigation.navigate('Cart');
        } catch (error) {
            return error;
        }
    }
};

const ItemScreen = ({ route }) => {
    const { product } = route.params;
    const navigation = useNavigation();

    const renderMeasurementCard = ({ item }) => (
        <View style={styles.measurementCard}>
            <Image source={{ uri: item.imageUrl }} style={styles.measurementImage} />
            <View style={styles.measurementDetails}>
                <Text style={styles.measurementName}>{item.name}</Text>
                <Text style={styles.measurementPrice}>₦{item.price}</Text>
            </View>
            <TouchableOpacity
                style={styles.addToCartButton}
                onPress={() => addToCart(item._id, navigation)}
            >
                <Text style={styles.addToCartText}>Add to Cart</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            {/* Top Bar */}
            <View style={styles.topBar}>
                <Text style={styles.topBarText}>{product.title}</Text>
            </View>

            {/* Product Image */}
            <View style={styles.imageSection}>
                <Image source={{ uri: product.imageUrl }} style={styles.productImage} />
            </View>

            {/* Product Details */}
            <View style={styles.detailsSection}>
                <Text style={styles.description}>{product.description}</Text>
            </View>

            {/* Buying Options */}
            <View style={styles.measurementsSection}>
                <Text style={styles.measurementsTitle}>Buying Options</Text>
                <FlatList
                    data={product.measurements}
                    renderItem={renderMeasurementCard}
                    keyExtractor={(item) => item._id}
                    showsVerticalScrollIndicator={false}
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
    topBar: {
        height: 40,
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
        alignItems: 'center',
        marginVertical: 10,
    },
    productImage: {
        width: '90%',
        height: 200,
        borderRadius: 10,
    },
    detailsSection: {
        padding: 15,
    },
    description: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
    },
    measurementsSection: {
        paddingHorizontal: 15,
        marginTop: 10,
    },
    measurementsTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'green',
        marginBottom: 10,
    },
    measurementCard: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        padding: 10,
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd',
        height: 60,
    },
    measurementImage: {
        width: 40,
        height: 40,
        borderRadius: 5,
    },
    measurementDetails: {
        flex: 1,
        marginLeft: 10,
    },
    measurementName: {
        fontSize: 12,
        color: '#333',
    },
    measurementPrice: {
        fontSize: 12,
        fontWeight: 'bold',
        color: 'green',
    },
    addToCartButton: {
        backgroundColor: '#2D7B30',
        padding: 8,
        borderRadius: 5,
    },
    addToCartText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
    },
});

export default ItemScreen;
