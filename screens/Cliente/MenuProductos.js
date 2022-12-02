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
import ProductoMenu from "../../components/ProductoMenu";
import Pedido from "../../components/Pedido";

// import Producto from "../components/producto";

const baseURL = "http://192.168.1.83:8000/api/";

const MenuProductos = ({ navigation, route, props }) => {
  //const {valorMesa} = route.params;

  const [categorias, setCategorias] = useState([]);
  // const [productos, setProductos] = useState([]);
  const [ProductoCarrito, setProductoCarrito] = useState([]);
  const { carrito, setCarrito, total, setTotal,idMesa, resumen_orden_productos, setResumen_orden_productos , productos,setProductos} = useContext(RestauranteContext);
  const [productosCategoria, setProductosCategoria] = useState([]);
  const [arrayCarrito, setArrayCarrito] = useState([]);
  const [categoriaEscogida, setCategoriaEscogida] = useState("");
  const [idCategoria_, setIdCategoria] = useState("");

  const [modalVisible, setModalVisible] = useState(false);

  var pedido = {
    detalle: []
  };

  const volver = () => {
    navigation.navigate("HomeScreen");
    setCarrito([]);
    setTotal(0);
    setResumen_orden_productos([]);
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
        //modificarArray();
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

  const modificarArray = (id_categoria) => {
    const array = productos.filter(
      (producto) => producto.categoria_id === id_categoria
    );

    setProductosCategoria(array);
  };

  const addToCart = (item) => {
    const busqueda = carrito.some((producto) => producto.id === item.id);

    if (!busqueda) {
      carrito.push(item);
      var subTotal = total;
      setTotal(subTotal + item.precio);
      if(resumen_orden_productos.length===0) {
      resumen_orden_productos.push({
        orden_id: "",
        mesa_id : idMesa,
        producto_id: item.id,
        cantidad: 1, 
         
      })
    }else{
      var founded;
      for(var i = 0; i <resumen_orden_productos.length; i++) {
      if (resumen_orden_productos[i].producto_id ===item.id) {
        resumen_orden_productos[i].cantidad++;
        founded == true;
      }
    }
    if(!founded){
      resumen_orden_productos.push({
        orden_id: "",
        mesa_id : idMesa,
        producto_id: item.id,
        cantidad: 1, 
         
      })
    }
      //buscar el producto y ver si no esta agregado.
    }
      console.log(resumen_orden_productos);


      Alert.alert(
        "¡Añadido!",
        "El producto ha sido añadido al carrito exitosamente",
        [{ text: "Ok" }]
      );
    } else {
      Alert.alert("UY!", "¡Este producto ya está en el carrito!", [
        { text: "Ok" },
      ]);
    }

    //console.log(carrito);
  };

  var i = -1;
  const botonesCategoria = categorias.map(function (categorias) {
    i++;
    return (
      <View key={i}>
        <View>
          <Pressable
            style={estilos.botonCategorias}
            onPress={() => {
              modificarArray(categorias.id);
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
    <View>
      <View>
        <IconButton
          icon="arrow-left"
          iconColor={MD3Colors.error50}
          size={30}
          onPress={() => volver()}
        />
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            marginLeft: 20,
          }}
        >
          {" "}
          Categorias:
        </Text>

        <ScrollView horizontal={true}>
          <View style={estilos.viewHorizontal}>{botonesCategoria}</View>
        </ScrollView>
      </View>
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          marginTop: 20,
          marginLeft: 20,
        }}
      >
        Seleccione sus productos:
      </Text>
      <View>
        {productosCategoria.length === 0 ? (
          <FlatList
            contentContainerStyle={{ paddingBottom: 80 }}
            ListFooterComponentStyle={{ paddingHorizontal: 20, marginTop: 20 }}
            style={styles.listado}
            data={productos}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              return (
                <View>
                  <ProductoMenu item={item} addToCart={addToCart} />
                  <View></View>
                </View>
              );
            }}
          />
        ) : (
          <FlatList
            contentContainerStyle={{ paddingBottom: 80 }}
            ListFooterComponentStyle={{ paddingHorizontal: 20, marginTop: 20 }}
            style={styles.listado}
            data={productosCategoria}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              return (
                <View>
                  <ProductoMenu item={item} addToCart={addToCart} />
                  <View></View>
                </View>
              );
            }}
            
          />
        )}
        
      </View>
      
    </View>
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
    marginTop: 10,
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
