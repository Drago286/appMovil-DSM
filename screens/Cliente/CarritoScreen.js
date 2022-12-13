import React, { useContext, useEffect, useState } from "react";
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
import Icon from "react-native-vector-icons/MaterialIcons";
import RestauranteContext from "../../components/RestauranteContext";
import ProductoCarrito from "../../components/ProductoCarrito";

const baseURL = "http://192.168.1.82:8000/api/";

const CarritoScreen = ({ navigation }) => {
  const {
    carrito,
    setCarrito,
    idMesa,
    resumen_orden_productos,
    total,
    setResumen_orden_productos,
  } = useContext(RestauranteContext);
  const [cantidad, setCantidad] = useState("");
  const [precio, setPrecio] = useState("");

  let enviarOrden = (total_, idMesa_, resumen_orden_productos_) => {
    Alert.alert("¿Desea enviar su pedido?", "", [
      { text: "No" },
      {
        text: "Si",
        onPress: () => {
          try {
            fetch(baseURL + "saveOrder", {
              method: "POST",
              mode: "no-cors",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                montoTotal: total_,
                mesa_id: idMesa_,
                resumen_orden_productos: resumen_orden_productos_,
                estado: "PENDIENTE",
              }),
            })
              .then((res) => res.json())
              .catch((error) => console.error("Error", error))
              .then((response) => console.log("Exito", response));
              navigation.navigate("CounterScreen");
          } catch (e) {
            console.log(e);
          }
        },
      },
    ]);
  };

  const eliminarDelCarrito = (id) => {
    setCarrito(carrito.filter((item) => item.id != id));
    const array = resumen_orden_productos.filter(
      (producto) => producto.id != id
    );
    setResumen_orden_productos(array);
    console.log(resumen_orden_productos);
  };


  
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text>{"   "}</Text>

      {carrito.length === 0 ? (
        <Text style={styles.noProductos}>¡Añade tus productos al carrito!</Text>
      ) : (
        <View>
          <FlatList
            //contentContainerStyle={{paddingBottom: 80,flexGrow: 1,}}
            //ListFooterComponentStyle={{paddingHorizontal: 20, marginTop: 20}}
            style={styles.listado}
            data={carrito}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              return (
                <ProductoCarrito
                  item={item}
                  eliminarDelCarrito={eliminarDelCarrito}
                />
              );
            }}
          />
          <Pressable
            style={styles.btnNuevaCita}
            onPress={() => enviarOrden(total, idMesa, resumen_orden_productos)}
          >
            <Text style={styles.btnTextoNuevaCita}>Enviar pedido ${total}</Text>
          </Pressable>
        </View>
      )}
    </SafeAreaView>
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
    fontSize: 20,
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
    marginTop: 10,
    marginHorizontal: 20,
  },
});

export default CarritoScreen;
