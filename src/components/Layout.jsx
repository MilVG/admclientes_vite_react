import React from 'react'
import { Outlet,Link,useLocation } from 'react-router-dom'

const Layout = () => {
    const location = useLocation()

  return (
      <div className='md:flex md:min-h-screen'>
          <aside className='md:w-1/4 bg-gradient-to-r from-indigo-600 to-blue-600 px-5 py-10'>
              <h2 className='text-4xl font-black text-center text-white'>CRM - Clientes</h2>

              <nav className='mt-10'>
                  <div className={`${location.pathname == '/' ?
                      'bg-orange-400' : 'text-white'} rounded-lg hover:bg-orange-600`}><Link className= 'text-2x1 block mt-2 hover:text-white p-2'  to="/">Clientes</Link></div>
                  <div className={`${location.pathname == '/clientes/nuevo' ? 'bg-orange-400' :
                      'text-white'} rounded-lg hover:bg-orange-600`}><Link className='text-2x1 block mt-2 hover:text-white p-2' to="/clientes/nuevo">Nuevo Cliente</Link></div>
              </nav>
          </aside>
          <main className='md:w-3/4 p-10 md:h-screen overflow-scroll'>
              <Outlet/>
          </main>
    </div>
  )
}

export default Layout