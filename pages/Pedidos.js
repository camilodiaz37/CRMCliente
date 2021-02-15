import React from "react";
import Layout from "../components/Layout";
import Link from 'next/link'

const Pedidos = () => {
  return (
    <div>
      <Layout>
        <h1 className="text-2xl text-gray-800 font-light">Pedidos</h1>

        <Link href="/nuevoPedido">
        <a className="bg-blue-800 py-2 px-5 mt-3 inline-block text-white hover:bg-gray-800 hover:text-gray-200 rounded uppercase font-bold text-sm">Nuevo Pedido</a>
        </Link>
      </Layout>
    </div>
  );
};

export default Pedidos;
