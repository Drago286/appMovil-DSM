import React, { useState, useEffect, createContext, useContext } from "react";
import { Text,TouchableOpacity,View,TextInput,Button,Pressable,SafeAreaView,StyleSheet,FlatList,ScrollView,Alert} from "react-native";
import { IconButton, MD3Colors } from "react-native-paper";
import RestauranteContext from "../../components/RestauranteContext";
import axios from "axios";
//import estilos from "../../MyDrawer/style";

import Formulario from "../../components/Formulario";
import Producto from "../../components/producto";
const baseURL = "http://192.168.1.86:8000/api/";

export const categoriasContext = createContext();


const AdministradorScreen = ({ navigation,children }) => {
  const [productos, setProductos] = useState([]);
  const [producto, setProducto] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [carrito, setCarrito] = useContext(RestauranteContext)
  const [nombreCategoria, setNombreCategoria] = useState("");
  const [ip, setIP] = useState('');
  

  //NAVEGACION VOLVER
  const volver = () => {
    navigation.navigate("EleccionUsuario");
  };


  const productoEditar = (id) => {
    const productoEditar = productos.filter((producto) => producto.id === id);
    setProducto(productoEditar[0]);
  };

  const eliminarProducto = (id) => {
    try {
      const requestOptions = {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5",
        },
      };
      fetch(baseURL + "productos/" + id, requestOptions)
        .then((res) => res.ok)
        .catch((error) => console.error("Error", error))
        .then((response) => console.log("Exito", response));
    } catch (e) {
      console.log(e);
    }
  };

  const productoEliminar = (id) => {
    Alert.alert(
      "Deseas Eliminar?",
      "Un producto eliminado no se puede recuperar",
      [
        { text: "Cancelar" },
        {
          text: "Si, Eliminar",
          onPress: () => {
            eliminarProducto(id);
          },
        },
      ]
    );
  };

  const buscarNombreCategoria = () => {
    for (var p = 0; p < categorias.length; p++) {
      if (categoria_id == categorias[p].id) {
        setNombreCategoria(categorias[p].nombre);
      }
    }
  };

//GET PRODUCTOS.
  useEffect(() => {
    (async function () {
      try {
        const response = await fetch(baseURL + "productos", {
          method: "GET",
        });
        const data = await response.json();
        setProductos(data);
      } catch (error) {
        console.log("error productos");
      }
    })();
  }, []);

  //GET CATEGORIAS.
  useEffect(() => {
    (async function () {
      try {
        const response = await fetch(baseURL + "categorias", {
          method: "GET",
        });
        const data = await response.json();
        setCategorias(data);
      } catch (error) {
        console.log("error categorias");
      }
    })();
  }, []);


//DESPLEGAR CATEGORIAS.
  const recorrerCaterias = () => {
    for(var i = 0; i <categorias.length ; i++) {
      console.log(categorias[i]);
  }
  };
 
//VISTA DE ADMINISTRADOR_SCREEN
  return (
    <categoriasContext.Provider value={ [categorias,setCategorias]}>
    <SafeAreaView style={styles.container}>
      <IconButton
        icon="arrow-left"
        iconColor={MD3Colors.error50}
        size={30}
        onPress={() => volver()}
      />

      <Text>{"   "}</Text>
      <Text style={styles.tituloBold}>{"   "}Productos disponibles:</Text>
      
      {productos.length === 0 ? (
        <Text style={styles.noProductos}> No hay productos</Text>
      ) : (
        <FlatList
          style={styles.listado}
          data={productos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            return (
              <Producto
                item={item}
                setModalVisible={setModalVisible}
                productoEditar={productoEditar}
                productoEliminar={productoEliminar}
              />
            );
          }}
        />
      )}
      <Pressable
        style={styles.btnNuevaCita}
        onPress={() => {setModalVisible(!modalVisible);recorrerCaterias()}}
      >
        <Text style={styles.btnTextoNuevaCita}>Añadir producto</Text>
      </Pressable>
      <Formulario
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        productos={productos}
        setProductos={setProductos}
        producto={producto}
        setProducto={setProducto}
        categorias = {categorias}
      />
    </SafeAreaView>
    </categoriasContext.Provider>
  );
};

//STYLES
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F3F4F6",
    flex: 1,
  },
  titulo: {
    textAlign: "center",
    fontSize: 30,
    color: "#374151",
    fontWeight: "600",
  },
  tituloBold: {
    fontWeight: "600",
    fontSize: 19,
  },
  btnNuevaCita: {
    backgroundColor: "orange",
    padding: 15,
    marginTop: 30,
    marginHorizontal: 20,
    borderRadius: 10,
  },
  btnTextoNuevaCita: {
    textAlign: "center",
    color: "#FFF",
    fontSize: 15,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  noProductos: {
    marginTop: 40,
    textAlign: "center",
    fontSize: 24,
    fontWeight: "500",
  },
  listado: {
    marginTop: 50,
    marginHorizontal: 30,
  },
});

export default AdministradorScreen;