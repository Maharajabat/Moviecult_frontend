
import './App.css'
import Home from './components/Home'
import {createBrowserRouter,Navigate,RouterProvider} from 'react-router-dom'
import Categorize from './components/Categorize'
import ViewMovie from './components/ViewMovie'
import User from './components/User'
import Login from './components/Login'
import { useCookies } from 'react-cookie'
function App() {
    const Protectedroute=({children})=>{
      const [cookie]=useCookies();
      return cookie.token?children:<Navigate to="/"/>;
    }
   const routes=createBrowserRouter([
    {
       path:'/',
       Component:Login
    },
    {
      path:'/home',
      element:
      <Protectedroute>
         <Home/>
      </Protectedroute>
    },
    {
      path:'/categorize',
      element:
      <Protectedroute>
         <Categorize/>
      </Protectedroute>
    },
    {
      path:'/movie-details/:id',
      element:
      <Protectedroute>
         <ViewMovie/>
      </Protectedroute>
    },
    {
      path:'/userprofile',
      element:
      <Protectedroute>
         <User/>
      </Protectedroute>
    }
   ])

  return (
    <>
      <RouterProvider router={routes}></RouterProvider>
    </>
  )
}

export default App
