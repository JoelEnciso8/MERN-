import {  createContext, useState, useEffect} from "react";
import clienteAxios from "../config/axios";


const PacientesContext = createContext()

export const PacientesProvider = ({children}) => {

    const [pacientes, setPacientes] =useState([])

    const guardarPaciente = async (paciente) =>{

        try {
            const token = localStorage.getItem('token')
            const config ={
                headers:{
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const {data} = await clienteAxios.post('/pacientes',pacientes,config)
            console.log(data);
            const {__v ,...pacienteAlmacenado} = data

            setPacientes([pacienteAlmacenado,...paciente])

            
        } catch (error) {
            console.log("Error:", error.response ? error.response.data.msg : error.message);            
        }
    }

  return (
    <PacientesContext.Provider
        value={{
            pacientes,
            guardarPaciente,
            setPacientes
        }}
    >
        {children}
    </PacientesContext.Provider>
  )
}


export default PacientesContext