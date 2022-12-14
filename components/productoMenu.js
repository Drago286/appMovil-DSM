import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, Pressable, Image, SafeAreaView } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import RestauranteContext from "./RestauranteContext";
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';

const LeftContent = props => <Avatar.Icon {...props} icon="folder" />


const ProductoMenu = ({ item, props, addToCart }) => {
  const [imagens, setImagens] = useState([]);
  const [imagenSource, setImagenSource] = useState("");
  const { nombre, descripcion, precio, id, imagen} = item;
   


  return (
    <SafeAreaView>
    <View style={styles.contenedor}>
    <View
      style={{
        height: 250,
        marginLeft: 10,
        //paddingVertical: 15,
        flex: 1,
      }}
    >
      <Text style={{ fontWeight: "bold", fontSize: 16 }}>{item.nombre}</Text>
      <Text style={{ fontSize: 13, color: "grey" }}>{item.descripcion}</Text>
      <Image
        style={{
          alignSelf: "center",
          height: 100,
          width: 100,
          marginBottom: 20,
        }}
        source={{ uri: imagen }}
      />
      <Text style={{ fontSize: 17, fontWeight: "bold", marginBottom: 10 }}>
        ${item.precio}
      </Text>
      <Text style={{ fontSize: 15, fontWeight: "bold", marginBottom: 10 }}>
        Stock disponible: {item.stock}
      </Text>
     
      <Pressable style={styles.actionBtn} onPress={() => addToCart(item)}>
        <Text
          style={{
            fontSize: 15,
            color: "white",
            fontWeight: "bold",
            alignSelf: "center",
          }}
        >
          Añadir
        </Text>
      </Pressable>
    </View>
  </View>
  </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    height: 250,
    elevation: 15,
    borderRadius: 10,
    backgroundColor: "white",
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
