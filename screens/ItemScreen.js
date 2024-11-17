import React, { useState } from 'react';
import {
    View,
    Text,
    Image,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    Alert,
    ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const addToCart = async (id) => {
    let itemArray = await AsyncStorage.getItem('cartItem');
    itemArray = JSON.parse(itemArray) || []; // Initialize as an empty array if null

    if (itemArray) {
        let array = itemArray;

        // Add the new id to the array
        array.push(id);

        try {
            // Save the updated array back to AsyncStorage
            await AsyncStorage.setItem('cartItem', JSON.stringify(array));
            Alert.alert('Item Added To Cart', JSON.stringify(array, null, 2));
        } catch (error) {
            console.error('Error saving cart items:', error);
        }
    } else {
        let array = [];
        array.push(id);
        try {
            await AsyncStorage.setItem('cartItem', JSON.stringify(array));
            Alert.alert('Item Added To Cart');
        } catch (error) {
            console.error('Error saving cart items:', error);
        }
    }
};

const ItemScreen = ({ route }) => {
    const navigation = useNavigation();
    const { product } = route.params;
    const [quantity, setQuantity] = useState(1); // Manage quantity

    const handleAddToCart = (itemId) => {
        addToCart(itemId);
        navigation.navigate('Cart');
    };

    const renderMeasurementCard = ({ item }) => (
        <View style={styles.measurementCard}>
            <Image source={{ uri: item.imageUrl }} style={styles.measurementImage} />
            <View style={styles.measurementDetails}>
                <Text style={styles.measurementName}>{item.name}</Text>
                <Text style={styles.measurementPrice}>₦{item.price}</Text>
            </View>
            <TouchableOpacity
                style={styles.addToCartButton}
                onPress={() => handleAddToCart(item._id)}
            >
                <Text style={styles.addToCartText}>Add to Cart</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <ScrollView style={styles.container}>
            {/* Top Bar */}
            <View style={styles.topBar}>
                <Text style={styles.topBarText}>{product.title}</Text>
            </View>

            {/* Product Image Section */}
            <View style={styles.imageSection}>
                <Image source={{ uri: product.imageUrl }} style={styles.productImage} />
                <TouchableOpacity style={styles.wishlistButton}>
                    <Text style={styles.wishlistText}>Add to Wishlist</Text>
                </TouchableOpacity>
            </View>

            {/* Product Details Section */}
            <View style={styles.detailsSection}>
                <Text style={styles.price}>₦{product.price}</Text>
                <Text style={styles.description}>{product.description}</Text>
                <Text style={styles.rating}>⭐⭐⭐⭐⭐ (5.0)</Text>
            </View>

            {/* Measurements Section */}
            <View style={styles.measurementsSection}>
                <Text style={styles.measurementsTitle}>Buying Options</Text>
                <FlatList
                    data={product.measurements}
                    renderItem={renderMeasurementCard}
                    keyExtractor={(item) => item._id}
                    showsVerticalScrollIndicator={false}
                />
            </View>

            {/* Bottom Bar */}
            <View style={styles.bottomBar}>
                <Text style={styles.totalPrice}>Total: ₦{product.price * quantity}</Text>

                <View style={styles.quantitySection}>
                    <TouchableOpacity
                        onPress={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
                        style={styles.quantityButton}
                    >
                        <Text style={styles.quantityText}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.quantityValue}>{quantity}</Text>
                    <TouchableOpacity
                        onPress={() => setQuantity(quantity + 1)}
                        style={styles.quantityButton}
                    >
                        <Text style={styles.quantityText}>+</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.cartButton} onPress={() => handleAddToCart(product._id)}>
                    <Text style={styles.cartButtonText}>Add to Cart</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
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
        padding: 20,
    },
    productImage: {
        width: 200,
        height: 200,
        borderRadius: 10,
    },
    wishlistButton: {
        marginTop: 10,
        backgroundColor: '#FF7E00',
        padding: 8,
        borderRadius: 5,
    },
    wishlistText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    detailsSection: {
        paddingHorizontal: 20,
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
    bottomBar: {
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
    },
    cartButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default ItemScreen;
