import React from "react";
import Layout from "../components/Layout";
import Link from 'next/link'
import {useQuery} from '@apollo/client'
import { OBTENER_PEDIDOS_USUARIO } from "../data/queries/obtenerPedidosUsuario";
import Pedido from '../components/pedidos/pedido'

const Pedidos = () => {

  const {data,loading,error} = useQuery(OBTENER_PEDIDOS_USUARIO)

  if(loading) return '...cargando'
  const {obtenerPedidosVendedor} = data;

  return (
    <div>
      <Layout>
        <h1 className="text-2xl text-gray-800 font-light">Pedidos</h1>

        <Link href="/nuevoPedido">
        <a className="bg-blue-800 py-2 px-5 mt-3 inline-block text-white hover:bg-gray-800 hover:text-gray-200 rounded uppercase font-bold text-sm">Nuevo Pedido</a>
        </Link>
        {obtenerPedidosVendedor.length === 0 ? (
          <p className="mt-5 text-center text-2xl">No hay pedidos aun</p>
        ):(obtenerPedidosVendedor.map(pedido =>(
          <Pedido key={pedido.id} pedido={pedido}/>
        )))}
      </Layout>
    </div>
  );
};

export default Pedidos;
