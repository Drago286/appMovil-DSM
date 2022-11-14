import React from "react";
import Navigation from "./Navigation";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import EleccionUsuario from "./screens/EleccionUsuario";
import MenuProductos from "./screens/MenuProductos";
import HomeScreen from "./screens/HomeScreen";
import CarritoScreen from "./screens/CarritoScreen";
import AdministradorScreen from "./screens/AdministradorScreen";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import estilos from "./MyDrawer/style";
const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

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
        options={({navigation,route})=> ({
          
          title: "Menú",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="restaurant" size={size} color="color" />
          ),
          headerStyle: {
            backgroundColor: "#67b5a3",
          },
        }) }
      />
      <Tab.Screen
        name="Carrito"
        component={CarritoScreen}
        options={{
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

export default function App() {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="EleccionUsuarior">
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
              title: "Inicio",
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
            name="AdministradorScreen"
            component={AdministradorScreen}
            options={{
              title: "Menú Administrador",
              headerStyle: {
                backgroundColor: "#67b5a3",
              },
            }}
          ></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
