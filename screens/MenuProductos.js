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
import estilos from "../MyDrawer/style";
import Producto from "../components/producto";

const baseURL = "http://192.168.1.86:8000/api/";

const MenuProductos = ({ navigation, route }) => {
  //const {valorMesa} = route.params;

  const [categorias, setCategorias] = useState([]);
  const [productos, setProductos] = useState([]);
  const [producto, setProducto] = useState([]);
  const [productosCategoria, setProductosCategoria] = useState([]);

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

  const modificarArray =() => {
  
    for (var p = 0; p < productos.length; p++) {
      //console.log("producto "+j+":"+ productos[j].nombre);
      //console.log(idCategoria_);
      if (productos[p].categoria_id == idCategoria_) {
        setProductosCategoria(productos[p]);

        console.log("productos: " + productos[p].nombre);
        
      }
    }
  
  };


  var j = -1;
  const mostrarProdutoCategoria = productosCategoria.map(function (productosCategoria) {
    

    // setCategoriaEscogida(nombreCategoria);
    // // console.log(idCategoria_);
    // console.log("categoria recibida: " + idCategoria_);

    //console.log("categoria escogida: " + categoriaEscogida);
    // for (var p = 0; p < productos.length; p++) {
    //   //console.log("producto "+j+":"+ productos[j].nombre);
    //   //console.log(idCategoria_);
    //   if (productos[p].categoria_id == idCategoria_) {
    //     setProductosCategoria(productos[p]);

    //     console.log("productos: " + productos[p].nombre);
    //   }
    // }
    
    j++;
      return (
        <SafeAreaView style={styles.container} key ={j}>
          <Text style={styles.titulo}>
          {productosCategoria.nombre}{'  '}
            
          </Text>
          <Text style={styles.tituloBold}>{"Descripción:           "}{productosCategoria.descripcion}
          <Text>{'                '}Precio: ${productosCategoria.precio}</Text></Text>
          <Pressable
            style={styles.btnNuevaCita}
            onPress={() => console.log("presionadoxd"+j)}>
            <Text style={styles.btnTextoNuevaCita}>Añadir al carrito</Text>
          </Pressable>

          {productos.length === 0 ? (
            <Text style={styles.noPacientes}> No hay pacientes</Text>
          ) : (
            <FlatList
              style={styles.listado}
              data={productosCategoria}
              keyExtractor={item => item.id}productosCategoria
              renderItem={({item}) => {
                console.log({item});
                return (
                  < Producto
                    item={item}
                    setModalVisible={setModalVisible}
                    productoEditar={productoEditar}
                    productoEliminar={productoEliminar}
                  />
                );
              }}
            />
          )}
          </SafeAreaView>
    );
    //console.log(productos[1].nombre);
  });

  var i = -1;
  const botonesCategoria = categorias.map(function (categorias) {
    i++;
    return (
      <View key={i}>
        <View>
          <TouchableOpacity
            style={estilos.botonCategorias}
            onPress={() => {
              // mostrarProdutoCategoria(categorias.nombre);
              setIdCategoria(categorias.id)
              modificarArray();
            }}
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
          // style={{
          //   fontSize: 20,
          //   marginTop: "30%",
          //   textAlign: "center",
          // }}
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
    fontWeight: "900",
    color: "#6D28D9",
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

export default MenuProductos;
