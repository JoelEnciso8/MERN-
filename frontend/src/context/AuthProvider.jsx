import { useState,useEffect,createContext } from "react";
import clientAxios from "../config/axios";


const AuthContext = createContext()
const AuthProvider = ({children})=>{

    const [cargando,setCargando] = useState(true)
    const[auth,setAuth] = useState({})
    
    useEffect(()=>{ 
        const autenticarUser  = async()=>{
            const token = localStorage.getItem('token')
            if (!token) {
                setCargando(false)
                return
            }

            const config = {
             headers:{
                "Content-Type":"application/json",
                Authorization: `Bearer ${token}`
             }   

            }

            try {
                const {data} = await clientAxios('/veterinarios/perfil',config)
                setAuth(data);
                
            } catch (error) {
                setAuth({})

            }

            setCargando(false)
            
        } 
        
        autenticarUser()
    },[])
    
    const cerrarSesion = () =>{
        localStorage.removeItem('token')
        setAuth({})
    }

    return(
        <AuthContext.Provider 
            value={{
                auth, 
                setAuth,
                cargando,
                setCargando,
                cerrarSesion
            }}    
            
        >
            {children}
        </AuthContext.Provider>
    )

}

export{
    AuthProvider
}













export default AuthContext