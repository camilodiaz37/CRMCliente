import React, { useContext, useState } from "react";
import Layout from "../components/Layout";
import AsignarCliente from "../components/pedidos/asignarCliente";
import AsignarProductos from "../components/pedidos/asignarProductos";
import ResumenPedido from "../components/pedidos/resumenPedido";
import Total from "../components/pedidos/total";
import { useMutation } from "@apollo/client";
import { NUEVO_PEDIDO } from "../data/mutations/nuevoPedido";
import {useRouter} from 'next/router'
import Swal from 'sweetalert2'

import PedidoContext from "../context/pedidos/PedidoContext";
const NuevoPedido = () => {
    const router = useRouter()
    const [mensaje, setMensaje] = useState(null)
  //utilizar context y usar sus valores
  const pedidoContext = useContext(PedidoContext);
  const { cliente, productos, total } = pedidoContext;
 
  const [nuevoPedido] = useMutation(NUEVO_PEDIDO);

  const validarPedido = () => {
    return !productos.every((producto) => producto.cantidad > 0) ||
      total === 0 ||
      cliente.length === 0
      ? " opacity-50 cursor-not-allowed "
      : "";
  };
  const crearNuevoPedido = async () => {
    //remover lo no solicitado de productos
    const pedido = productos.map(
      ({ existencia, __typename, ...producto }) => producto
    );
    const { id } = cliente;
    try {
      const { data } = await nuevoPedido({
        variables: {
          input: {
            cliente: id,
            total,
            pedido,
          },
        },
      });
      //mostrar alerta
      Swal.fire("Correcto", "El pedido se registro correctamente", "success")
      //redireccionar
      router.push("/Pedidos")
    } catch (error) {
      setMensaje(error.message.replace("Error: ",""));

      setTimeout(()=>{
        setMensaje(null)
      },[5000])
    }
  };
  const mostrarMensaje=()=>{
      return(
          <div className="bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto">
              <p>{mensaje}</p>
          </div>
      )
  }
  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light">Nuevo pedido</h1>
      {mensaje && mostrarMensaje()}
      <div className="flex justify-center mt-5">
        <div className="w-full max-w-lg">
          <AsignarCliente />
          <AsignarProductos />
          <ResumenPedido />
          <Total />
          <button
            type="button"
            className={`bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900 ${validarPedido()}`}
            onClick={() => crearNuevoPedido()}
          >
            Registrar pedido
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default NuevoPedido;
