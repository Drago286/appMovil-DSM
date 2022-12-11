import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  FlatList,
  SafeAreaView,
  Pressable,
  Alert,
} from "react-native";
import { IconButton, MD3Colors } from "react-native-paper";
import Producto from "../../components/producto";
import estilos from "../../MyDrawer/style";
import Icon from "react-native-vector-icons/MaterialIcons";
import RestauranteContext from "../../components/RestauranteContext";
import Pedido from "../../components/Pedido";
import ProductoMenu from "../../components/ProductoMenu";

// import Producto from "../components/producto";

const baseURL = "http://192.168.1.85:8000/api/";

const MenuProductos = ({ navigation, route, props }) => {
  //const {valorMesa} = route.params;

  const [categorias, setCategorias] = useState([]);
  const [productos, setProductos] = useState([]);
  const [producto, setProducto] = useState([]);
  const [carrito, setCarrito] = useContext(RestauranteContext);
  const [productosCategoria, setProductosCategoria] = useState([]);
  const [arrayCarrito, setArrayCarrito] = useState([]);
  const [categoriaEscogida, setCategoriaEscogida] = useState("");
  const [idCategoria_, setIdCategoria] = useState("");
  const [resumen_orden,setResumen_orden] = useState([]);
  const [resumen_orden_productos,setResumen_orden_productos] = useContext(RestauranteContext);


  const [modalVisible, setModalVisible] = useState(false);

  const volver = () => {
    navigation.navigate("HomeScreen");
    setCarrito([]);
  };

  useEffect(() => {
    (async function () {
      try {
        const response = await fetch(baseURL + "resumen_ordens", {
          method: "GET",
        });
        const data = await response.json();
        setResumen_orden(data);
        // console.log({productos})
        //console.log(data);
      } catch (error) {
        //console.log(error);
        console.log("error resumen_ordens");
      }
    })();
  }, []);

  useEffect(() => {
    (async function () {
      try {
        const response = await fetch(baseURL + "resumen_orden_productos", {
          method: "GET",
        });
        const data = await response.json();
        setResumen_orden_productos(data);
        //console.log(data);
      } catch (error) {
        //console.log(error);
        console.log("error categorias");
      }
    })();
  }, []);

  const modificarArray = (id_categoria) => {
    const array = productos.filter(
      (producto) => producto.categoria_id === id_categoria
    );

    setProductosCategoria(array);
  };


  return (
    <SafeAreaView>
      
      <View>
        {resumen_orden.length === 0 ? (
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              marginTop: 20,
              marginBottom: 20,
              alignSelf: "center",
            }}
          >
            No hay ningún pedido.
          </Text>
        ) : (
          <FlatList
            contentContainerStyle={{ paddingBottom: 80 }}
            ListFooterComponentStyle={{ paddingHorizontal: 20, marginTop: 20 }}
            style={styles.listado}
            data={resumen_orden}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              return (
                  <Pedido item={item} />
              );
            }}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#DAD5D4",
    flex: 1,
    borderRadius: 10,
    marginBottom: 5,
  },
  titulo: {
    textAlign: "center",
    fontSize: 30,
    color: "#374151",
    fontWeight: "600",
  },
  tituloBold: {
    fontWeight: "800",
    color: "black",
    fontSize: 16,
  },
  btnCarrito: {
    height: 30,
    width: 150,
    borderRadius: 10,
    backgroundColor: "#F9813A",
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  btnCarritoText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "500",
  },

  btnAgragarCantidad: {
    textAlign: "center",
    alignSelf: "center",
    color: "#FFF",
    fontSize: 30,
    fontWeight: "700",
    textTransform: "uppercase",
    marginTop: 4,
    marginBottom: 10,
    borderRadius: 15,
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
  actionBtn: {
    width: 60,
    height: 30,
    backgroundColor: "#F9813A",
    borderRadius: 30,
    paddingHorizontal: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
  },
});

export default MenuProductos;
