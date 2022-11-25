import React, { useState, useEffect, useContext } from "react";
import { IconButton, MD3Colors } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";

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
import RestauranteContext from "../../components/RestauranteContext";

import estilos from "../../MyDrawer/style";

const baseURL = "http://192.168.1.83:8000/api/";

const HomeScreen = ({ navigation }) => {
  const [valorMesa, inputMesa] = useState("");
  const [mesas, setMesas] = useState([]);
  const [selectPicker, setSelectPicker] = useState("");
  const {idMesa, setIdMesa} = useContext(RestauranteContext);

  //console.log(mesas);

  useEffect(() => {
    (async function () {
      try {
        const response = await fetch(baseURL + "mesas", {
          method: "GET",
        });
        const data = await response.json();

        console.log(data);
        setMesas(data);
        console.log(mesas);
      } catch (error) {
        console.log("error MESAS");
      }
    })();
  }, []);

  const screenMenuProductos = () => {
    if (valorMesa == "") {
      Alert.alert(
        "Oops!",
        "Por favor, indique un número de mesa antes de continuar",
        [{ text: "Entendido!" }]
      );
    } else {
      const busqueda = mesas.some((mesa) => mesa.numero == valorMesa);
      if (busqueda) {
        //setIdMesa(valorMesa);
        Alert.alert("😊", "Mesa disponible", [{ text: "Continuar" }]);
        navigation.navigate("MyTabs");
      } else {
        Alert.alert("😥", "Mesa no disponible", [{ text: "cerrar" }]);
      }
    }
  };
  const volver = () => {
    navigation.navigate("EleccionUsuario");
    setIdMesa("");
  };

  return (
    <View
      style={{
        backgroundColor: "white",
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
        <Pressable style={estilos.boton2}>
          <Text
            style={estilos.textoBoton}
            onPress={() => screenMenuProductos()}
          >
            Continuar
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default HomeScreen;
