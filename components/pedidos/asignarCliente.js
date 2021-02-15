import React, { useState, useEffect, useContext } from "react";
import Select from "react-select";
import {useQuery} from '@apollo/client'
import {OBTENER_CLIENTES_USUARIO} from '../../data/queries/obtenerClientesUsuario'
import PedidoContext from '../../context/pedidos/PedidoContext'

const AsignarCliente = () => {
  const [cliente, setCliente] = useState([]);
  const pedidoContext = useContext(PedidoContext)
  const {agregarCliente}= pedidoContext

  const {data, loading,error} = useQuery(OBTENER_CLIENTES_USUARIO)

  useEffect(() => {
    agregarCliente(cliente)
  }, [cliente]);

  const seleccionarClientes = (cliente) => {
    setCliente(cliente);
  };

  //resultado de la consult
  if(loading) return null
  const {obtenerClientesVendedor} = data
  return (
    <>
    <p className="mt-10 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-bold">1.- Asigna un Cliente al pedido</p>
      <Select
      className="mt-3"
        options={obtenerClientesVendedor}
        onChange={(cliente) => seleccionarClientes(cliente)}
        getOptionValue={(data) => data.id}
        getOptionLabel={(data) => data.nombre+" "+data.apellido}
        placeholder="Seleccione el cliente"
        noOptionsMessage={() => "No hay resultados"}
      />
    </>
  );
};

export default AsignarCliente;
