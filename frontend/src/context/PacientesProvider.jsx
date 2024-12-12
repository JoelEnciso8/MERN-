import {  createContext, useState, useEffect} from "react";
import clienteAxios from "../config/axios";


const PacientesContext = createContext()

export const PacientesProvider = ({children}) => {

    const [pacientes, setPacientes] =useState([])

    const guardarPaciente = async (paciente) => {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        };
        const { data } = await clienteAxios.post('/pacientes', paciente, config); // para ver el acceso en nuestra web 

        const { createdAt, updatedAt, __v, ...pacienteAlmacenado } = data; // le pedimos que nos quite los valores que no necesitamos. 

        setPacientes([pacienteAlmacenado,...pacientes])


      } catch (error) {
        console.log(error.response.data.msg);
      }
    };

    
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