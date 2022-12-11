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

const baseURL = "http://192.168.1.176:8000/api/";

const CounterScreen = ({ navigation }) => {

  const [time,setTime] = useState("");

  const handleFinish = () => {

  };


  return (
    <SafeAreaView>
      <View style={styles.container}>
      {time === "" ? (
          <Text style={styles.noTime}>Calculando tiempo de preparacion... </Text>
        ) : (
      
        <CountDown
        size={35}
        until = {time}
        onFinish = {() => handleFinish()}
        timeToShow = {['H','M','S']}
        showSeparator
        timeLabels ={{}}
        />
        )}
      </View>
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
    fontSize: 20,
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
