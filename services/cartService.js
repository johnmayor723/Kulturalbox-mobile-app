import AsyncStorage from "@react-native-async-storage/async-storage";


//import AsyncStorage from '@react-native-async-storage/async-storage';

// Function to add an item to the cart
export const addToCart = async (item) => {
  try {
    // Log the item to see if it's null or undefined
    console.log('Item to add:', item);

    if (!item || !item._id) {
      throw new Error('Invalid item');
    }

    const cart = await AsyncStorage.getItem('cart');
    let cartItems = cart ? JSON.parse(cart) : [];

    const existingItemIndex = cartItems.findIndex(cartItem => cartItem.id === item._id);

    if (existingItemIndex !== -1) {
      cartItems[existingItemIndex].quantity += 1;
    } else {
      cartItems.push({...item, quantity: 1});
    }

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
