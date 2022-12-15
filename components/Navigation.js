import React, { useState } from "react";
import Navigation from "./Navigation";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import EleccionUsuario from "../screens/EleccionUsuario";
import CounterScreen from "../screens/Cliente/CounterScreen";
import MenuProductos from "../screens/Cliente/MenuProductos";
import HomeScreen from "../screens/Cliente/HomeScreen";
import CarritoScreen from "../screens/Cliente/CarritoScreen";
import AdministradorScreen from "../screens/Administrador/AdministradorScreen";
import CategoriasScreen from "../screens/Administrador/CategoriasScreen";
import MesasScreen from "../screens/Administrador/MesasScreen";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import estilos from "../MyDrawer/style";
import { RestauranteProvider } from "./RestauranteContext";

/**
 * Stack de navegacion.
 */
const Stack = createNativeStackNavigator();

/**
 * navegacion en la parte inferior de la pantalla.
 */
const Tab = createBottomTabNavigator();

/**
 * 
 * @returns navegacion en la parte inferior de la pantalla para la vista de cliente.
 */
function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "orange",
      }}
    >
      <Tab.Screen
        name="MenuProductos"
        component={MenuProductos}
        options={({ navigation, route }) => ({
          //unmountOnBlur: true,
          title: "Menú",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="restaurant" size={size} color="color" />
          ),
          headerStyle: {
            backgroundColor: "#67b5a3",
          },
        })}
      />
      <Tab.Screen
        name="Carrito"
        component={CarritoScreen}
        options={{
          //unmountOnBlur: true,
          tabBarLabel: "Carrito de compras",
          tabBarIcon: ({ color, size }) => (
            
            <AntDesign name="shoppingcart" size={24} color="black" />
          ),
          headerStyle: {
            backgroundColor: "#67b5a3",
          },
        }}
      />
    </Tab.Navigator>
  );
}
/**
 * 
 * @returns navegacion en la parte inferior de la pantalla para la vista de administrador.
 */
function MyTabsAdmin() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "orange",
      }}
    >
      <Tab.Screen
        name="AdministradorScreen"
        component={AdministradorScreen}
        options={({ navigation, route }) => ({
          tabBarLabel: "Administrar Productos",
          title: "Administrador Productos",
          unmountOnBlur: true,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="restaurant" size={size} color="color" />
          ),
          headerStyle: {
            backgroundColor: "#67b5a3",
          },
        })}
      />
      <Tab.Screen
        name="CategoriasScreen"
        component={CategoriasScreen}
        options={{
          tabBarLabel: "Administrar Categorias",
          title: "Administrar Categorias",
          unmountOnBlur: true,

          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list" size={24} color="black" />
          ),
          headerStyle: {
            backgroundColor: "#67b5a3",
          },
        }}
      />
      <Tab.Screen
        name="Mesas"
        component={MesasScreen}
        options={{
          tabBarLabel: "Administrar Mesas",
          title: "Administrar Mesas",
          unmountOnBlur: true,
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="user" size={24} color="black" />
          ),
          headerStyle: {
            backgroundColor: "#67b5a3",
          },
        }}
      />
       
    </Tab.Navigator>
  );
}

/**
 * 
 * @returns Toda la navegacion de la aplicacion dentro de un solo contenedor.
 */
export default function App() {
  return (
    <>
<RestauranteProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="EleccionUsuario">
          <Stack.Screen
            name="EleccionUsuario"
            component={EleccionUsuario}
            options={{
              title: "Indique el tipo de usuario antes de continuar:",
              headerStyle: {
                backgroundColor: "#67b5a3",
              },
              headerTintColor: "white",
            }}
          ></Stack.Screen>
          <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{
              //unmountOnBlur: true,
              title: "Inicio",
              unmountOnBlur: true,
              headerStyle: {
                backgroundColor: "#67b5a3",
              },
            }}
          ></Stack.Screen>
          <Stack.Screen
            name="CounterScreen"
            component={CounterScreen}
            options={{
              
              title: "Contador",
              unmountOnBlur: true,
              headerStyle: {
                backgroundColor: "#67b5a3",
              },
            }}
          ></Stack.Screen>

          <Stack.Screen
            name="MyTabs"
            component={MyTabs}
            options={{ headerShown: false }}
          ></Stack.Screen>

          <Stack.Screen
            name="MyTabsAdmin"
            component={MyTabsAdmin}
            options={{ headerShown: false }}
          ></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
      </RestauranteProvider>
    </>
  );
}
