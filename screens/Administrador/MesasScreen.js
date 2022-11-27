import React, { useState, useEffect } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Button,
  Pressable,
  SafeAreaView,
  StyleSheet,
  FlatList,
  ScrollView,
  Alert,
} from "react-native";
import { IconButton, MD3Colors } from "react-native-paper";
import estilos from "../../MyDrawer/style";
import FormularioMesa from "../../components/FormularioMesa";
import Mesa from "../../components/mesa";

const baseURL = "http://192.168.1.176:8000/api/";

const AdministradorScreen = ({ navigation }) => {
  const [mesa, setMesa] = useState([]);
  const [mesas, setMesas] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const mesaEditar = (id) => {
    const mesaEditar = mesas.filter((mesa) => mesa.id === id);
    setMesa(mesaEditar[0]);
  };

  const eliminarMesa = (id) => {
    try {
      const requestOptions = {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5",
        },
      };
      fetch(baseURL + "mesas/" + id, requestOptions)
        .then((res) => res.ok)
        .catch((error) => console.error("Error", error))
        .then((response) => console.log("Exito", response));
    } catch (e) {
      console.log(e);
    }
  };

  const mesaEliminar = (id) => {
    Alert.alert(
      "Deseas Eliminar?",
      "Una mesa eliminada no se puede recuperar",
      [
        { text: "Cancelar" },
        {
          text: "Si, Eliminar",
          onPress: () => {
            eliminarMesa(id);
          },
        },
      ]
    );
  };

  useEffect(() => {
    (async function () {
      try {
        const response = await fetch(baseURL + "mesas", {
          method: "GET",
        });
        const data = await response.json();
        setMesas(data);
        console.log(data);
      } catch (error) {
        console.log("error mesas");
      }
    })();
  }, []);

  const screenCliente = () => {
    navigation.navigate("HomeScreen");
  };
  const volver = () => {
    navigation.navigate("EleccionUsuario");
  };

  return (
    <SafeAreaView style={styles.container}>
      <IconButton
        icon="arrow-left"
        iconColor={MD3Colors.error50}
        size={30}
        onPress={() => volver()}
      />

      <Text>{"   "}</Text>
      <Text style={styles.tituloBold}>{"   "}Mesas disponibles:</Text>
      {mesas.length === 0 ? (
        <Text style={styles.noMesa}> No hay Mesas</Text>
      ) : (
        <FlatList
          style={styles.listado}
          data={mesas}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            return (
              <Mesa
                item={item}
                setModalVisible={setModalVisible}
                mesaEditar={mesaEditar}
                mesaEliminar={mesaEliminar}
              />
            );
          }}
        />
      )}
      <Pressable
        style={styles.btnNuevaCita}
        onPress={() => setModalVisible(!modalVisible)}
      >
        <Text style={styles.btnTextoNuevaCita}>Añadir Mesa</Text>
      </Pressable>
      <FormularioMesa
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        mesas={mesas}
        setMesas={setMesas}
        mesa={mesa}
        setMesa={setMesa}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F3F4F6",
    flex: 1,
  },
  titulo: {
    textAlign: "center",
    fontSize: 30,
    color: "#374151",
    fontWeight: "600",
  },
  tituloBold: {
    fontWeight: "600",
    fontSize: 19,
  },
  btnNuevaCita: {
    backgroundColor: "orange",
    padding: 15,
    marginTop: 30,
    marginHorizontal: 20,
    borderRadius: 10,
  },
  btnTextoNuevaCita: {
    textAlign: "center",
    color: "#FFF",
    fontSize: 15,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  noMesa: {
    marginTop: 40,
    textAlign: "center",
    fontSize: 24,
    fontWeight: "500",
  },
  listado: {
    marginTop: 50,
    marginHorizontal: 30,
  },
});

export default AdministradorScreen;
