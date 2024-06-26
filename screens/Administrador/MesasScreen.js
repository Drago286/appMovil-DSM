import React, { useState, useEffect,useContext } from "react";
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
import RestauranteContext from "../../components/RestauranteContext";


const AdministradorScreen = ({ navigation }) => {
  const [mesa, setMesa] = useState([]);
  const [mesas, setMesas] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const {baseURL} = useContext(RestauranteContext);

  /**
   * 
   * @param {id de la mesa} id 
   * estable que mesa es la que se va a editar.
   */
  const mesaEditar = (id) => {
    const mesaEditar = mesas.filter((mesa) => mesa.id === id);
    setMesa(mesaEditar[0]);
  };

  /**
   * verifica si hay pedidos ascioados a la mesa.
   */
  const alertaContrain = () => {
    Alert.alert("Error", "Existen pedidos asociados a esta mesa, no se puede eliminar", [
      { text: "OK" },
    ]);
  };

  /**
   * 
   * @param {id de la mesa} id 
   * metodo DELETE que permite eliminar la mesa
   */
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
        .then((response) => (response===true ?console.log("Exito", response) : alertaContrain() ));
    } catch (e) {
      console.log(e);
    }
  };

  /**
   * 
   * @param {id de la mesa} id 
   * elimina la mesa de la lista.
   */
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
/**
 * GET MESAS
 */
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

 
  /**
   * Navegacion hacia atras.
   */
  const volver = () => {
    navigation.navigate("EleccionUsuario");
  };
/**
 * vista.
 */
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
        <Text style={styles.noMesa}> No hay mesas</Text>
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
        style={styles.btnNueva}
        onPress={() => setModalVisible(!modalVisible)}
      >
        <Text style={styles.btnTextoNueva}>Añadir Mesa</Text>
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
  btnNueva: {
    backgroundColor: "orange",
    padding: 15,
    marginTop: 30,
    marginHorizontal: 20,
    borderRadius: 10,
  },
  btnTextoNueva: {
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
