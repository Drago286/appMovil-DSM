import React from "react";
import { Text, TouchableOpacity, View, TextInput , Button, Pressable,Image} from "react-native";
import { IconButton, MD3Colors } from 'react-native-paper';
import { SafeAreaView } from "react-native-safe-area-context";
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
    <SafeAreaView>
    <View>
<Image   style={{
              alignSelf: "center",
              height: 310,
              width: 350,
              marginBottom: 20,
            }}
            source={require('../assets/logo_inicio.png')}>

</Image>
    </View>
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
    </SafeAreaView>
  );
};

export default EleccionUsuario;
