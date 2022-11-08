import React from "react";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native"; 

import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
 
//screens
import HomeScreen from "./screens/HomeScreen";
import MenuProductos from "./screens/MenuProductos";
import CarritoScreen from "./screens/CarritoScreen";
import StackScreen from "./screens/StackScreen";

const Tab = createBottomTabNavigator();

function MyTabs () {
 return (
    <Tab.Navigator
    screenOptions={{
        tabBarActiveTintColor: "orange",
    }}>
        <Tab.Screen 
        name = "Menú" 
        component = {MenuProductos} 
        options={{
            tabBarLabel: "Menú",
            tabBarIcon: ({color,size}) => (
                <Ionicons name="restaurant" size={size} color="color" />
            ),
        }}/>
        <Tab.Screen 
        name = "Carrito" 
        component = {CarritoScreen} 
        options = {{
        tabBarLabel : "Carrito de compras",
        tabBarIcon: ({color,size}) => (
            <AntDesign name="shoppingcart" size={24} color="black" />
        ),
        }}/>
    </Tab.Navigator>
 );
}

export default function Navigation() {
    return (
        <NavigationContainer>
            <MyTabs />
        </NavigationContainer>
    );
    }

