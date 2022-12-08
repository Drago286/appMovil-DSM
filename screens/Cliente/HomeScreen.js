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

const baseURL = "http://192.168.1.176:8000/api/";

const HomeScreen = ({ navigation }) => {
  const [valorMesa, inputMesa] = useState("");
  const {idMesa, setIdMesa} = useContext(RestauranteContext);
  const [selectPicker, setSelectPicker] = useState("");
  const [mesas,setMesas]=useState([]);

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
    if (selectPicker == "") {
      Alert.alert(
        "Oops!",
        "Por favor, indique un número de mesa antes de continuar",
        [{ text: "Entendido!" }]
      );
    } else {
        setIdMesa(selectPicker);
        navigation.navigate("MyTabs");
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

          textAlign: "center",
        }}
      >
        Por favor indicanos tu número de mesa:
      </Text>
      <Picker
        selectedValue={selectPicker}
        onValueChange={(select) => setSelectPicker(select)}
        style={{
          backgroundColor: "#FFF",
          borderRadius: 10,
          fontSize: 17,
          marginBottom: 10,
          width: 330,
          alignSelf: "center",
        }}
        itemStyle={{ height: 80 }}
      >
        <Picker.Item
          style={{ color: "white" }}
          label="- Seleccione -"
          value=""
        />
        {mesas.map((elemento) => (
          <Picker.Item
            key={elemento.id}
            label={"Mesa N°"+elemento.numero.toString()}
            value={elemento.id}
          />
        ))}
      </Picker>

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
