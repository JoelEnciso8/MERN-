import {  createContext, useState, useEffect} from "react";
import clienteAxios from "../config/axios";
import Alerta from "../components/Alerta";


const PacientesContext = createContext()

export const PacientesProvider = ({children}) => {

    const [alerta, setAlerta] =useState({})
    const [pacientes, setPacientes] =useState([])
    const [paciente, setPaciente] =useState({})

    useEffect(() => {
      const obtenerPacientes = async () => {
       
        try {
            const token = localStorage.getItem('token')
            if(!token) return 

            const config = {
              headers:{ 
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}` ,
              },
            };

            const {data} = await clienteAxios.get('/pacientes',config)
            setPacientes(data);
          } catch (error) {
            setAlerta({
              msg:error.response.data.msg,
              error:true 
            })
          }

        }

        obtenerPacientes()
      }, [localStorage.getItem('token')]);




    const guardarPaciente = async (paciente) => {
      
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      // editando el paciente
      if (paciente.id) {
        const {data} = await clienteAxios.put(`/pacientes/${paciente.id}`,paciente, config)

        const pacienteActualizado = pacientes.map(pacienteState => pacienteState._id === data._id ? data : pacienteState)
        
        setPacientes(pacienteActualizado)
        
      }else{
        try {
  
          const { data } = await clienteAxios.post('/pacientes', paciente, config); // para ver el acceso en nuestra web 
          const { createdAt, updatedAt, __v, ...pacienteAlmacenado } = data; // le pedimos que nos quite los valores que no necesitamos. 
          setPacientes([pacienteAlmacenado,...pacientes])
        } catch (error) {
          setAlerta({
            msg:error.response.data.msg,
            error:true 
          })
        }
      };
      }

    const setEdicion = (paciente) =>{
      setPaciente(paciente)
    }

    const eliminarPaciente = async id => {
        const confirmar = confirm('Deseas Eliminar el Paciente?')

      if (confirmar) {
        try {
          const token = localStorage.getItem('token')
          if(!token) return 

          const config = {
            headers:{ 
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}` ,
            },
          };

          const {data} = await clienteAxios.delete(`/pacientes/${id}`,config)

          const pacientesActualizados = pacientes.filter(pacienteState => pacienteState._id !== id)
          setPacientes(pacientesActualizados)

        } catch (error) {
            console.log(error);
            
        }
      }
        
      
    }


    const {msg} = alerta
    
  return (
    <PacientesContext.Provider
        value={{
            pacientes,
            guardarPaciente,
            setPacientes,
            setEdicion,
            paciente,
            eliminarPaciente
        }}
    >
        {children}
    </PacientesContext.Provider>
  )
}


export default PacientesContext