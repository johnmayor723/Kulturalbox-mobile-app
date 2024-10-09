import React from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';

const ItemScreen = ({ route }) => {
    const { product } = route.params;

    return (
        <View style={styles.container}>
            {/* Fixed Top Bar */}
            <View style={styles.topBar}>
                <Text style={styles.topBarText}>{product.title}</Text>
            </View>

            {/* Product Image */}
            <Image source={product.image} style={styles.productImage} />

            {/* Product Details */}
            <View style={styles.detailsSection}>
                <Text style={styles.price}>₦{product.price}</Text>
                <Text style={styles.description}>This is the detailed description of the product {product.title}.</Text>

                {/* Add to Cart / Buy Now buttons */}
                <View style={styles.buttonsSection}>
                    <Button title="Add to Cart" color="#FF7E00" onPress={() => alert('Added to cart')} />
                    <Button title="Buy Now" color="green" onPress={() => alert('Proceeding to buy')} />
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
    topBar: {
        height: 50,
        backgroundColor: 'green',
        justifyContent: 'center',
        alignItems: 'center',
    },
    topBarText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    productImage: {
        width: '100%',
        height: 250,
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
        marginBottom: 20,
    },
    buttonsSection: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
});

export default ItemScreen;
