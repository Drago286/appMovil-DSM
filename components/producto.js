import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

const baseURL = "http://192.168.1.86:8000/api/";

const Producto = ({
  item,
  setModalVisible,
  productoEditar,
  productoEliminar,
}) => {
  const [nombreCategoria, setNombreCategoria] = useState("");
  const [categorias, setCategorias] = useState([]);
  const { categoria_id, producto, descripcion, precio, id, nombre } = item;


  useEffect(() => {
    (async function () {
      try {
        const response = await fetch(baseURL + "categorias", {
          method: "GET",
        });
        const data = await response.json();
        setCategorias(data);
      } catch (error) {
        console.log("error categorias");
      }
    })();
  }, []);
  return (
    <View style={styles.contenedor}>
      <Text style={styles.label}>{"Nombre: " + nombre}</Text>

      <Text style={styles.texto}>Descripción:</Text>
      <Text style={styles.texto}>{descripcion}</Text>
      <Text style={styles.texto}>{"Precio: $" + precio}</Text>
      <Text style={styles.texto}>
        {"Categoria: "}
        <Text style={styles.textoCategoria}>{nombreCategoria}</Text>
      </Text>
      <View style={styles.contenedorBotones}>
        <Pressable
          style={[styles.btn, styles.btnEditar]}
          onLongPress={() => {
            setModalVisible(true);
            productoEditar(id);
          }}
        >
          <Text>Editar</Text>
        </Pressable>
        <Pressable
          style={[styles.btn, styles.btnEliminar]}
          onLongPress={() => productoEliminar(id)}
        >
          <Text>Eliminar</Text>
        </Pressable>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: "#FFF",
    padding: 20,
    borderBottomColor: "#94a3B8",
    borderBottomWidth: 1,
  },
  label: {
    color: "#374151",
    textTransform: "uppercase",
    fontWeight: "700",
    marginBottom: 10,
    fontSize: 20,
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
export default Producto;
