import { StyleSheet } from "react-native";

const estilos = StyleSheet.create({
  container: {
    flex: 1,
  },
  boton: {
    width: 130,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    //marginLeft: 30,
    //marginTop: 20,
    //marginRight: 20,
    borderRadius: 9,
    backgroundColor: "#afc7c1",
    color: "#afc7c1",
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
    fontSize: 17,
    color: "white",
    fontWeight: "bold",
  },
});

export default estilos;