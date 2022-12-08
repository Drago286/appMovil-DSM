import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

const baseURL = "http://192.168.1.176:8000/api/";

const Categoria = ({
  item,
  setModalVisible,
  categoriaEditar,
  categoriaEliminar,
}) => {
  const [nombreCategoria, setNombreCategoria] = useState("");
  const [categorias, setCategorias] = useState([]);
  const { nombre,id } = item;


  useEffect(() => {
    (async function () {
      try {
        const response = await fetch(baseURL + "categorias", {
          method: "GET",
        });
        const data = await response.json();
        setCategorias(data);
      } catch (error) {
        console.log("error categorias no ");
      }
    })();
  }, []);
  return (
    <View style={styles.contenedor}>
      <Text style={styles.label}>{nombre}</Text>
      <View style={styles.contenedorBotones}>
        <Pressable
          style={[styles.btn, styles.btnEditar]}
          onPress={() => {
            setModalVisible(true);
            categoriaEditar(id);
          }}
        >
          <Text>Editar</Text>
        </Pressable>
        <Pressable
          style={[styles.btn, styles.btnEliminar]}
          onPress={() => categoriaEliminar(id)}
        >
          <Text style = {{color: "white"}}>Eliminar</Text>
        </Pressable>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  contenedor: {
    elevation: 15,
    borderRadius : 10,
    backgroundColor: "white",
    padding: 20,
    borderBottomColor: "#94a3B8",
    marginVertical: 10,
  },
  label: {
    color: "#374151",
    textTransform: "uppercase",
    fontWeight: "700",
    marginBottom: 10,
    fontSize: 20,
    alignSelf : "center",
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
});
export default Categoria;
