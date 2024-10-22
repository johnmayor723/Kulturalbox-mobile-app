//App.js

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';

// Import Screens
import SplashScreen from './screens/SplashScreen';
import AuthScreen from './screens/AuthScreen';
import SignUpScreen from './screens/SignUpScreen';
import HomeScreen from './screens/HomeScreen';
import UserProfileScreen from './screens/UserProfileScreen';
import CartScreen from './screens/CartScreen';
import ContactScreen from './screens/ContactScreen';
import PaymentScreen from "./screens/PaymentScreen";
import OrderTrackingScreen from "./screens/OrderTrackingScreen";
import HelpScreen from "./screens/HelpScreen";
import TrackingScreen from "./screens/TrackingScreen";
import ItemScreen from "./screens/ItemScreen.js";
import CategoriesScreen from "./screens/CategoriesScreen.js";
import FruitsScreen from "./screens/FruitsScreen.js";
import VegetablesScreen from "./screens/VegetablesScreen.js";
import DairyScreen from "./screens/DairyScreen.js";
import MeatScreen from "./screens/MeatScreen.js";
import OilProductsScreen from "./screens/OilProductsScreen.js";
import SnacksScreen from "./screens/SnacksScreen.js";



// Stack Navigator
const Stack = createStackNavigator();

// Bottom Tab Navigator
const Tab = createBottomTabNavigator();

// Drawer Navigator
const Drawer = createDrawerNavigator();

// Bottom Tab Navigator Component
function BottomTabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    let iconName;
                    if (route.name === 'TabHome') {
                        iconName = 'home';
                    } else if (route.name === 'TabCategories') {
                       iconName = 'grid-outline';
                    } else if (route.name === 'TabProfile') {
                        iconName = 'person';
                    } else if (route.name === 'TabCart') {
                        iconName = 'cart';
                    }
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#FF7E00',  // Active icon color
                tabBarInactiveTintColor: 'gray',   // Inactive icon color
                tabBarStyle: { backgroundColor: '#fff' },  // Tab bar background color
                headerShown: false  // Disable the header for the inner tab navigator
            })}
        >
            <Tab.Screen name="TabHome" component={HomeScreen} options={{ title: "Home" }} />
            <Tab.Screen name="TabCategories" component={CategoriesScreen} options={{ title: "Categories" }} />
            <Tab.Screen name="TabProfile" component={UserProfileScreen} options={{ title: "Profile" }} />
            <Tab.Screen name="TabCart" component={CartScreen} options={{ title: "Cart" }} 
              />
             
        </Tab.Navigator>
    
    );
}

// Drawer Navigator Component
function DrawerNavigator() {
    return (
        <Drawer.Navigator initialRouteName="DrawerHome">
             <Drawer.Screen 
                name="DrawerHome" 
                component={BottomTabNavigator} 
                options={{ title: "Menu", headerShown: true }}  // Keep header with hamburger menu
            />
            
            
            <Drawer.Screen 
                name="DrawerProfile" 
                component={UserProfileScreen} 
                options={{ title: "Profile", headerShown: true }}  // Keep header with hamburger menu
            />
            
             <Drawer.Screen 
                name="DrawerContact" 
                component={HelpScreen} 
                options={{ title: "Help", headerShown: true }}  // Keep header with hamburger menu
            />
           <Drawer.Screen 
                name="DrawerTracking" 
                component={TrackingScreen} 
                options={{ title: "Tracking", headerShown: true }}  // Keep header with hamburger menu
            />
            
        </Drawer.Navigator>
    );
}

// Main App Component
export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Splash">
                <Stack.Screen
                    name="Splash"
                    component={SplashScreen}
                    options={{ headerShown: false }}  // Hides the header
                />
                <Stack.Screen
                    name="Auth"
                    component={AuthScreen}
                    options={{ headerShown: false }}  // Hides the header
                />
                <Stack.Screen
                    name="SignUp"
                    component={SignUpScreen}
                    options={{ headerShown: false }}  // Hides the header
                />
                <Stack.Screen
                    name="Single Product"
                    component={ItemScreen}
                    options={{ headerShown:true }}  // Hides the header
                />
               <Stack.Screen
                    name="Cart"
                    component={CartScreen}
                    options={{ headerShown:true }}  // Hides the header
                />
                 <Stack.Screen
                    name="Payment"
                    component={PaymentScreen}
                    options={{ headerShown:true }}  // Hides the header
                />
                <Stack.Screen
                    name="TrackingResult"
                    component={OrderTrackingScreen}
                    options={{ headerShown:true }}  // Hides the header
                />
                <Stack.Screen
                    name="Fruit"
                    component={FruitsScreen}
                    options={{ headerShown:true }}  // Hides the header
                />
                <Stack.Screen
                    name="Vegetable"
                    component={VegetablesScreen}
                    options={{ headerShown:true }}  // Hides the header
                />
                <Stack.Screen
                    name="Meat"
                    component={MeatScreen}
                    options={{ headerShown:true }}  // Hides the header
                />
                <Stack.Screen
                    name="Snack"
                    component={SnacksScreen}
                    options={{ headerShown:true }}  // Hides the header
                />
                <Stack.Screen
                    name="Oil Product"
                    component={OilProductsScreen}
                    options={{ headerShown:true }}  // Hides the header
                />
                <Stack.Screen
                    name="Dairy"
                    component={DairyScreen}
                    options={{ headerShown:true }}  // Hides the header
                />
                <Stack.Screen
                    name="Main"
                    component={DrawerNavigator}
                    options={{ headerShown: false }}  // Disable the header for the main drawer stack
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
        }
