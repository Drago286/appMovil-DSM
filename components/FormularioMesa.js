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

const baseURL = "http://192.168.1.82:8000/api/";

const Formulario = (props) => {
  const [numero, setNumero] = useState("");

  const [id, setId] = useState("");

  const { modalVisible } = props;
  const { mesas } = props;
  const { setMesas } = props;
  const { setModalVisible } = props;
  const { mesa: mesaObj } = props;
  const { setMesa: setMesaApp } = props;

  useEffect(() => {
    (async function () {
      try {
        const response = await fetch(baseURL + "mesas", {
          method: "GET",
        });
        const data = await response.json();
        setMesas(data);
      } catch (error) {
        console.log("error mesas");
      }
    })();
  }, []);
  let agregarMesa = (numero_,nuevaMesa) => {
    try {
      fetch(baseURL + "mesas", {
        method: "POST",
        mode: "no-cors",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          numero: numero_,
        }),
      })
        .then((res) => res.json())
        .catch((error) => console.error("Error", error))
        .then((response) => validar(response,nuevaMesa));
    } catch (e) {
      console.log(e);
    }
  };
  const validar = (response,nuevaMesa) => {
    //captura de erores del backEnd
    console.log(response);
    if (response.status === 100) {
      Alert.alert("Error", response.message.numero[0].toString(), [
        { text: "Ok" },
      ]);
    } else {
      //cerar modal y actualizar array
      setMesas([...mesas, nuevaMesa]);
      setModalVisible(!modalVisible); //cierro el modal despues de guardar
      setNumero("");
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
      setNumero("");
    }
  };
  const editarMesa = (numero_) => {
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
          numero: numero_,
        }),
      };
      fetch(baseURL + "mesas/" + id, requestOptions)
        .then((res) => res.json())
        .catch((error) => console.error("Error", error))
        .then((response) => validar_update(response));
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (Object.keys(mesaObj).length > 0) {
      setId(mesaObj.id);
      setNumero(mesaObj.numero);
    }
  }, [mesaObj]);

  const ingresarMesa = () => {
    if ([numero].includes("")) {
      //alerta para validar que todos los campos esten llenos.
      Alert.alert("Error", "Todos los campos son obligatorios.", [
        { text: "Recordar después", style: "cancel" },
        { text: "Cancelar" },
        { text: "Ok" },
      ]);
      return;
    }
    const nuevaMesa = {
      numero,
    };

    if (id) {
      nuevaMesa.id = id;

      const mesasActualizadas = mesas.map((mesasState) =>
        mesasState.id === nuevaMesa.id ? nuevaMesa : mesasState
      );
      setMesas(mesasActualizadas);
      editarMesa(numero);
      //setMesaApp({});
    } else {
      nuevaMesa.id = Date.now();
      //setMesas([...mesas, nuevaMesa]);
      agregarMesa(numero,nuevaMesa);
    }

    // setModalVisible(!modalVisible); //cierro el modal despues de guardar

    // setId("");
    // setNumero("");
  };

  return (
    <Modal animationType="slide" visible={modalVisible}>
      <SafeAreaView style={styles.contenido}>
        <ScrollView>
          <Text style={styles.titulo}>
            {mesaObj.id ? "Editar" : "Nuevo"}{" "}
            <Text style={styles.tituloBold}>mesa</Text>
          </Text>

          <View style={styles.campo}>
            <Text style={styles.label2}>Número de mesa:</Text>
            <TextInput
              style={styles.input}
              placeholder="N°mesa"
              placeholderTextColor={"#666"}
              value={numero}
              onChangeText={setNumero}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Pressable style={styles.btnNuevocategoria} onPress={ingresarMesa}>
              <Text style={styles.btnNuevocategoriaTexto}>
                {mesaObj.id ? "Editar" : "Agregar"}
              </Text>
            </Pressable>
            <Pressable
              style={styles.btnCancelar}
              onPress={() => {
                setModalVisible(!modalVisible);
                setMesaApp({});
                setId("");

                setNumero("");
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
    marginBottom : 10,
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
