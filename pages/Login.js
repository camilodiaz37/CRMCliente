import React, {useState} from "react";
import Layout from "../components/Layout";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation, gql } from "@apollo/client";
import {useRouter} from "next/router"
import {AUTENTICAR_USUARIO} from '../data/mutations/autenticarUsuario'

const Login = () => {
  //routing
  const router = useRouter();

  //mutation para crear usuario en apollo
  const [autenticarUsuario] = useMutation(AUTENTICAR_USUARIO);

  //state de mensaje
  const [mensaje, guardarMensaje] = useState(null)

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("El email es invalido")
        .required("El email no puede ir vacio"),
      password: Yup.string().required("La contraseña es obligatoria"),
    }),
    onSubmit: async (valores) => {
      /* console.log(valores); */
      const { email, password } = valores;
      try {
        const { data } = await autenticarUsuario({
          variables: {
            input: {
              email,
              password,
            },
          },
        });
        console.log(data)
        //mensaje de inicio de sesion correcto
        guardarMensaje("Verificando...")
        //guardar el token en el localstorage
        const {token} = data.autenticarUsuario;
        localStorage.setItem("token", token)
        
        //redireccionar
        setTimeout(()=>{
          guardarMensaje(null)
          router.push("/")

        },[1500])
      } catch (error) {
        guardarMensaje(error.message)
        setTimeout(()=>{
          guardarMensaje(null)
        },[3000])
      }
    },
  });

  const mostrarMensaje = () => {
    return (
      <div className="bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto">
        <p>{mensaje}</p>
      </div>
    );
  };

  return (
    <>
      <Layout>
        {mensaje && mostrarMensaje()}
        <h1 className="text-center text-2xl text-white font-light">Login</h1>
        <div className="flex justify-center mt-5">
          <div className="w-full max-w-sm">
            <form
              className="bg-white rounted shadow-md px-8 pt-6 pb-4"
              onSubmit={formik.handleSubmit}
            >
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
                  placeholder="Ingrese usuario"
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
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className="shadow apperance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  placeholder="Ingrese contraseña"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />
                {formik.touched.password && formik.errors.password && (
                  <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                    <p className="font-bold">Error</p>
                    <p>{formik.errors.password}</p>
                  </div>
                )}
              </div>
              <input
                type="submit"
                className="bg-gray-800 w-full mt-5 p-2 text-white uppercas hover:bg-gray-900 cursor-pointer"
                value="Login"
              />
            </form>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Login;
