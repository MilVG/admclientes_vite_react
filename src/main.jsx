import React, { Children } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider} from "react-router-dom";
import Layout from './components/Layout';
import NuevoCliente,{action as nuevoClienteAction} from './pages/NuevoCliente';
import Index, { loader as clientesloader, loader } from './pages/Index';
import ErrorPage from './components/ErrorPage';
import EditarCliente,{loader as editarClienteloader,action as editarClienteAction} from './pages/EditarCliente';
import { action as eliminarClienteAction } from './components/Cliente';



const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Index/>,
        loader: clientesloader,
        errorElement:<ErrorPage/>
      },
      {
        path: '/clientes/nuevo',
        element: <NuevoCliente />,
        action: nuevoClienteAction,
        errorElement:<ErrorPage/>
      }, {
        path: '/clientes/:clienteId/editar',
        element: <EditarCliente />,
        loader: editarClienteloader,
        action:editarClienteAction,
        errorElement: <ErrorPage/>
      },
      {
        path: '/clientes/:clienteId/eliminar',
        action:eliminarClienteAction
      }
    ]
  }
  
])

const el = document.getElementById('root')
if (el === null) throw new Error(`Root container missing in Index.html`)
const root = ReactDOM.createRoot(el);root.render(
  <React.StrictMode>
    <RouterProvider  router={router}/>
  </React.StrictMode>,
)
