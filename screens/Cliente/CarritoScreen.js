import React, { useContext, useEffect, useState } from "react";
import { Text,TouchableOpacity,View,TextInput,Button,Pressable,SafeAreaView,StyleSheet,FlatList,ScrollView,Alert} from "react-native";
import { IconButton, MD3Colors } from "react-native-paper";
import Icon from 'react-native-vector-icons/MaterialIcons';
import RestauranteContext from "../../components/RestauranteContext";
import ProductoCarrito from "../../components/ProductoCarrito";

const CarritoScreen= ({navigation})=>{

  const {carrito,setCarrito} = useContext(RestauranteContext);
  const [cantidad,setCantidad] = useState("");
  const [precio,setPrecio] = useState("");
  const {total,setTotal} = useContext(RestauranteContext);
  
 


  const volver = () => {
    navigation.navigate("HomeScreen");
    setCarrito([]);
    setTotal(0);
  };
  const eliminarDelCarrito = (id) => {
  
  setCarrito(carrito.filter((item) => item.id != id));


  };
  return (
    <SafeAreaView >
      <IconButton
        icon="arrow-left"
        iconColor={MD3Colors.error50}
        size={30}
        onPress={() => volver()}
      />

      <Text>{"   "}</Text>
     
      {carrito.length === 0 ? ( 
        <Text style={styles.noProductos}>¡Añade tus productos al carrito!</Text>
        
      ) : (
        <View>
        <FlatList
          contentContainerStyle={{paddingBottom: 80}}
          ListFooterComponentStyle={{paddingHorizontal: 20, marginTop: 20}}
          style={styles.listado}
          data={carrito}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            return (
              <ProductoCarrito
                item={item}
                eliminarDelCarrito={eliminarDelCarrito}
              />
            );
            
          }
         }
        />
        <Text>Total a pagar: {total}</Text>
         </View>
      )}
      
      
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

export default CarritoScreen;

