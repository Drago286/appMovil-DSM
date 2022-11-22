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
  ViewHorizontal,
} from "react-native";
//import DatePicker from 'react-native-date-picker';
import { Picker } from "@react-native-picker/picker";
import { categoriasContext } from "../screens/Administrador/AdministradorScreen";

const baseURL = "http://192.168.1.86:8000/api/";

const Formulario = (props, navigation) => {
  const [producto, setProducto] = useState("");
  const [nombre, setNombre] = useState("");
  const [categoria, setCategoria] = useState("");
  //const [categorias, setCategorias] = useState(categoriasContext);
  const [id, setId] = useState("");
  const [codigo, setCodigo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [idCategoria, setIdCategoria] = useState("");
  const [precio, setPrecio] = useState("");
  const [stock, setStock] = useState("");
  //const arrayCategorias = new Array(categorias.length);
  const [categotiaPicker, setCategoriaPicker] = useState("");
  const [selectPicker, setSelectPicker] = useState("");
  const { modalVisible } = props;
  const { productos } = props;
  const { setProductos } = props;
  const { setModalVisible } = props;
  const { producto: productoObj } = props;
  const { setProducto: setProductoApp } = props;
  const { categorias: categorias } = props;
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
      } catch (error) {
        console.log("error categorias");
      }
    })();
  }, []);
  let agregarProducto = (
    nombre_,
    descripcion_,
    precio_,
    codigo_,
    stock_,
    categoria_
  ) => {
    try {
      fetch(baseURL + "productos", {
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
          stock: stock_,
          categoria_id: categoria_,
        }),
      })
        .then((res) => res.text())
        .catch((error) => console.error("Error", error))
        .then((response) => console.log("Exito", response));
    } catch (e) {
      console.log(e);
    }
  };

  const editarProducto = (nombre_, descripcion_, precio_, stock_) => {
    try {
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
          stock: stock_,
          categoria_id: 2,
        }),
      };
      fetch(baseURL + "productos/" + id, requestOptions)
        .then((res) => res.json())
        .catch((error) => console.error("Error", error))
        .then((response) => console.log("Exito", response));
    } catch (e) {
      console.log(e);
    }
  };

  const recorrerCaterias = () => {
    for (var i = 0; i < 10; i++) {
      console.log(categorias[i]);
      //onsole.log(i);
    }
  };

  // const categoriasPicker = () => {
  //   for (var i = 0; i < categorias.length; i++) {
  //     arrayCategorias[i] = categorias[i].nombre;
  //     //console.log(arrayCategorias[i]);
  //   }
  // };

  useEffect(() => {
    if (Object.keys(productoObj).length > 0) {
      setId(productoObj.id);
      setProducto(productoObj.producto);
      setNombre(productoObj.nombre);
      setCategoria(productoObj.categoria_id);
      setDescripcion(productoObj.descripcion);
      setIdCategoria(productoObj.idCategoria);
      setPrecio(productoObj.precio);
      setStock(productoObj.stock);
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
      stock,
    };

    if (id) {
      nuevoProducto.id = id;

      const productosActualizados = productos.map((productoState) =>
        productoState.id === nuevoProducto.id ? nuevoProducto : productoState
      );
      setProductos(productosActualizados);
      editarProducto(nombre, descripcion, precio, stock);
      setProductoApp({});
    } else {
      nuevoProducto.id = Date.now();
      let numeroRandom = Math.floor(Math.random() * 9999999);
      setCodigo(numeroRandom);
      setProductos([...productos, nuevoProducto]);
      agregarProducto(
        nombre,
        descripcion,
        precio,
        numeroRandom,
        stock,
        selectPicker
      );
    }

    setModalVisible(!modalVisible); //cierro el modal despues de guardar

    setId("");
    setCodigo("");
    setNombre("");
    setProducto("");
    setDescripcion("");
    setIdCategoria("");
    setPrecio("");
    setStock("");
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
            <Text style={styles.label2}>Stock</Text>
            <TextInput
              style={styles.input}
              placeholder="stock"
              placeholderTextColor={"#666"}
              keyboardType="phone-pad"
              value={stock}
              onChangeText={setStock}
              maxLength={12}
            />
          </View>

          <View style={styles.campo}>
            <Text style={styles.label2}>Categoria:</Text>
            
          </View>
          <Picker
              selectedValue={selectPicker}
              onValueChange={(select) => setSelectPicker(select)}
              style={styles.picker}
              
            >
              <Picker.Item style={{color:'white'}} label="- Seleccione -" value="" />
              {categorias.map((elemento) => (
                <Picker.Item
                  key={elemento.id}
                  label={elemento.nombre}
                  value={elemento.id}
                />
              ))}
            </Picker>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Pressable style={styles.btnNuevoProducto} onPress={handleCita}>
              <Text style={styles.btnNuevoProductoTexto}>
                {productoObj.id ? "Editar" : "Agregar"}
              </Text>
            </Pressable>
           
            <Pressable
              style={styles.btnCancelar}
              onPress={() => {
                setModalVisible(!modalVisible);
                setProductoApp({});
                setId("");
                setCodigo("");
                setNombre("");
                setProducto("");
                setDescripcion("");
                setIdCategoria("");
                setPrecio("");
                setStock("");
                //SetEmail('');
                //etTelefono("");
                //setFecha(new Date());
                //setSintomas('');
              }}
            >
              <Text style={styles.btnCancelarTexto}>Cancelar</Text>
            </Pressable>
          </View>
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
    backgroundColor: "red",
    marginHorizontal: 30,
    padding: 10,
    width: 120,
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
  picker: {
    backgroundColor: "#FFF",
    padding: 0,
    borderRadius: 10,
    fontSize: 17,
    fontWeight: "500",
    marginBottom: 10,
  },

  btnNuevoProducto: {
    //marginVertical: 30,
    backgroundColor: "#F59E0B",
    marginHorizontal: 30,
    padding: 10,
    width: 120,
    borderRadius: 10,
    alignSelf: "center",
  },
  btnNuevoProductoTexto: {
    color: "white",
    textAlign: "center",
    fontWeight: "900",
    fontSize: 16,
    textTransform: "uppercase",
  },
});

export default Formulario;
