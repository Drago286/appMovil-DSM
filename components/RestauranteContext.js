import React, { useState, createContext, useEffect } from "react";
const RestauranteContext = createContext();


const baseURL = "http://192.168.1.83:8000/api/";

export const RestauranteProvider = ({ children }) => {

  

    const [carrito,setCarrito] = useState([]);
    const [productos, setProductos] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const[resumen_orden_productos, setResumen_orden_productos] = useState([]);
    const [mesa_id_pedido, setMesa_id_pedido] = useState("");
    const [mesas, setMesas] = useState([]);

  

    return (
        <RestauranteContext.Provider 
        value={[carrito,setCarrito,categorias,setCategorias,productos,setProductos,resumen_orden_productos,setResumen_orden_productos,mesa_id_pedido,setMesa_id_pedido,mesas,setMesas]}>
            {children}
        </RestauranteContext.Provider>
    );
}

export default RestauranteContext;


