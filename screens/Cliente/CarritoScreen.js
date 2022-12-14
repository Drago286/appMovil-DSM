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

const CarritoScreen = ({ navigation }) => {
  const {
    carrito,
    setCarrito,
    idMesa,
    resumen_orden_productos,
    total,
    setResumen_orden_productos,
    baseURL,
  } = useContext(RestauranteContext);

  /**
   *
   * @param {total del pedido} total_
   * @param {id de la mesa del pedido} idMesa_
   * @param {array con detalle del pedido} resumen_orden_productos_
   * Metodo POST con detalle del pedido.
   */
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
                tiempo: 0,
                mesa_id: idMesa_,
                resumen_orden_productos: resumen_orden_productos_,
                estado: "PENDIENTE",
              }),
            })
              .then((res) => res.json())
              .catch((error) => console.error("Error", error))
              .then((response) => {console.log("Exito", response);
              if (response.isSuccess) {
                console.log("navegando...");
                navigation.navigate("CounterScreen",{ id: response.id });
              }
            });
              
          } catch (e) {
            console.log(e);
          }
        },
      },
    ]);
  };

  /**
   *
   * @param {id del producto seleccionado} id
   * Elimina el producto del carrito
   */
  const eliminarDelCarrito = (id) => {
    console.log(carrito);
    setCarrito(carrito.filter((item) => item.id != id));
    console.log(carrito);
    const array = resumen_orden_productos.filter(
      (orden) => orden.producto_id != id
    );
    setResumen_orden_productos(array);
    console.log(resumen_orden_productos);
    console.log(carrito);
  };
  /**
   * vista.
   */
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text>{"   "}</Text>

      {carrito.length === 0 ? (
        <Text style={styles.noProductos}>¡Añade tus productos al carrito!</Text>
      ) : (
        <View>
          <Pressable
            style={styles.btnNueva}
            onPress={() => enviarOrden(total, idMesa, resumen_orden_productos)}
          >
            <Text style={styles.btnTextoNueva}>Enviar pedido ${total}</Text>
          </Pressable>
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
  btnNueva: {
    backgroundColor: "orange",
    padding: 15,
    marginTop: 30,
    marginHorizontal: 20,
    borderRadius: 10,
  },
  btnTextoNueva: {
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
    marginBottom : 100,
    marginHorizontal: 20,
  },
});

export default CarritoScreen;
