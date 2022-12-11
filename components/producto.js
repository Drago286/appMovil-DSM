import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Pressable,Image } from "react-native";
import Formulario from "./Formulario";

const baseURL = "http://192.168.1.176:8000/api/";

const Producto = ({
  item,
 setModalVisible,
  productoEditar,
  productoEliminar,
  cantidad,
}) => {
  const [nombreCategoria, setNombreCategoria] = useState("");
  const [categorias, setCategorias] = useState([]);
  const [imagenes, setImagens] = useState([]);
  const [imagenSource, setImagenSource] = useState("");
  const { categoria_id, producto, descripcion, precio, id, nombre,stock,imagen } = item;


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
  useEffect(() => {
    (async function () {
      try {
        const response = await fetch(baseURL + "imagens", {
          method: "GET",
        });
        const data = await response.json();
        setImagens(data);
        setImagenSource(imagenes.find(element => element.id === item.imagen))
        console.log(imagenSource);
        
      } catch (error) {
        console.log("error imagenes");
      }
    })();
  }, []);
  return (
    <View style={styles.contenedor}>
      <Text style={styles.label}>{nombre}</Text>

      <Text style={styles.texto}>Descripción:</Text>
      <Text style={styles.texto2}>{descripcion}</Text>
      <Text style={styles.texto}>{"Precio: $" + precio}</Text>

      <Text style={styles.texto}>{"Stock: " + stock}</Text>
      <Image
            style={{
              alignSelf: "center",
              height: 100,
              width: 100,
              marginBottom: 20,
            }}
            source={{  uri:imagen }}
          />
    
      
      <View style={styles.contenedorBotones}>
        <Pressable
          style={[styles.btn, styles.btnEditar]}
          onPress={() => {
            setModalVisible(true);
            productoEditar(id);
          }}
        >
          <Text>Editar</Text>
        </Pressable>
        <Pressable
          style={[styles.btn, styles.btnEliminar]}
          onPress={() => productoEliminar(id)}
        >
          <Text style={{color: "white"}}>Eliminar</Text>
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
  },
  texto: {
    color: "#374151",
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 10,
  },
  texto2: {
    color: "grey",
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 8,
  },
  textoCategoria: {
    color: "#374151",
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 10,
    textTransform: "uppercase",
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
