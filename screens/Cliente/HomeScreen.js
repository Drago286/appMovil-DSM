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


const HomeScreen = ({ navigation }) => {
  const [valorMesa, inputMesa] = useState("");
  const {idMesa, setIdMesa} = useContext(RestauranteContext);
  const [selectPicker, setSelectPicker] = useState("");
  const [mesas,setMesas]=useState([]);
  const [categorias,setCategorias]=useState([]);
  const [productos,setProductos]=useState([]);
  const {baseURL} = useContext(RestauranteContext);

/**GET MESAS */
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
  /**
   * GET CATEGORIAS
   */
  useEffect(() => {
    (async function () {
      try {
        const response = await fetch(baseURL + "categorias", {
          method: "GET",
        });
        const data = await response.json();

        console.log(data);
        setCategorias(data);
        
      } catch (error) {
        console.log("error categorias");
      }
    })();
  }, []);
  /**
   * GET PRODUCTOS
   */
  useEffect(() => {
    (async function () {
      try {
        const response = await fetch(baseURL + "productos", {
          method: "GET",
        });
        const data = await response.json();

        console.log(data);
        setProductos(data.filter(productos => productos.stock > 0));
        
      } catch (error) {
        console.log("error productos");
      }
    })();
  }, []);

/**
 * validaciones antes de ingresar al menu de productos.
 */
  const screenMenuProductos = () => {
    if (selectPicker == "") {
      Alert.alert(
        "Oops!",
        "Por favor, indique un número de mesa antes de continuar",
        [{ text: "Entendido!" }]
      );
    } else if(categorias.length === 0 || productos.length === 0){
      Alert.alert(
        "Oops!",
        "No hay productos disponibles, comuniquese con el administrador del restaurante",
        [{ text: "Entendido!" }]
      );
    }else{
        setIdMesa(selectPicker);
        navigation.navigate("MyTabs");
    }
  };
  /**
   * navegacion hacia atras.
   */
  const volver = () => {
    navigation.navigate("EleccionUsuario");
    setIdMesa("");

  };

  /**
   * vista.
   */
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
          style={{ color: "black" }}
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
