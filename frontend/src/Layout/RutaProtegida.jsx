import { Outlet,Navigate } from "react-router-dom"
import useAuth from "../hooks/useAuth"

const RutaProtegida = () => {

  const { auth} = useAuth()
    console.log(auth);
    {auth?._id ? <Outlet/> : <Navigate to="" />}
    
    return (
      <>
    
        <h1>Desde Ruta Protegida</h1>
   
    </>
  )
}

export default RutaProtegida