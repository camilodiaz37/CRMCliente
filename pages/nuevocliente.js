import React, {useState} from "react";
import Layout from "../components/Layout";
/* import Cliente from '../components/cliente' */
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@apollo/client";
import {useRouter} from 'next/router'
import {OBTENER_CLIENTES_USUARIO} from '../data/queries/obtenerClientesUsuario'
import {NUEVO_CLIENTE} from '../data/mutations/nuevoCliente'


const NuevoCliente = () => {
  const router = useRouter()
  const [mensaje, setMensaje] = useState(null);
  
  //mutation crear cliente
  const [nuevoCliente] = useMutation(NUEVO_CLIENTE,{
    update(cache, {data:{nuevoCliente}}){
      //obtener objet de cache
      const {obtenerClientesVendedor} = cache.readQuery({query: OBTENER_CLIENTES_USUARIO});
      //reescribimos el cache (elcache nunca se debe modificar solo reescribir)
      cache.writeQuery({
        query:OBTENER_CLIENTES_USUARIO,
        data:{
          obtenerClientesVendedor:{...obtenerClientesVendedor, nuevoCliente}
        }
      })
    }
  });
  const formik = useFormik({
    initialValues: {
      nombre: "",
      apellido: "",
      empresa: "",
      email: "",
      telefono: "",
    },
    validationSchema: Yup.object({
      nombre: Yup.string().required("El nombre del cliente es obligatorio"),
      apellido: Yup.string().required("El nombre del apellido es obligatorio"),
      empresa: Yup.string().required("El nombre de la empresa es obligatorio"),
      email: Yup.string()
        .email("Email no valido")
        .required("El email es obligatorio"),
    }),
    onSubmit: async (valores) => {
      const { nombre, apellido, empresa, email, telefono } = valores;
      try {
        const { data } = await nuevoCliente({
          variables: {
            input: {
              nombre,
              apellido,
              empresa,
              email,
              telefono,
            },
          },
        });
        //Redireccionar
        router.push("/");
      } catch (error) {
        setMensaje(error.message.replace("Error: ",""))
        setTimeout(()=>{
          setMensaje(null)
        },[3000])
      }
    },
  });
  const volver = () =>{
    router.push("/");
  }
  const mostrarMensaje =()=>{
    return(
      <div className="bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto">
        <p>{mensaje}</p>
      </div>
    )
  }
  return (
    <Layout>
      <div className="flex justify-between items-baseline">
        <h1 className="text-2xl text-gray-800 font-light">Nuevo cliente</h1>
        <button
          onClick={() => volver()}
          className="bg-blue-800 w-full sm:w-auto font-bold uppercase text-xs rounded py-1 px-2 text-white shadow-md"
          type="button"
      >
        Volver a clientes
      </button>
      </div>
      {mensaje && mostrarMensaje()}
      <div className="flex justify-center mt-5">
        <div className="w-full max-w-lg">
          <form
            className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
            onSubmit={formik.handleSubmit}
          >
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="nombre"
              >
                Nombre
              </label>
              <input
                className="shadow apperance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="nombre"
                type="text"
                placeholder="Nombre Cliente"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.nombre}
              />
              {formik.touched.nombre && formik.errors.nombre && (
                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                  <p className="font-bold">Error</p>
                  <p>{formik.errors.nombre}</p>
                </div>
              )}
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="apellido"
              >
                Apellido
              </label>
              <input
                className="shadow apperance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="apellido"
                type="text"
                placeholder="Apellido Cliente"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.apellido}
              />
              {formik.touched.apellido && formik.errors.apellido && (
                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                  <p className="font-bold">Error</p>
                  <p>{formik.errors.apellido}</p>
                </div>
              )}
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="empresa"
              >
                Empresa
              </label>
              <input
                className="shadow apperance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="empresa"
                type="text"
                placeholder="Empresa Cliente"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.empresa}
              />
              {formik.touched.empresa && formik.errors.empresa && (
                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                  <p className="font-bold">Error</p>
                  <p>{formik.errors.empresa}</p>
                </div>
              )}
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="shadow apperance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Email Cliente"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email && (
                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                  <p className="font-bold">Error</p>
                  <p>{formik.errors.email}</p>
                </div>
              )}
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="telefono"
              >
                Telefono
              </label>
              <input
                className="shadow apperance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="telefono"
                type="tel"
                placeholder="Telefono Cliente"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.telefono}
              />
            </div>
            <input
              type="submit"
              className="bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900 cursor-pointer"
              value="Registrar Cliente"
            />
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default NuevoCliente;
