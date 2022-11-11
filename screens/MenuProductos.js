import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { IconButton, MD3Colors } from "react-native-paper";
import estilos from "../MyDrawer/style";

const baseURL = "http://10.12.13.66:8000/api/";

const MenuProductos = ({ navigation, route }) => {
  //const {valorMesa} = route.params;

  const [categorias, setCategorias] = useState([]);
  const [productos, setProductos] = useState([]);

  const [categoriaEscogida, setCategoriaEscogida] = useState("");
  const [idCategoria, setIdCategoria] = useState("");

  const volver = () => {
    navigation.navigate("HomeScreen");
  };


  useEffect(() => {
    (async function () {
      try {
        const response = await fetch(baseURL + "productos", {
          method: "GET",
        });
        const data = await response.json();
        setProductos(data);
        // console.log({productos})
      
        //console.log(data);
      } catch (error) {
        //console.log(error);
        console.log("error productos");
      }
    })();
  }, []);
  
  useEffect(() => {
    (async function () {
      try {
        const response = await fetch(baseURL + "categorias", {
          method: "GET",
        });
        const data = await response.json();
        setCategorias(data);
        console.log(data);
      } catch (error) {
        //console.log(error);
        console.log("error categorias");
      }
    })();
  }, []);


  const mostrarProdutoCategoria = (nombreCategoria) => {

    setCategoriaEscogida(nombreCategoria);
    console.log("categoria recibida: " + nombreCategoria);
    console.log(categorias);
    for (var i = 0; i < categorias.length; i++) {
    
      if (categorias[i].nombre === categoriaEscogida) {
        setIdCategoria(categorias[i].id);
       console.log("id categoria seleccionado "+ idCategoria);
        break;
        
      }
    }

    

    //console.log("categoria escogida: " + categoriaEscogida);
    for (var j = 0; j < productos.length; j++) {
      var posCategoria = -1;

      //console.log(categoriaEscogida);

      if (productos[j].categoria_id === idCategoria) {
        //console.log(productos[j].nombre);
      }
    }
    //console.log(productos[1].nombre);
  };


  var i = -1;
  const botonesCategoria = categorias.map(function (categorias) {
    i++;
    return (
      <View key={i}>
        <TouchableOpacity>{categorias.id}</TouchableOpacity>
        <View>
          <TouchableOpacity
            style={estilos.botonCategorias}
            onPress={() => mostrarProdutoCategoria(categorias.nombre)}
          >
            <Text style={estilos.textoBoton}>
              {categorias.nombre.toUpperCase()}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  });

  return (
    <ScrollView>
      <View>
        <IconButton
          icon="arrow-left"
          iconColor={MD3Colors.error50}
          size={30}
          onPress={() => volver()}
        />
        <Text style={{ fontSize: 20 }}> Categorias:</Text>

        <ScrollView horizontal={true}>
          <View style={estilos.viewHorizontal}>{botonesCategoria}</View>
        </ScrollView>

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
    </ScrollView>
  );
};
export default MenuProductos;
