import React, { useState, createContext, useEffect } from "react";
const RestauranteContext = createContext();


const baseURL = "http://192.168.1.83:8000/api/";

export const RestauranteProvider = ({ children }) => {

  

    const [carrito,setCarrito] = useState([]);
    const [productos, setProductos] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const[resumen_orden_productos, setResumen_orden_productos] = useState([]);
    const [idMesa, setIdMesa] = useState("");
    const [mesas, setMesas] = useState([]);
    const[contador, setContador] = useState(1);
    const [total, setTotal] = useState(0);
  
    return (
        <RestauranteContext.Provider 
        value={{carrito,setCarrito,categorias,setCategorias,
        productos,setProductos,resumen_orden_productos,
        setResumen_orden_productos,idMesa,setIdMesa,mesas,setMesas,
        contador,setContador,total,setTotal}}>
            {children}
        </RestauranteContext.Provider>
    );
}

export default RestauranteContext;


