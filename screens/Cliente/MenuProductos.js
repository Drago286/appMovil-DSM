import React, { useState, useEffect } from "react";
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
} from "react-native";
import { IconButton, MD3Colors } from "react-native-paper";
import Producto from "../../components/producto";
import estilos from "../../MyDrawer/style";
import Icon from "react-native-vector-icons/MaterialIcons";

// import Producto from "../components/producto";

const baseURL = "http://192.168.1.86:8000/api/";

const MenuProductos = ({ navigation, route, props }) => {
  //const {valorMesa} = route.params;

  const [categorias, setCategorias] = useState([]);
  const [productos, setProductos] = useState([]);
  const [producto, setProducto] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [productosCategoria, setProductosCategoria] = useState([]);
  const [arrayCarrito,setArrayCarrito] = useState([]);
  const [categoriaEscogida, setCategoriaEscogida] = useState("");
  const [idCategoria_, setIdCategoria] = useState("");

  const [modalVisible, setModalVisible] = useState(false);

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
        modificarArray();
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
        //console.log(data);
      } catch (error) {
        //console.log(error);
        console.log("error categorias");
      }
    })();
  }, []);

  const modificarArray = () => {

    const array = productos.filter( producto => producto.categoria_id === idCategoria_ );

    setProductosCategoria(array);


  };

  const addToCart = (item) => {

    const busqueda = arrayCarrito.some(producto => producto.id === item.id);

    if (!busqueda) {
      arrayCarrito.push(item);
    }

    setCarrito(arrayCarrito);
    console.log(carrito);
  };

  var j = -1;
  const mostrarProdutoCategoria = productosCategoria.map(function (
    productosCategoria
  ) {
    j++;
    return (
      <SafeAreaView style={styles.container} key={j}>
        <Text style={styles.titulo}>
          {productosCategoria.nombre}
          {"  "}
        </Text>
        <View>
          <Text style={styles.tituloBold}>
            {"Descripción:   "}
            {productosCategoria.descripcion}
            {"   "}
          </Text>
        </View>
        <View>
          <Text style={styles.tituloBold}>
            Precio: ${productosCategoria.precio}
          </Text>
        </View>

        <View >
         <Pressable style={styles.btnCarrito}
         onPress = {()=> addToCart(productosCategoria)}>
          <Text style={styles.btnCarritoText}>
            Añadir al carrito
          </Text>

         </Pressable>
        </View>
      </SafeAreaView>
    );
  });

  var i = -1;
  const botonesCategoria = categorias.map(function (categorias) {
    i++;
    return (
      <View key={i}>
        <View>
          <Pressable
            style={estilos.botonCategorias}
            onPress={() => {
              // mostrarProdutoCategoria(categorias.nombre);
              setIdCategoria(categorias.id);
              modificarArray();
              // modificarArray();
            }}
          >
            <Text style={estilos.textoBoton}>
              {categorias.nombre.toUpperCase()}
            </Text>
          </Pressable>
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
          fontWeight: 'bold',
          marginTop: 20,
          marginBottom: 20,
        }}
        >
          Seleccione sus productos:
        </Text>
        {mostrarProdutoCategoria}
      </View>
    </ScrollView>
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
});

export default MenuProductos;
