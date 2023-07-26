import React from 'react'
import {useLoaderData} from 'react-router-dom'
import Cliente from '../components/Cliente';
import { obtenerClientes } from '../data/Clientes';


export  function  loader(){
  const clientes = obtenerClientes()

  return clientes
}

 function Index(){
  
   const datos = useLoaderData();
  
  return (
    <>
      <h1 className='font-black text-4xl text-blue-600'>Clientes</h1>
      <p className='nt-3'> Administra tus Clientes</p>
      
      {datos.length ? (
        <table className='w-full bg-white shadow mt-5 table-auto'>
          <thead className='bg-blue-800 text-white' >
            <tr>
              <th className='p-2'>Clientes</th>
              <th className='p-2'>Contacto</th>
              <th className='p-2'>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {datos.map(cliente => (
              <Cliente
                cliente={cliente}
                key = {cliente.id}
              />
            ))}
          </tbody>
        </table>
      ): (
          <p className="text-center mt-10">No hay Clientes aún</p>
      )}
    </>
   )
   
}

export default Index