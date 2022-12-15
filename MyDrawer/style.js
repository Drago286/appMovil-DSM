import { StyleSheet } from "react-native";

const estilos = StyleSheet.create({
  container: {
    flex: 1,
  },
  botonEleccionUsuario: {
    width: 130,
    height: 50,
    // alignSelf: "center",
    // justifyContent: "center",
    // //alignItems : "center",
    //alignContent : "center",
  
   
    marginTop: 20,
    //marginRight: 20,
    borderRadius: 9,
    backgroundColor: "#afc7c1",
    //color: "#afc7c1",
  },
  boton: {
    width: 130,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  
    marginLeft: 150,
    marginTop: 20,
    marginRight: 20,
    borderRadius: 9,
    backgroundColor: "#afc7c1",
    //color: "#afc7c1",
  },
  boton2: {
    width: 130,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    //marginLeft: 150,
    marginTop: 20,
    marginRight: 130,
    borderRadius: 9,
    backgroundColor: "#afc7c1",
    //color: "#afc7c1",
  },
  boton3: {
    width: 130,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    //marginLeft: 150,
    marginTop: 20,
    //marginRight: 130,
    borderRadius: 9,
    backgroundColor: "#afc7c1",
    //color: "#afc7c1",
  },
  botonCategorias: {
    width: 130,
    height: 35,
    alignItems: "center",
    justifyContent: "center",
    //marginLeft: 150,
    marginTop: 20,
    marginRight: 10,
    borderRadius: 5,
    backgroundColor: "#ffffff",
    //color: "#afc7c1",
  },
  entardaTexto:{
    backgroundColor: "#ededed",
    padding: 20,
    marginHorizontal: 20,
    marginTop: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "grey",
    fontSize: 20,
  },
  textoBoton: {
    fontSize: 14,
    color: "black",
    fontWeight: "bold",
   // alignSelf : "center",
    textAlign : "center",
  },
  viewHorizontal: {
    flex: 1,
    flexDirection: "row",
    marginHorizontal: 20,
    marginTop: 5,
  },
});

export default estilos;