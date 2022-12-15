import React from "react";
import { Text, TouchableOpacity, View, TextInput , Button, Pressable} from "react-native";
import { IconButton, MD3Colors } from 'react-native-paper';
import estilos from "../MyDrawer/style";


const EleccionUsuario = ({ navigation }) => {
  /**
   * NAVEGACION SEGUN TIPO DE USUARIO
   */
  const screenCliente = () => {
    navigation.navigate("HomeScreen");
  };
  const screenAdministrador = () => {
    navigation.navigate("MyTabsAdmin");
  };

  /**
   * VISTA.
   */
  return (
    <View
      style={{
        backgroundColor: "white",
        flex: 1,
        alignItems : "center",
        //flexDirection: "row",
      }}
    >
      <Pressable style={estilos.botonEleccionUsuario} onPress={() => screenCliente()}>
        <Text style={estilos.textoBoton}>Cliente</Text>
      </Pressable>
      <Pressable style={estilos.botonEleccionUsuario} onPress ={() => screenAdministrador()}>
        <Text style={estilos.textoBoton}>Administrador</Text>
      </Pressable>
    </View>
  );
};

export default EleccionUsuario;
