import React, { useContext, useEffect, useState } from "react";
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
import Icon from "react-native-vector-icons/MaterialIcons";
import RestauranteContext from "../../components/RestauranteContext";
import ProductoCarrito from "../../components/ProductoCarrito";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import CountDown from "react-native-countdown-component";
  

const CounterScreen = ({ route,navigation }) => {

  const [time,setTime] = useState(0);
  const [pedido,setPedido] = useState([]);
  const {baseURL,setCarrito,setResumen_orden_productos,setTotal} = useContext(RestauranteContext);
  const {id} = route.params;


  // const handleFinish = () => {

  // };
  const volver = () => {
    navigation.navigate("HomeScreen");
    setCarrito([]);
    setTotal(0);
    setResumen_orden_productos([]);
    setTime(0);
  };

  
  async function actulizarTiempo() {
    
        try {
          const response = await fetch(baseURL + "resumen_ordens", {
            method: "GET",
          });
          console.log(id);
          const data = await response.json();
          const pedidoBuscar = data.find(pedidos => pedidos.id === id);
          console.log(pedidoBuscar);
          console.log(pedidoBuscar.tiempo);
          setTime(pedidoBuscar.tiempo*60);
         
        } catch (error) {
          //console.log(error);
          console.log("error pedidos");
        }
  
  };

/**vistaz
 * 
 */
  return (
    <SafeAreaView>
      <View style={styles.container}>
      {time === 0 ? (
        <View>
          <Text style={styles.noTime}>Calculando tiempo de preparacion... </Text>
          <Pressable
            style={styles.btnNueva}
            onPress={() => actulizarTiempo()}
          >
            <Text style={styles.btnTextoNueva
            }>
            Actualizar
            </Text>
          </Pressable>
          </View>
          
        ) : (
         

        <CountDown
        size={35}
        until = {time}
        //onFinish = {() => handleFinish()}
        timeToShow = {['H','M','S']}
        showSeparator
        timeLabels ={{}}
        > </CountDown>
       
       
        )}
      </View>
      <Pressable
          style={styles.btnNueva2}
          onPress={() => volver()}
        >
          <Text style={styles.btnTextoNueva2
          }>
          Volver al inicio
          </Text>
       </Pressable>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
   padding: 50,
  },
  noTime: {
    marginTop: 40,
    textAlign: "center",
    fontSize: 24,
    fontWeight: "500",
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
    fontSize: 20,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  btnNueva2: {
    backgroundColor: "skyblue",
    padding: 15,
    alignSelf: "center",
    marginTop: 30,
    marginHorizontal: 20,
    borderRadius: 10,
    width: 150,
    height: 45,
  },

  btnTextoNueva2: {
    textAlign: "center",
    color: "#FFF",
    fontSize: 13,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  noProductos: {
    marginTop: 40,
    textAlign: "center",
    fontSize: 24,
    fontWeight: "500",
  },
  listado: {
    marginTop: 10,
    marginHorizontal: 20,
  },
});

export default CounterScreen;
