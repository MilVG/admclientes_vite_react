import React from 'react'
import { useNavigate, Form, redirect } from 'react-router-dom'
import { eliminarCliente } from '../data/Clientes'


export async function action({ params }) {

    await eliminarCliente(params.clienteId)
    return redirect('/')
}

const Cliente = ({ cliente }) => {
    const navigate = useNavigate()
    const {nombre,empresa,email,telefono,id} = cliente
  return (
      <tr className='border-b'>
          <td className='p-6'>
              <p className='text-2xl text-gray-808'>{nombre}</p>
              <p>{ empresa}</p>
          </td>

          <td className='p-6'>
              <p className='text-gray-600'><span className='text-gray-808 uppercase font-bold'>Email: </span>{email}</p>
              <p className='text-gray-600'><span className='text-gray-808 uppercase font-bold'>Telefono: </span>{telefono}</p>
          </td>
          <td className='p-6 flex'>
              <button type='button' className='text-blue-400  hover:text-blue-800 uppercase font-bold text-xs' onClick={()=>navigate(`/clientes/${id}/editar`)}>
                  Editar
              </button>
            
              <Form
                  className='p-2'
                  method='POST'
                  action={`/Clientes/${id}/eliminar`}
                  onSubmit={(e) => {
                      if (!confirm('¿Deseas eliminar este Registro?')) {
                          e.preventDefault()

                      }
                  }}
              >
                <button
                    type='submit'
                    className='text-red-400  hover:text-red-800 uppercase font-bold text-xs'
                >
                    Eliminar
                </button>
              </Form>
          </td>
      </tr>
  )
}

export default Cliente