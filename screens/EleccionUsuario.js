import React from "react";
import { Text, TouchableOpacity, View, TextInput , Button} from "react-native";
import { IconButton, MD3Colors } from 'react-native-paper';
import estilos from "../MyDrawer/style";


const EleccionUsuario = ({ navigation }) => {
  const screenCliente = () => {
    navigation.navigate("HomeScreen");
  };
  

  return (
    <View
      style={{
        backgroundColor: "white",
        flex: 1,
       // flexDirection : "row",
      }}
    >
        <Button
        title="Cliente"
        style={estilos.boton}
        onPress={() => screenCliente()}
        />
         <Button
        title="Administrador"
        style={estilos.boton}
        />
      <TouchableOpacity style={estilos.boton} onPress={() => screenCliente()}>
        <Text style={estilos.textoBoton}>Cliente</Text>
      </TouchableOpacity>
      <TouchableOpacity style={estilos.boton}>
        <Text style={estilos.textoBoton}>Administrador</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EleccionUsuario;
