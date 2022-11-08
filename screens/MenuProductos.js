import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { IconButton,MD3Colors } from "react-native-paper";
import estilos from "../MyDrawer/style";

const MenuProductos = ({ navigation, route }) => {
  const volver = () => {
    navigation.navigate("HomeScreen");
  };

  //const {valorMesa} = route.params;

  return (
    <View>
      <IconButton
        icon="arrow-left"
        iconColor={MD3Colors.error50}
        size={30}
        onPress={() => volver()}
        
      />
     
      <Text
        style={{
          fontSize: 20,
          marginTop: "30%",
          textAlign: "center",
        }}
      >
        Seleccione sus productos:
      </Text>
    </View>
  );
};
export default MenuProductos;
