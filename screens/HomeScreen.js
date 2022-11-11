import React, { useState, useEffect } from "react";
import { IconButton, MD3Colors } from "react-native-paper";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Button,
  Pressable,
  Alert,
} from "react-native";

import estilos from "../MyDrawer/style";

const baseURL = "http://10.12.13.66:8000/api/";

const HomeScreen = ({ navigation }) => {
  const [valorMesa, inputMesa] = useState("");
  const [mesas, setMesas] = useState([]);

  useEffect(() => {
    (async function () {
      try {
        const response = await fetch(baseURL + "mesas", {
          method: "GET",
        });
        const data = await response.json();
        setMesas(data);
      } catch (error) {
        //console.log(error);
        console.log("error u.u");
      }
    })();
  }, []);

  const buscarMesa = () => {
    for (var i in mesas) {
      if (mesas[i].numero == valorMesa) {
        return true;
      }
      return false;
    }
    return false;
  };

  const screenMenuProductos = () => {
    if (valorMesa == "") {
      Alert.alert(
        "Oops!",
        "Por favor, indique un número de mesa antes de continuar",
        [{ text: "Entendido!" }]
      );
    } else {
      var x = buscarMesa();
      if (x === true) {
        Alert.alert("😊", "Mesa disponible", [{ text: "Continuar" }]);
        navigation.navigate("MyTabs", { valorMesa });
      } else {
        Alert.alert("😥", "Mesa no disponible", [{ text: "cerrar" }]);
      }
    }
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
      <View style={estilos.viewHorizontal}>
        <View>
          <TouchableOpacity style={estilos.boton2}>
            <Text
              style={estilos.textoBoton}
              onPress={() => screenMenuProductos()}
            >
              Continuar
            </Text>
          </TouchableOpacity>
        </View>
        <View></View>
      </View>
    </View>
  );
};

export default HomeScreen;
