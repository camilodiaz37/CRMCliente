import React from "react";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { OBTENER_USUARIO } from "../data/queries/obtenerUsuario";

const Header = () => {
  const router = useRouter();
  //query apollo
  const { data, loading, error } = useQuery(OBTENER_USUARIO);
  //Evitar dada vacia en momento de loading
  if (loading) return "Cargando...";
  //Si hay error por no encontrar data
  if (!data) {
    return router.push("/Login");
  }

  const { nombre, apellido } = data.obtenerUsuario;

  const cerrarSesion = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("ally-supports-cache");
    router.push("/Login");
  };

  return (
    <div className="flex justify-between mb-6">
      <p className="mr-2">
        Hola: {nombre} {apellido}
      </p>

      <button
        onClick={() => cerrarSesion()}
        className="bg-blue-800 w-full sm:w-auto font-bold uppercase text-xs rounded py-1 px-2 text-white shadow-md"
        type="button"
      >
        Cerrar Sesión
      </button>
    </div>
  );
};

export default Header;
