import React, { useState } from "react";
import { IconButton,MD3Colors } from "react-native-paper";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Button,
  Pressable,
} from "react-native";

import estilos from "../MyDrawer/style";

const HomeScreen = ({ navigation }) => {
  const [valorMesa, inputMesa] = useState("");

  const screenMenuProductos = () => {
    navigation.navigate("MyTabs");
  };
  const volver = () => {
    navigation.navigate("EleccionUsuario");
  };

  return (
    <View
      style={{
        backgroundColor: "white",
        flex: 1,
      }}
    >
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
        Por favor indicanos tu número de mesa:
      </Text>

      <TextInput
        style={estilos.entardaTexto}
        keyboardType="numeric"
        value={valorMesa}
        onChangeText={(text) => {
          inputMesa(text);
        }}
      ></TextInput>
      <View
        style={{
          flex: 1,
       flexDirection: 'row',
       marginHorizontal: 20,
        marginTop: 5,
        }}
      >
        <View>
          <TouchableOpacity style={styles.boton}>
            <Text
              style={estilos.textoBoton}
              onPress={() => screenMenuProductos()}
            >Continuar</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity style={styles.boton}>
            <Text style={estilos.textoBoton}>Buscar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  boton: {
    ...estilos.boton,
  },
});
export default HomeScreen;
