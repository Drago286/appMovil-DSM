import React, { useState, createContext } from "react";
import Navigation from "../components/Navigation";
const RestauranteContext = createContext();





const baseURL = "http://192.168.1.86:8000/api/";

export const RestauranteProvider = ({ children }) => {

    const [carrito,setCarrito] = useState([]);
    const [productos, setProductos] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [arrayCarrito, setArrayCarrito] = useState([]);

    return (
        <RestauranteContext.Provider value={[carrito,setCarrito,categorias,setCategorias,productos,setProductos,arrayCarrito,setArrayCarrito]}>
            {children}
        </RestauranteContext.Provider>
    );
}

export default RestauranteContext;


