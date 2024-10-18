import  React, {useState, useEffect} from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';


// Categories Data
const categories = [
    { id: '1', title: 'Fruits', icon: '🍏' },
    { id: '2', title: 'Vegetables', icon: '🥕' },
    { id: '3', title: 'Meat', icon: '🍗' },
    { id: '4', title: 'Dairy', icon: '🥛' },
];

const HomeScreen = () => {
    const navigation = useNavigation();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    // Render each product item
    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Single Product', { product: item })}>
            <Image source={item.image} style={styles.cardImage} />
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardPrice}>₦{item.price}</Text>
            <TouchableOpacity style={styles.addButton}>
                <Text style={styles.buttonText}>Add to Cart</Text>
            </TouchableOpacity>
        </TouchableOpacity>
    );


// fetching products 
  useEffect(() => {
    // Fetch products from the API
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://pantry-hub-server.onrender.com/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    );
  }

    // Render categories
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
                data={products}
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
    heroImage: {
        width: '100%',
        height: 150,
        borderRadius: 10,
    },
    categoriesContainer: {
        paddingVertical: 10,
    },
    categoryButton: {
        backgroundColor: '#F0F0F0',
        borderRadius: 15,
        padding: 8,
        marginRight: 10,
        alignItems: 'center',
        width: 80,
    },
    categoryIcon: {
        fontSize: 20,
    },
    categoryText: {
        marginTop: 3,
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
        width: '48%',
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
