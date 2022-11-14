import React, { useState, useEffect } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Button,
  Pressable,
  SafeAreaView,
  StyleSheet,
  FlatList,
  ScrollView,
  Alert,
} from "react-native";
import { IconButton, MD3Colors } from "react-native-paper";
import estilos from "../MyDrawer/style";

import Formulario from "../components/Formulario";
import Producto from "../components/producto";
const baseURL = "http://192.168.1.86:8000/api/";

const EleccionUsuario = ({ navigation }) => {
  const [productos, setProductos] = useState([]);
  const [producto, setProducto] = useState([]);
  const [categorias, setCategorias] = useState([]);

  const productoEditar = (id) => {
    const productoEditar = productos.filter((producto) => producto.id === id);
    setProducto(productoEditar[0]);
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
            const productosActualizados = producto.filter(
              (productoState) => productoState.id !== id
            );
            // console.log(pacientesActualizados)
            setProductos(productosActualizados);
          },
        },
      ]
    );
  };

  const [modalVisible, setModalVisible] = useState(false);
  const [nombreCategoria, setNombreCategoria] = useState("");

  const buscarNombreCategoria = () => {
    for (var p = 0; p < categorias.length; p++) {
      //console.log("producto "+j+":"+ productos[j].nombre);
      //console.log(idCategoria_);
      if (categoria_id == categorias[p].id) {
        setNombreCategoria(categorias[p].nombre);
      }
    }
    console.log(nombreCategoria);
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
        //buscarNombreCategoria();
        //console.log(data);
      } catch (error) {
        //console.log(error);
        console.log("error categorias");
      }
    })();
  }, []);

  const screenCliente = () => {
    navigation.navigate("HomeScreen");
  };
  const volver = () => {
    navigation.navigate("EleccionUsuario");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Pressable
        style={styles.btnNuevaCita}
        onPress={() => setModalVisible(!modalVisible)}
      >
        <Text style={styles.btnTextoNuevaCita}>Añadir producto</Text>
      </Pressable>
      <Text>{"   "}</Text>
      <Text style={styles.tituloBold}>{"   "}Productos disponibles:</Text>
      {productos.length === 0 ? (
        <Text style={styles.noPacientes}> No hay productos</Text>
      ) : (
        <FlatList
          style={styles.listado}
          data={productos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            //console.log({item});
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
      <Formulario
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        productos={productos}
        setProductos={setProductos}
        producto={producto}
        setProducto={setProducto}
      />
    </SafeAreaView>
  );
  //console.log(productos[1].nombre);
};

//   return (
//     <SafeAreaView
//       style={{
//         backgroundColor: "white",
//         flex: 1,
//        // flexDirection : "row",
//       }}
//     >
//         <IconButton
//         icon="arrow-left"
//         iconColor={MD3Colors.error50}
//         size={30}
//         onPress={() => volver()}
//       />
//       <Text>Productos disponibles:</Text>
//       <ScrollView style={{
//         tranparent: "true",
//         backgroundColor: "white",

//       }}>{mostrarProdutoCategoria}</ScrollView>
//       <IconButton
//       backgroundColor="#afc7c1"
//       icon="plus"
//       onPress={() => setModalVisible(!modalVisible)}

//     />

//     </SafeAreaView>
//   );
// };

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
    fontSize: 18,
    fontWeight: "900",
    textTransform: "uppercase",
  },
  noPacientes: {
    marginTop: 40,
    textAlign: "center",
    fontSize: 24,
    fontWeight: "600",
  },
  listado: {
    marginTop: 50,
    marginHorizontal: 30,
  },
});

export default EleccionUsuario;
