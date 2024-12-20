import usePacientes from '../hooks/usePacientes'
import Paciente from "./Paciente.jsx";
 
const PatientList = () => {

  const {pacientes} = usePacientes()
  
  return (
    <>
    
    
    {
      pacientes.length 
        ? 
        (
          <> 
            <h2 className=' font-black text-3xl text-center'> Listado Pawcientes</h2>

            <p className='text-xl mt-5 mb-10 text-center'> 
                Administra tus {''}
                <span className='text-indigo-700 font-bold'> Pacientes y Citas.</span>
            </p>
            {pacientes.map((paciente)=>(
              <Paciente 
                key={paciente._id}
                Paciente={paciente}
              />
            ))}
          </>
        )
        
        :
        (
          <> 
            <h2 className=' font-black text-3xl text-center'> No Hay Pacientes...</h2>

            <p className='text-xl mt-5 mb-10 text-center'> 
                Comienza agregando Pacientes{''}
                <span className='text-indigo-700 font-bold'> y aparacerán en este lugar.</span>
            </p>
          </>
        )
    }
    </>


  )
}

export default PatientList