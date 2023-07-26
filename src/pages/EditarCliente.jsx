
import React from 'react'
import { obtenerCliente,actualizarCliente } from '../data/Clientes';
import Formulario from '../components/Formulario';
import { Form, useLoaderData, useNavigate, useActionData,redirect } from 'react-router-dom';
import Error from '../components/Error';



export async function loader({params}) {
    const cliente = await obtenerCliente(params.clienteId)

    if (Object.values(cliente).length === 0) {
        throw new Response('', {
            status: 404,
            statusText:'Cliente No Encontrado'
        })
    }
    

    return cliente
}

export async function action({ params, request }) {
    const formData = await request.formData()

    const datos = Object.fromEntries(formData)

    const email = formData.get('email')

    //validacion

    const errores = []

    if (Object.values(datos).includes('')) {
        errores.push('Todos los campos son obliagatorios')
    }

    let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");

    if (!regex.test(email)) {
        errores.push('El email No es válido')
    }
    //retornar datos si hay errores
    if (Object.keys(errores).length) {
        return errores
    }

    //actualziar cliente
    await actualizarCliente(params.clienteId,datos)

    return redirect('/')
}

function EditarCliente() {
     const  errores = useActionData()
    const navigate = useNavigate()
    const cliente = useLoaderData()
    
  return (
      <>
          <h1 className='font-black text-4xl text-blue-900'>Editar Cliente</h1>
          <p className='mt-3'>Modifica los campos de tus clientes</p>

          <div className='flex justify-end'>
              <button
                  className='bg-blue-800 text-white px-3 py-1 font-bold uppercase'
                  onClick={() => navigate('/')}
              >
                  Volver
              </button>
          </div>

          <div className='bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10 mt-20'>
              {errores?.length && errores.map((error, i) => <Error key={i}>{error}</Error>)}
              <Form
                  method="post"
              >
                  <Formulario
                    cliente={cliente}
                  />
                  <input
                      type="submit"
                      className='mt-5 w-full bg-blue-800 p-3 uppercase font-bold text-white text-lg'
                      value="registrar Cliente"
                  />
              </Form>
          </div>
      </>
  )
}

export default EditarCliente