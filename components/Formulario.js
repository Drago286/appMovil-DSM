//rafce
import React, { useState, useEffect } from "react";

import {
  Modal,
  Text,
  StyleSheet,
  SafeAreaView,
  View,
  TextInput,
  ScrollView,
  Pressable,
  Dropdown,
  Alert,
} from "react-native";
//import DatePicker from 'react-native-date-picker';
import { Picker } from "@react-native-picker/picker";

const baseURL = "http://192.168.1.86:8000/api/";

const Formulario = (props) => {
  const [producto, setProducto] = useState("");
  const [nombre, setNombre] = useState("");
  const [categoria, setCategoria] = useState("");
  const [categorias, setCategorias] = useState([]);
  const [id, setId] = useState("");
  const [codigo, setCodigo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [idCategoria, setIdCategoria] = useState("");
  const [precio, setPrecio] = useState("");
  const arrayCategorias = new Array(categorias.length);
  const { modalVisible } = props;
  const { productos } = props;
  const { setProductos } = props;
  const { setModalVisible } = props;
  const { producto: productoObj } = props;
  const { setProducto: setProductoApp } = props;

  let inicio = 1;
  let fin = 99999999;

  useEffect(() => {
    (async function () {
      try {
        const response = await fetch(baseURL + "categorias", {
          method: "GET",
        });
        const data = await response.json();
        setCategorias(data);
        categoriasPicker();
        //console.log(data);
      } catch (error) {
        //console.log(error);
        console.log("error categorias");
      }
    })();
  }, []);
  let agregarProducto = (nombre_, descripcion_, precio_, codigo_) => {
    try {
      fetch(
        baseURL + "productos",
        {
          method: "POST",
          mode: "no-cors",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            codigo: codigo_,
            nombre: nombre_,
            descripcion: descripcion_,
            precio: precio_,
            categoria_id: 1,
          }),
        },
        console.log("agregado ")
      )
        .then((res) => res.json())
        .catch((error) => console.error("Error", error))
        .then((response) => console.log("Exito", response));
    } catch (e) {
      console.log(e);
    }
  };

  const editarProducto = (nombre_, descripcion_, precio_) => {
    try {
      console.log(id);
      const requestOptions = {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5",
        },
        body: JSON.stringify({
          id: id,
          nombre: nombre_,
          descripcion: descripcion_,
          precio: precio_,
          categoria_id: 2,

        })

      }
      fetch(baseURL + "productos/"+id,requestOptions)
        .then((res) => res.json())
        .catch((error) => console.error("Error", error))
        .then((response) => console.log("Exito", response));
    } catch (e) {
      console.log(e);
    }
  };

  const categoriasPicker = () => {
    for (var i = 0; i < categorias.length; i++) {
      arrayCategorias[i] = categorias[i].nombre;
      //console.log(arrayCategorias[i]);
    }
  };

  useEffect(() => {
    if (Object.keys(productoObj).length > 0) {
      setId(productoObj.id);
      setProducto(productoObj.producto);
      setNombre(productoObj.nombre);
      setCategoria(productoObj.categoria_id);
      setDescripcion(productoObj.descripcion);
      setIdCategoria(productoObj.idCategoria);
      setPrecio(productoObj.precio);
    }
  }, [productoObj]);

  const handleCita = () => {
    if ([nombre, descripcion, precio].includes("")) {
      //alerta para validar que todos los campos esten llenos.
      Alert.alert("Error", "Todos los campos son obligatorios.", [
        { text: "Recordar después", style: "cancel" },
        { text: "Cancelar" },
        { text: "Ok" },
      ]);
      return;
    }
    const nuevoProducto = {
      producto,
      nombre,
      descripcion,
      idCategoria,
      precio,
      categoria,
      codigo,
    };

    if (id) {
    
      nuevoProducto.id = id;
      
      const productosActualizados = productos.map((productoState) =>
        productoState.id === nuevoProducto.id ? nuevoProducto : productoState
        
      );
      setProductos(productosActualizados);
      editarProducto(nombre, descripcion, precio, nuevoProducto.codigo);
      setProductoApp({});
    } else {
      nuevoProducto.id = Date.now();
      let numeroRandom = Math.floor(Math.random()*9999999);
      setCodigo(numeroRandom);
      console.log("codigo random " + numeroRandom);
      setProductos([...productos, nuevoProducto]); 
      agregarProducto(nombre, descripcion, precio, numeroRandom);
    }

    setModalVisible(!modalVisible); //cierro el modal despues de guardar

    setId("");
    setCodigo("");
    setNombre("");
    setProducto("");
    setDescripcion("");
    setIdCategoria("");
    setPrecio("");
  };

  return (
    <Modal animationType="slide" visible={modalVisible}>
      <SafeAreaView style={styles.contenido}>
        <ScrollView>
          <Text style={styles.titulo}>
            {productoObj.id ? "Editar" : "Nuevo"}{" "}
            <Text style={styles.tituloBold}>Producto</Text>
          </Text>

          <View style={styles.campo}>
            <Text style={styles.label2}>Nombre Producto:</Text>
            <TextInput
              style={styles.input}
              placeholder="Nombre producto"
              placeholderTextColor={"#666"}
              value={nombre}
              onChangeText={setNombre}
            />
          </View>

          <View style={styles.campo}>
            <Text style={styles.label2}>Descripción:</Text>
            <TextInput
              style={styles.input}
              multiline
              placeholder="Ingrese descripción"
              placeholderTextColor={"#666"}
              keyboardType="email-address"
              value={descripcion}
              onChangeText={setDescripcion}
            />
          </View>

          <View style={styles.campo}>
            <Text style={styles.label2}>Precio</Text>
            <TextInput
              style={styles.input}
              placeholder="precio"
              placeholderTextColor={"#666"}
              keyboardType="phone-pad"
              value={precio}
              onChangeText={setPrecio}
              maxLength={12}
            />
          </View>

          <View style={styles.campo}>
            <Text style={styles.label2}>Categoria:</Text>
          </View>

          <Pressable style={styles.btnNuevaCita} onPress={handleCita}>
            <Text style={styles.btnNuevaCitaTexto}>
              {productoObj.id ? "Editar" : "Agregar"}
            </Text>
          </Pressable>
          <Pressable
            style={styles.btnCancelar}
            onLongPress={() => {
              setModalVisible(!modalVisible);
              setProductoApp({});
              setId("");
              setCodigo("");
              setNombre("");
              setProducto("");
              setDescripcion("");
              setIdCategoria("");
              setPrecio("");
              //SetEmail('');
              //etTelefono("");
              //setFecha(new Date());
              //setSintomas('');
            }}
          >
            <Text style={styles.btnCancelarTexto}>Cancelar</Text>
          </Pressable>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  contenido: {
    backgroundColor: "#67b5a3",
    flex: 1,
  },
  titulo: {
    fontSize: 30,
    fontWeight: "600",
    textAlign: "center",
    marginTop: 30,
    color: "#FFF",
  },
  tituloBold: {
    fontWeight: "900",
  },
  btnCancelar: {
    //marginVertical: 30,
    backgroundColor: "#5827A4",
    marginHorizontal: 30,
    padding: 10,
    width: 150,
    borderRadius: 10,
    alignSelf: "center",
  },
  btnCancelarTexto: {
    color: "#FFF",
    textAlign: "center",
    fontWeight: "900",
    fontSize: 16,
    textTransform: "uppercase",
  },
  campo: {
    marginTop: 10,
    marginHorizontal: 30,
  },
  label: {
    color: "#FFF",
    marginBottom: 10,
    marginTop: 15,
    fontSize: 10,
    fontWeight: "600",
  },
  label2: {
    color: "#FFF",
    marginBottom: 10,
    marginTop: 15,
    fontSize: 20,
    fontWeight: "700",
  },
  input: {
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 10,
    fontSize: 17,
    fontWeight: "500",
  },
  sintomasInput: {
    height: 100,
  },
  fechaContenedor: {
    backgroundColor: "#FFF",
    borderRadius: 10,
  },
  btnNuevaCita: {
    marginVertical: 50,
    backgroundColor: "#F59E0B",
    paddingVertical: 15,
    marginHorizontal: 30,
    borderRadius: 10,
  },
  btnNuevaCitaTexto: {
    color: "white",
    textAlign: "center",
    fontWeight: "800",
    fontSize: 16,
    textTransform: "uppercase",
    marginHorizontal: 30,
    padding: 10,
    width: 150,
    borderRadius: 10,
    alignSelf: "center",
  },
});

export default Formulario;
