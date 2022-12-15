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
import RestauranteContext from "../../components/RestauranteContext";
//import estilos from "../../MyDrawer/style";

import Formulario from "../../components/Formulario";
import FormularioCategoria from "../../components/FormularioCategoria";
import Categoria from "../../components/categoria";
  
const AdministradorScreen = ({ navigation }) => {
  //const [categorias, setcategorias] = useState([]);
  const [categoria, setCategoria] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [nombreCategoria, setNombreCategoria] = useState("");
  const {baseURL} = useContext(RestauranteContext);

  /**
   * 
   * @param {id de categoria} id 
   * establece cual es la categoria que se va a editar
   */
  const categoriaEditar = (id) => {
    const categoriaEditar = categorias.filter((categoria) => categoria.id === id);
    setCategoria(categoriaEditar[0]);
  };
  /**
   * Verifica si hay productos asociados a esta categoria antes de eliminar.
   */
  const alertaContrain = () => {
    Alert.alert("Error", "Existen productos asociados a esta categoria, no se puede eliminar", [
      { text: "OK" },
     
    ]);
  };

  /**
   * 
   * @param {id de la categoria} id 
   * Metodo DELETE para eliminar la categoria
   */
  const eliminarcategoria = (id) => {
    try {
      const requestOptions = {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5",
        },
      };
      fetch(baseURL + "categorias/" + id, requestOptions)
        .then((res) => res.ok)
        .catch((error) => console.error("Error", error))
        .then((response) => (response===true ?console.log("Exito", response) : alertaContrain() ));
    } catch (e) {
      console.log(e);
    }
  };
/**
 * 
 * @param {id categoria} id 
 * eliminar categoria de la lista
 */
  const categoriaEliminar = (id) => {
    Alert.alert(
      "Deseas Eliminar?",
      "Un categoria eliminado no se puede recuperar",
      [
        { text: "Cancelar" },
        {
          text: "Si, Eliminar",
          onPress: () => {
            eliminarcategoria(id);
          },
        },
      ]
    );
  };
//GET CATEGORIAS
  useEffect(() => {
    (async function () {
      try {
        const response = await fetch(baseURL + "categorias", {
          method: "GET",
        });
        const data = await response.json();
        setCategorias(data);
        console.log(data);
      } catch (error) {
        console.log("error categorias");
      }
    })();
  }, []);

 /**
  * navegacion hacia atras.
  */
  const volver = () => {
    navigation.navigate("EleccionUsuario");
  };
 /**
  * vista
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
      <Text style={styles.tituloBold}>{"   "}Categorias disponibles:</Text>
      {categorias.length === 0 ? (
        <Text style={styles.nocategorias}> No hay categorias</Text>
      ) : (
        <FlatList
          style={styles.listado}
          data={categorias}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            return (
              <Categoria
                item={item}
                setModalVisible={setModalVisible}
                categoriaEditar={categoriaEditar}
                categoriaEliminar={categoriaEliminar}
              />
            );
          }}
        />
      )}
      <Pressable
        style={styles.btnNueva}
        onPress={() => setModalVisible(!modalVisible)}
      >
        <Text style={styles.btnTextoNueva}>Añadir categoria</Text>
      </Pressable>
      <FormularioCategoria
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        categorias={categorias}
        setCategorias={setCategorias}
        categoria={categoria}
        setCategoria={setCategoria}
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
  nocategorias: {
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
