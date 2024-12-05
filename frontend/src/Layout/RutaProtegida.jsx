import { Outlet,Navigate } from "react-router-dom"
import useAuth from "../hooks/useAuth"

const RutaProtegida = () => {

  const { auth} = useAuth()
    console.log(auth);
    
    return (
      <>
    
        <h1>Desde Ruta Protegida</h1>
      {auth?._id ? <Outlet/> : <Navigate to="" />}
   
    </>
  )
}

export default RutaProtegida