import React, { useState, useEffect, useContext } from "react";
import Select from "react-select";
import { useQuery } from "@apollo/client";
import { OBTENER_PRODUCTOS } from "../../data/queries/obtenerProductos";
import PedidoContext from '../../context/pedidos/PedidoContext'

const AsignarProductos = () => {
  const [productos, setProductos] = useState([])
  //consulta a la bd
  const { data, loading, error } = useQuery(OBTENER_PRODUCTOS);
  
  const pedidoContext = useContext(PedidoContext)
  const {agregarProductos} = pedidoContext

  useEffect(()=>{
    agregarProductos(productos)
  },[productos])
  
  if (loading) return "...cargando";
  
  const { obtenerProductos } = data;
  
  const seleccionarProductos = (value) =>{
  setProductos(value)
  }


  return (
    <>
      <p className="mt-10 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-bold">
        2.- Selecciona y/o Busca los productos
      </p>
      <Select
        className="mt-3"
        options={obtenerProductos}
        onChange={(value) => seleccionarProductos(value)}
        isMulti
        getOptionValue={(data) => data.id}
        getOptionLabel={(data) => `${data.nombre}   -     ${data.existencia} disponibles`}
        placeholder="Seleccione los productos"
        noOptionsMessage={() => "No hay resultados"}
      />
    </>
  );
};
export default AsignarProductos;
