import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Pressable,Alert } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
const baseURL = "http://192.168.1.85:8000/api/";

const ProductoMenu = ({ item , eliminarDelCarrito}) => {
  const [contador, setContador] = useState(1);

  const { nombre, descripcion, precio, id } = item;

  const disminuirContador = () => {
    if (contador <=1) {
      Alert.alert(
        "¿Deseas anular este producto del pedido?",
        "Se eliminará solo el producto: '"+nombre+"'",
        [
          { text: "Cancelar" },
          {
            text: "Si, Eliminar",
            onPress: () => {
              eliminarDelCarrito(id);
            },
          },
        ]
      );
      return;
    } else {
      setContador(contador - 1);
    }
  };
  const aumentarContador = () => {
    setContador(contador + 1);
  };

  return (
    <View>
      
        <Text style={{ fontWeight: "bold", fontSize: 16 }}>Unidades: {item.cantidad}</Text>
        
      
    </View>
  );
};
const styles = StyleSheet.create({
  contenedor: {
    height: 140,
    elevation: 15,
    width: 300,
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
