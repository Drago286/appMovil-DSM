import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Button,
} from "react-native";

const HomeScreen = () => {
  return (
    <View>
      <Text
        style={{
          fontSize: 20,
          marginTop: "30%",
          textAlign: "center",
        }}
      >Por favor indicanos tu número de mesa:</Text>
      <TouchableOpacity 
      style={{
        width: 100,
        height:50,
        alignItems: "center",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
        backgroundColor: "orange",

      }}>
        <Text
        style={{
            fontSize: 15,
            color: "white",
            fontWeight: "bold",
            fontStyle: "comic Sans",
            
        }}>
            Continuar
        </Text>
      </TouchableOpacity>
    </View>

  );
};
const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
export default HomeScreen;
