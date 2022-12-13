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
  Button,
  Dropdown,
  Alert,
  Image,
  ViewHorizontal,
} from "react-native";
//import DatePicker from 'react-native-date-picker';
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import { categoriasContext } from "../screens/Administrador/AdministradorScreen";
import axios from "axios";
import * as FileSystem from "expo-file-system";

const baseURL = "http://192.168.1.82:8000/api/";

const Formulario = (props, navigation) => {
  const [producto, setProducto] = useState("");
  const [nombre, setNombre] = useState("");
  const [categoria, setCategoria] = useState("");
  const [urlImagen, setUrlImagen] = useState("");
  const [id, setId] = useState("");
  const [codigo, setCodigo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [idCategoria, setIdCategoria] = useState("");
  const [precio, setPrecio] = useState("");
  const [stock, setStock] = useState("");
  const [selectPicker, setSelectPicker] = useState("");
  const { modalVisible } = props;
  const { productos } = props;
  const { setProductos } = props;
  const { productoEditar } = props;
  const { setModalVisible } = props;
  const { producto: productoObj } = props;
  const { setProducto: setProductoApp } = props;
  const { categorias: categorias } = props;
  const [image, setImage] = useState("https://via.placeholder.com/200");
  const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();

  const handleChoosePhoto = async () => {
    
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);
    let path = result.uri;
    if (Platform.OS === "ios") {
      path = "~" + path.substring(path.indexOf("/Documents"));
    }
    if (!result.fileName) result.fileName = path.split("/").pop();

    if (!result.canceled) {
      setImage(result.uri);
    }

    if (result.errorCode) {
      console.log(result.errorMessage);
    } else if (result.didCancel) {
      console.log("El usuario cancelo la acción");
    } else {
      console.log(result);
      const path = result.uri;
      setImage(path);
      console.log(result.uri);
      uploadImage(result, result.uri);
    }
  };
  const uploadImage = async (result, uri) => {
    uri = Platform.OS === "android" ? uri : uri.replace("file://", "");

    console.log(uri);
    const formData = new FormData();

    formData.append("image", {
      uri: uri,
      name: result.uri.split("/").pop(),
      type: result.type,
    });

    try {
      fetch(baseURL + "upload", {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
          'Accept': 'application/json, text/plain, */*',
        },
        body: formData,
      })
        .then((res) => res.json())
        .catch((error) => console.error("Error", error))
        .then((response) => {
          if (!response.isSuccess) {
            console.log(response);
            alert("Image upload failed!");
            return;
          }
          console.log(response.uri);
          setUrlImagen(response.url);
          alert("Imagen subida al BackEnd!");
        });
    } catch (e) {
      console.log(e);
    }
  };
 
  
  let agregarProducto = (
    nombre_,
    descripcion_,
    precio_,
    codigo_,
    stock_,
    categoria_,
    nuevoProducto,
    urlImagen_,
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
          imagen: urlImagen_,
        }),
      })
        .then((res) => res.json())
        .catch((error) => console.error("Error", error))
        .then((response) => validar(response, nuevoProducto));
    } catch (e) {
      console.log(e);
    }
  };

  const editarProducto = (nombre_, descripcion_, precio_, stock_,idImage) => {
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
          categoria_id: selectPicker,
        }),
      };
      fetch(baseURL + "productos/" + id, requestOptions)
        .then((res) => res.json())
        .catch((error) => console.error("Error", error))
        .then((response) => validar_update(response));
    } catch (e) {
      console.log(e);
    }
  };
  const validar = (response, nuevoProducto) => {
    //captura de erores del backEnd
    console.log(response);
    if (response.status === 100) {
      Alert.alert("Error", response.message.nombre[0].toString(), [
        { text: "Ok" },
      ]);
    } else {
      //cerar modal y actualizar array
      setProductos([...productos, nuevoProducto]);
      setModalVisible(!modalVisible); //cierro el modal despues de guardar

      setId("");
      setCodigo("");
      setNombre("");
      setProducto("");
      setDescripcion("");
      setIdCategoria("");
      setPrecio("");
      setStock("");
      setSelectPicker("");
      setUrlImagen("");
    }
  };
  const validar_update = (response) => {
    console.log(response);
    //captura de erores del backEnd
    if (response.status === 100) {
      Alert.alert("Error", response.message.numero[0].toString(), [
        { text: "Ok" },
      ]);
    } else {
      //cerar modal y actualizar array
      setModalVisible(!modalVisible); //cierro el modal despues de guardar

      setId("");
      setCodigo("");
      setNombre("");
      setProducto("");
      setDescripcion("");
      setIdCategoria("");
      setPrecio("");
      setStock("");
      setSelectPicker("");
      setUrlImagen("");
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
      setStock(productoObj.stock);
      setUrlImagen(productoObj.urlImagen)
    }
  }, [productoObj]);

  const ingresarProducto = () => {
    if ([nombre, descripcion, precio, stock, selectPicker].includes("")) {
      //alerta para validar que todos los campos esten llenos.
      Alert.alert("Error", "Todos los campos son obligatorios.", [
        { text: "Cancelar" },
        { text: "Ok" },
      ]);
      return;
    }
    if (precio < 0) {
      Alert.alert("Error", "El valor PRECIO no puede ser negativo", [
        { text: "Cancelar" },
        { text: "Ok" },
      ]);
      return;
    }
    if (stock < 0) {
      Alert.alert("Error", "El valor STOCK no puede ser negativo", [
        { text: "Cancelar" },
        { text: "Ok" },
      ]);
      return;
    }
    const nuevoProducto = {
      //producto,
      nombre,
      descripcion,
      idCategoria,
      precio,
      urlImagen,
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
      editarProducto(nombre, descripcion, precio, stock,urlImagen);
      //setProductoApp({});
    } else {
      nuevoProducto.id = Date.now();
      let numeroRandom = Math.floor(Math.random() * 9999999);
      setCodigo(numeroRandom);
      //setProductos([...productos, nuevoProducto]);
      agregarProducto(
        nombre,
        descripcion,
        precio,
        numeroRandom,
        stock,
        selectPicker,
        nuevoProducto,
        urlImagen,
      );
    }

    // setModalVisible(!modalVisible); //cierro el modal despues de guardar

    // setId("");
    // setCodigo("");
    // setNombre("");
    // setProducto("");
    // setDescripcion("");
    // setIdCategoria("");
    // setPrecio("");
    // setStock("");
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
              placeholder="Ingrese precio"
              placeholderTextColor={"#666"}
              keyboardType="phone-pad"
              value={productoObj.precio}
              onChangeText={setPrecio}
              maxLength={12}
            />
          </View>
          <View style={styles.campo}>
            <Text style={styles.label2}>Stock</Text>
            <TextInput
              style={styles.input}
              placeholder="Ingrese stock"
              placeholderTextColor={"#666"}
              keyboardType="phone-pad"
              value={productoObj.stock}
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
            itemStyle={{ height: 80 }}
          >
            <Picker.Item
              style={{ color: "white" }}
              label="- Seleccione -"
              value=""
            />
            {categorias.map((elemento) => (
              <Picker.Item
                key={elemento.id}
                label={elemento.nombre}
                value={elemento.id}
              />
            ))}
          </Picker>

          <Pressable
            style={styles.btnImagen}
            onPress={() => handleChoosePhoto()}
          >
            <Text style={styles.btnNuevoProducto}>
                {productoObj.id ? "Editar" : "Agregar"}
              </Text>
          </Pressable>

          <Image
            style={{
              alignSelf: "center",
              height: 200,
              width: 200,
              marginBottom: 20,
            }}
            source={{ uri: image }}
          /> 
         
       
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Pressable
              style={styles.btnNuevoProducto}
              onPress={ingresarProducto}
            >
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
  btnImagen: {
    backgroundColor: "#Fafa",
    marginHorizontal: 80,
    marginTop: 20,
    paddingVertical: 10,
    borderRadius: 40,
    marginBottom: 20,
  },
  btnImagenTexto: {
    fontSize: 25,
    textAlign: "center",
    color: "#000",
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
    borderRadius: 10,
    fontSize: 17,
    marginBottom: 10,
    width: 330,
    alignSelf: "center",
  },

  btnNuevoProducto: {
    //marginVertical: 30,
    backgroundColor: "#F59E0B",
    marginHorizontal: 30,
    padding: 10,
    width: 120,
    borderRadius: 10,
    alignSelf: "center",
    marginBottom: 10,
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
