import React, { useState, createContext, useEffect } from "react";
const RestauranteContext = createContext();


  

export const RestauranteProvider = ({ children }) => {

    const baseURL = "http://192.168.1.82:8000/api/";//<---Aqui va tu IP http://{tu ip}:8000/api/



    const [carrito,setCarrito] = useState([]);
    const [productos, setProductos] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const[resumen_orden_productos, setResumen_orden_productos] = useState([]);
    const [idMesa, setIdMesa] = useState("");
    const [mesas, setMesas] = useState([]);
    const[contador, setContador] = useState(1);
    const [total, setTotal] = useState(0);
    const [resumen_orden, setResumen_orden] = useState([]);
    
    return (
        <RestauranteContext.Provider 
        value={{carrito,setCarrito,categorias,setCategorias,
        productos,setProductos,resumen_orden_productos,
        setResumen_orden_productos,idMesa,setIdMesa,mesas,setMesas,
        contador,setContador,total,setTotal,setResumen_orden,resumen_orden,baseURL}}>
            {children}
        </RestauranteContext.Provider>
    );
}

export default RestauranteContext;


