import React, { useState } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

const recommendedProducts = [
    { id: '1', title: 'Carrots', price: '200', image: require('../assets/a3.jpeg') },
    { id: '2', title: 'Cabbage', price: '300', image: require('../assets/a4.jpeg') },
    { id: '3', title: 'Onions', price: '100', image: require('../assets/a6.jpeg') },
];

const ItemScreen = ({ route }) => {
    const { product } = route.params;
    const [quantity, setQuantity] = useState(1); // Manage quantity

    const handlePay = () => {
        Alert.alert("Make Payment", `Proceed to pay ₦${product.price}`);
    };

    const handleAddToCart = async () => {
        try {
            await axios.post(`https://pantry-hub-server.onrender.com/api/carts/${product.id}`, {
                productId: product.id,
                quantity: quantity,
            });
            Alert.alert("Success", "Product added to cart!");
        } catch (error) {
            console.error(error);
            Alert.alert("Error", "Failed to add product to cart");
        }
    };

    const renderRecommendedItem = ({ item }) => (
        <View style={styles.recommendedCard}>
            <Image source={item.image} style={styles.recommendedImage} />
            <Text style={styles.recommendedTitle}>{item.title}</Text>
            <Text style={styles.recommendedPrice}>₦{item.price}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            {/* Fixed Top Bar */}
            <View style={styles.topBar}>
                <Text style={styles.topBarText}>{product.title}</Text>
            </View>

            {/* Product Image with Add to Wishlist button */}
            <View style={styles.imageSection}>
                <Image source={{ uri: product.image }} style={styles.productImage} />
                <TouchableOpacity style={styles.wishlistButton}>
                    <Text style={styles.wishlistText}>Add to Wishlist</Text>
                </TouchableOpacity>
            </View>

            {/* Product Details */}
            <View style={styles.detailsSection}>
                <Text style={styles.price}>₦{product.price}</Text>
                <Text style={styles.description}>
                    This is the detailed description of the product {product.title}. You can later replace this with dynamic content from your backend.
                </Text>
                <Text style={styles.rating}>⭐⭐⭐⭐⭐ (5.0)</Text>
            </View>

            {/* Products You May Like */}
            <View style={styles.recommendedSection}>
                <Text style={styles.recommendedTitle}>Products You May Like</Text>
                <FlatList
                    data={recommendedProducts}
                    renderItem={renderRecommendedItem}
                    keyExtractor={item => item.id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                />
            </View>

            {/* Fixed Bottom Bar */}
            <View style={styles.bottomBar}>
                <Text style={styles.totalPrice}>Total: ₦{product.price}</Text>

                {/* Quantity Management */}
                <View style={styles.quantitySection}>
                    <TouchableOpacity onPress={() => setQuantity(quantity > 1 ? quantity - 1 : 1)} style={styles.quantityButton}>
                        <Text style={styles.quantityText}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.quantityValue}>{quantity}</Text>
                    <TouchableOpacity onPress={() => setQuantity(quantity + 1)} style={styles.quantityButton}>
                        <Text style={styles.quantityText}>+</Text>
                    </TouchableOpacity>
                </View>

                {/* Add to Cart Button */}
                <TouchableOpacity style={styles.cartButton} onPress={handleAddToCart}>
                    <Text style={styles.cartButtonText}>Add to Cart</Text>
                </TouchableOpacity>

                {/* Buy Now Button */}
                <TouchableOpacity style={styles.buyButton} onPress={handlePay}>
                    <Text style={styles.buyButtonText}>Buy Now</Text>
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
        backgroundColor: '#FF7E00',
        padding: 8,
        borderRadius: 5,
    },
    wishlistText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    detailsSection: {
        padding: 20,
    },
    price: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'green',
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        color: '#666',
        marginBottom: 10,
    },
    rating: {
        fontSize: 16,
        color: '#FFD700',
    },
    recommendedSection: {
        paddingHorizontal: 20,
        paddingBottom: 120, // Extra space to accommodate the fixed bottom bar
    },
    recommendedTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: 'green',
    },
    recommendedCard: {
        marginRight: 10,
        width: 120,
        alignItems: 'center',
    },
    recommendedImage: {
        width: 100,
        height: 100,
        borderRadius: 8,
    },
    recommendedPrice: {
        marginTop: 5,
        color: 'green',
    },
    bottomBar: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderColor: '#ccc',
    },
    totalPrice: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'green',
    },
    quantitySection: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    quantityButton: {
        backgroundColor: '#FF7E00',
        padding: 10,
        borderRadius: 5,
        marginHorizontal: 5,
    },
    quantityText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    quantityValue: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    cartButton: {
        backgroundColor: '#2D7B30',
        padding: 10,
        borderRadius: 5,
        marginRight: 10,
    },
    cartButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    buyButton: {
        backgroundColor: '#FF7E00',
        padding: 10,
        borderRadius: 5,
    },
    buyButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default ItemScreen;
