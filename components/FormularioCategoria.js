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
  ViewHorizontal,
} from "react-native";
//import DatePicker from 'react-native-date-picker';
import { Picker } from "@react-native-picker/picker";

const baseURL = "http://192.168.1.88:8000/api/";

const Formulario = (props) => {

  const [nombre, setNombre] = useState("");
  const [id, setId] = useState("");
  const { modalVisible } = props;
  const { categorias } = props;
  const { setCategorias } = props;
  const { setModalVisible } = props;
  const { categoria: categoriaObj } = props;
  const { setCategoria: setCategoriaApp } = props;


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


  let agregarcategoria = (nombre_) => {
    try {
      fetch(
        baseURL + "categorias",
        {
          method: "POST",
          mode: "no-cors",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nombre: nombre_,
           
          }),
        },
      )
        .then((res) => res.json())
        .catch((error) => console.error("Error", error))
        .then((response) => console.log("Exito", response));
    } catch (e) {
      console.log(e);
    }
  };

  const editarcategoria = (nombre_) => {
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
        })

      }
      fetch(baseURL + "categorias/"+id,requestOptions)
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
    if (Object.keys(categoriaObj).length > 0) {
        setId(categoriaObj.id);
      setNombre(categoriaObj.nombre);
    }
  }, [categoriaObj]);

  const handleCita = () => {
    if ([nombre].includes("")) {
      //alerta para validar que todos los campos esten llenos.
      Alert.alert("Error", "Todos los campos son obligatorios.", [
        { text: "Recordar después", style: "cancel" },
        { text: "Cancelar" },
        { text: "Ok" },
      ]);
      return;
    }
    const nuevaCategoria = {
      nombre,
    };

    if (id) {
    
      nuevaCategoria.id = id;
      
      const categoriasActualizados = categorias.map((categoriaState) =>
        categoriaState.id === nuevaCategoria.id ? nuevaCategoria : categoriaState
        
      );
      setCategorias(categoriasActualizados);
      editarcategoria(nombre);
      setCategoriaApp({});
    } else {
      nuevaCategoria.id = Date.now();
    //   let numeroRandom = Math.floor(Math.random()*9999999);
    //   setCodigo(numeroRandom);
      setCategorias([...categorias, nuevaCategoria]); 
      agregarcategoria(nombre);
    }

    setModalVisible(!modalVisible); //cierro el modal despues de guardar

    setId("");
    setNombre("");
  };

  return (
    <Modal animationType="slide" visible={modalVisible}>
      <SafeAreaView style={styles.contenido}>
        <ScrollView>
          <Text style={styles.titulo}>
            {categoriaObj.id ? "Editar" : "Nuevo"}{" "}
            <Text style={styles.tituloBold}>categoria</Text>
          </Text>

          <View style={styles.campo}>
            <Text style={styles.label2}>Nombre categoria:</Text>
            <TextInput
              style={styles.input}
              placeholder="Nombre categoria"
              placeholderTextColor={"#666"}
              value={nombre}
              onChangeText={setNombre}
            />
          </View>
          <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",

          }}>
          <Pressable style={styles.btnNuevocategoria} onPress={handleCita}>
            <Text style={styles.btnNuevocategoriaTexto}>
              {categoriaObj.id ? "Editar" : "Agregar"}
            </Text>
          </Pressable>
          <Pressable
            style={styles.btnCancelar}
            onLongPress={() => {
              setModalVisible(!modalVisible);
              setCategoriaApp({});
              setId("");
              
              setNombre("");
              
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
    marginBottom: 10,
  },

  btnNuevocategoria: {
      //marginVertical: 30,
      backgroundColor: "#F59E0B",
      marginHorizontal: 30,
      padding: 10,
      width: 120,
      borderRadius: 10,
      alignSelf: "center",
   
  },
  btnNuevocategoriaTexto: {
    color: "white",
    textAlign: "center",
    fontWeight: "900",
    fontSize: 16,
    textTransform: "uppercase",
  },
});

export default Formulario;
