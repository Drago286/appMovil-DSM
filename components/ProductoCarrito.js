import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, Pressable, Alert } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
 
import RestauranteContext from "./RestauranteContext";

const ProductoMenu = ({ item, eliminarDelCarrito, modificarMonto }) => {
  const [contador, setContador] = useState(1);
  const { total, setTotal, resumen_orden_productos } =
    useContext(RestauranteContext);

  const { nombre, descripcion, precio, id } = item;

  /**
   * 
   * @returns Actuliza la cantidad del producto seleccionado.
   */
  const disminuirContador = () => {
    if (contador <= 1) {
      Alert.alert(
        "¿Deseas anular este producto del pedido?",
        "Se eliminará solo el producto: '" + nombre + "'",
        [
          { text: "Cancelar" },
          {
            text: "Si, Eliminar",
            onPress: () => {
              eliminarDelCarrito(id);
              var subTotal = total;
              setTotal((subTotal -= item.precio * contador));
              
            
            },
          },
        ]
      );
      return;
    } else {
      setContador(contador - 1);
      var subTotal = total;
      setTotal((subTotal -= item.precio));
      for (var i = 0; i < resumen_orden_productos.length; i++) {
        if (resumen_orden_productos[i].producto_id === item.id) {
          resumen_orden_productos[i].cantidad--;
        }
      }
      console.log(resumen_orden_productos);
    }
  };

  /**
   * Verfica si hay stock suficiente,
   * Actualiza la cantidad del producto seleccionado.
   */
  const aumentarContador = () => {
    if (contador < item.stock) {
      setContador(contador + 1);
      var subTotal = total;
      setTotal(subTotal + item.precio);

      for (var i = 0; i < resumen_orden_productos.length; i++) {
        if (resumen_orden_productos[i].producto_id === item.id) {
          if (resumen_orden_productos[i].cantidad < item.stock) {
            resumen_orden_productos[i].cantidad++;
          }
        }
      }
    }else {
      Alert.alert(
        "UPS!",
        "Solo tenemos esta cantidad en stock: " + item.stock ,
        [{ text: "Ok" }]
      );
    }

    console.log(resumen_orden_productos);
  };

  /**
   * vista.
   */
  return (
    <View style={styles.contenedor}>
      <View
        style={{
          height: 140,
          marginLeft: 10,
          paddingVertical: 20,
          flex: 1,
        }}
      >
        <Text style={{ fontWeight: "bold", fontSize: 16 }}>{item.nombre}</Text>
        <Text style={{ fontSize: 13, color: "grey" }}>{item.descripcion}</Text>
        <Text style={{ fontSize: 17, fontWeight: "bold" }}>
          ${item.precio * contador}
        </Text>
      </View>
      <View style={{ marginRight: 20, alignItems: "center" }}>
        <Text style={{ fontWeight: "bold", fontSize: 18 }}>{contador}</Text>
        <View style={styles.actionBtn}>
        {contador === 1 ? (
         <Icon
        name = "block"
         size={25}
         color={"white"}
         onPress={() => disminuirContador()}
       />)
          : 
          (
            <Icon
            name="remove"
            size={25}
            color={"white"}
            onPress={() => disminuirContador()}
          />
          )}
          <Icon
            name="add"
            size={25}
            color={"white"}
            onPress={() => aumentarContador()}
          />
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  contenedor: {
    height: 120,
    elevation: 15,
    borderRadius: 10,
    backgroundColor: "white",
    marginVertical: 10,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  label: {
    color: "#374151",
    textTransform: "uppercase",
    fontWeight: "700",
    marginBottom: 10,
    fontSize: 20,
    alignSelf: "center",
  },
  texto: {
    color: "#374151",
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 10,
  },
  textoCategoria: {
    color: "#374151",
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 10,
    textTransform: "uppercase",
  },
  fecha: {
    color: "#374151",
  },
  contenedorBotones: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  btn: {
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  btnEditar: {
    backgroundColor: "#F59E0B",
  },
  btnEliminar: {
    backgroundColor: "#EF4444",
  },
  btnTexto: {
    textTransform: "uppercase",
    fontWeight: "700",
    fontSize: 12,
    color: "#FFF",
  },
  header: {
    paddingVertical: 20,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
  },
  cartCard: {
    height: 150,
    elevation: 15,
    borderRadius: 10,
    backgroundColor: "#FFF",
    marginVertical: 10,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  actionBtn: {
    width: 80,
    height: 30,
    backgroundColor: "#F9813A",
    borderRadius: 30,
    paddingHorizontal: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
  },
});
export default ProductoMenu;
