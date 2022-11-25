import React, { useState, useEffect,useContext } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import RestauranteContext from "./RestauranteContext";

const ProductoMenu = ({ item, props, addToCart }) => {
  const [contador, setContador] = useState(0);
  //const [carrito, setCarrito] = useContext(RestauranteContext);
  const [producto, setProducto] = useState([]);
  //const [arrayCarrito,setArrayCarrito] = useContext(RestauranteContext);

  const { nombre, descripcion, precio, id } = item;
 

  


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
        <Text style={{ fontSize: 17, fontWeight: "bold" ,marginBottom: 10,}}>${item.precio}</Text>
        <Pressable style={styles.actionBtn} onPress={()=> addToCart(item)}>
          <Text style={{
            fontSize: 15,
                        color: "white",
                        fontWeight : 'bold',
                        alignSelf : "center",
          }}>
            Añadir
          </Text>
        </Pressable>
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
    height: 100,
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
export default ProductoMenu;
