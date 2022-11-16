import React from "react";
import Navigation from "./Navigation";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import EleccionUsuario from "../screens/EleccionUsuario";
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
          options={({navigation,route})=> ({
            tabBarLabel: "Administrar Productos",
            title: "Administrador Productos",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="restaurant" size={size} color="color" />
            ),
            headerStyle: {
              backgroundColor: "#67b5a3",
            },
          }) }
        />
        <Tab.Screen
          name="CategoriasScreen"
          component={CategoriasScreen}
          options={{
            tabBarLabel: "Administrar Categorias",
            title: "Administrar Categorias",

            tabBarIcon: ({ color, size }) => (
              <AntDesign name="shoppingcart" size={24} color="black" />
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
            name="MyTabsAdmin"
            component={MyTabsAdmin}
            options={{ headerShown: false }}
          ></Stack.Screen>
        </Stack.Navigator>
        </NavigationContainer>
    </>
  );
}
