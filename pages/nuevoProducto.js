import React from "react";
import Layout from "../components/Layout";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@apollo/client";
import { NUEVO_PRODUCTO } from "../data/mutations/nuevoProducto";
import { OBTENER_PRODUCTOS } from "../data/queries/obtenerProductos";
import Swal from "sweetalert2";
import { useRouter } from "next/router";

const NuevoProducto = () => {
  //mutation
  const [nuevoProducto] = useMutation(NUEVO_PRODUCTO, {
    update(cache, { data: { nuevoProducto } }) {
      //obtener objeto de cache
      const { obtenerProductos } = cache.readQuery({
        query: OBTENER_PRODUCTOS
      });

      //reescribir el objeto
      cache.writeQuery({
        query: OBTENER_PRODUCTOS,
        data: {
          obtenerProductos: [...obtenerProductos, nuevoProducto],
        },
      });
    },
  });
  const router = useRouter();
  //formulario para nuevos productos
  const formik = useFormik({
    initialValues: {
      nombre: "",
      existencia: "",
      precio: "",
    },
    validationSchema: Yup.object({
      nombre: Yup.string().required("El nombre del producto es obligatorio"),
      existencia: Yup.number()
        .required("Agrega la cantidad disponible")
        .positive("No se aceptan numeros negativos")
        .integer("EL numero debe ser un entero"),
      precio: Yup.number()
        .required("El precio es obligatorio")
        .positive("No se aceptan numero negativos"),
    }),
    onSubmit: async (valores) => {
      const { nombre, existencia, precio } = valores;
      try {
        const { data } = await nuevoProducto({
          variables: {
            input: {
              nombre,
              existencia,
              precio,
            },
          },
        });
        console.log(data);
        //MOSTRAR ALERT
        Swal.fire("Creado", "Se creo el producto correctamente", "success");
        //redirect to product
        router.push("/Productos");
      } catch (error) {
        console.log(error);
      }
    },
  });
  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light">Nuevo Producto</h1>

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
                placeholder="Nombre del Producto"
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
                htmlFor="existencia"
              >
                Cantidad disponible
              </label>
              <input
                className="shadow apperance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="existencia"
                type="number"
                placeholder="Cantidad disponible"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.existencia}
              />
              {formik.touched.existencia && formik.errors.existencia && (
                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                  <p className="font-bold">Error</p>
                  <p>{formik.errors.existencia}</p>
                </div>
              )}
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="precio"
              >
                Precio Producto
              </label>
              <input
                className="shadow apperance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="precio"
                type="number"
                placeholder="Precio"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.precio}
              />
              {formik.touched.precio && formik.errors.precio && (
                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                  <p className="font-bold">Error</p>
                  <p>{formik.errors.precio}</p>
                </div>
              )}
            </div>
            <input
              type="submit"
              className="bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900 cursor-pointer"
              value="Registrar Nuevo Producto"
            />
          </form>
        </div>
      </div>
    </Layout>
  );
};
export default NuevoProducto;
