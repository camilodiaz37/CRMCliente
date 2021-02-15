import React from "react";
import { useRouter } from "next/router";
import { Formik } from "formik";
import Layout from "../../components/Layout";
import { OBTENER_PRODUCTO } from "../../data/queries/obtenerProducto";
import { ACTUALIZAR_PRODUCTO } from "../../data/mutations/actualizarProducto";
import { useQuery, useMutation } from "@apollo/client";
import Swal from "sweetalert2";
import * as Yup from "yup";

const editarProducto = () => {
  const router = useRouter();
  const {
    query: { pid },
  } = router;

  //Query para obtener el producto
  const { data, loading, error } = useQuery(OBTENER_PRODUCTO, {
    variables: {
      id: pid,
    },
  });
  //Mutation para actualizar valores del producto
  const [actualizarProducto ] = useMutation(ACTUALIZAR_PRODUCTO);

  if (loading) return "...cargando";
  if (!data) return "Accion no permitida";
  const { obtenerProducto } = data;

  //schema de validacion
  const validationSchema = Yup.object({
    nombre: Yup.string().required("El nombre del producto es obligatorio"),
    existencia: Yup.number()
      .required("La existencia obligatoria")
      .integer("El numero debe ser entero")
      .positive("El numero debe ser mayor a 0"),
    precio: Yup.number()
      .required("El precio del prodcuto es obligatorio")
      .positive("El numero debe ser mayor a 0"),
  });

  const actualizarInfoProducto = async (valores) => {
    const { nombre, existencia, precio } = valores;
    try {
      const { data } = await actualizarProducto({
        variables: {
            id: pid,
          input: {
            nombre,
            existencia,
            precio,
          },
        },
      });
      //sweet alert
      Swal.fire(
        "Producto actualizado",
        "El Producto se ha actualizado correctamente",
        "success"
      );
      //redirect
      setTimeout(() => {
        router.push("/Productos");
      }, [1500]);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light">Editar Producto</h1>

      <div className="flex justify-center mt-5">
        <div className="w-full max-w-lg">
          <Formik
            validationSchema={validationSchema}
            enableReinitialize
            initialValues={obtenerProducto}
            onSubmit={(valores, funciones) => {
              actualizarInfoProducto(valores);
            }}
          >
            {(props) => {
              return (
                <form
                  className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
                  onSubmit={props.handleSubmit}
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
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.nombre}
                    />
                    {props.touched.nombre && props.errors.nombre && (
                      <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                        <p className="font-bold">Error</p>
                        <p>{props.errors.nombre}</p>
                      </div>
                    )}
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="existencia"
                    >
                      Existencia
                    </label>
                    <input
                      className="shadow apperance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="existencia"
                      type="number"
                      placeholder="Cantidad existente del producto"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.existencia}
                    />
                    {props.touched.existencia && props.errors.existencia && (
                      <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                        <p className="font-bold">Error</p>
                        <p>{props.errors.existencia}</p>
                      </div>
                    )}
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="precio"
                    >
                      Precio
                    </label>
                    <input
                      className="shadow apperance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="precio"
                      type="number"
                      placeholder="Precio Producto"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.precio}
                    />
                    {props.touched.precio && props.errors.precio && (
                      <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                        <p className="font-bold">Error</p>
                        <p>{props.errors.precio}</p>
                      </div>
                    )}
                  </div>
                  <input
                    type="submit"
                    className="bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900 cursor-pointer"
                    value="Guardar cambios"
                  />
                </form>
              );
            }}
          </Formik>
        </div>
      </div>
    </Layout>
  );
};
export default editarProducto;
