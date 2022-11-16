import React from "react";
import { Text, TouchableOpacity, View, TextInput , Button, Pressable} from "react-native";
import { IconButton, MD3Colors } from 'react-native-paper';
import estilos from "../MyDrawer/style";


const EleccionUsuario = ({ navigation }) => {
  const screenCliente = () => {
    navigation.navigate("HomeScreen");
  };
  const screenAdministrador = () => {
    navigation.navigate("MyTabsAdmin");
  };

  return (
    <View
      style={{
        backgroundColor: "white",
        flex: 1,
      }}
    >
      <TouchableOpacity style={estilos.botonEleccionUsuario} onPress={() => screenCliente()}>
        <Text style={estilos.textoBoton}>Cliente</Text>
      </TouchableOpacity>
      <TouchableOpacity style={estilos.botonEleccionUsuario} onPress ={() => screenAdministrador()}>
        <Text style={estilos.textoBoton}>Administrador</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EleccionUsuario;
