import AsyncStorage from "@react-native-async-storage/async-storage";


//import AsyncStorage from '@react-native-async-storage/async-storage';

// Function to add an item to the cart
export const addToCart = async (item) => {
  try {
    // Retrieve the existing cart from AsyncStorage
    const cart = await AsyncStorage.getItem('cart');
    
    // Parse the cart or initialize an empty array if there is no cart yet
    let cartItems = cart ? JSON.parse(cart) : [];
    
    // Check if the item already exists in the cart
    const existingItemIndex = cartItems.findIndex(cartItem => cartItem.id === item.id);
    
    if (existingItemIndex !== -1) {
      // If the item exists, update the quantity
      cartItems[existingItemIndex].quantity += 1;
    } else {
      // If the item doesn't exist, add it with a quantity of 1
      cartItems.push({...item, quantity: 1});
    }
    
    // Save the updated cart back to AsyncStorage
    await AsyncStorage.setItem('cart', JSON.stringify(cartItems));
    console.log('Item added to cart');
    
  } catch (error) {
    console.log('Error adding item to cart: ', error);
  }
};
/*export const addToCart = async (item) => {
  let cartItems = await AsyncStorage.getItem("cart");
  cartItems = cartItems ? JSON.parse(cartItems) : [];

  //   checking items exist in the cart or not
  const existingItemIndex = cartItems.findIndex(
    (cartItem) => cartItem.id === item.id
  );
  if (existingItemIndex === -1) {
    cartItems.push(item);
    await AsyncStorage.setItem("cart", JSON.stringify(cartItems));
    console.log(cartItems);
  }
};*/

const deleteItem = async (id) => {
  let cartItems = await AsyncStorage.getItem("cart");
  cartItems = cartItems ? JSON.parse(cartItems) : null;
  if (cartItems) {
    cartItems = cartItems.filter((item) => item.id !== id);
    AsyncStorage.setItem("cart", JSON.stringify(cartItems));
  }
};
