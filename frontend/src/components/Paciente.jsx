import usePacientes from "../hooks/usePacientes";

const Paciente = ({Paciente}) => {

    const {setEdicion,eliminarPaciente} = usePacientes()
    
    const {email, nombre, propietario, fecha, sintomas, _id} = Paciente

    if (!Paciente) {
        return <p>no hay datos del paciente. Intente de nuevo  </p>
    }
    
  return (
    <div className="mx-5 my-10 bg-white shadow-md px-3 py-5 rounded-xl">
        <p className="font-bold uppercase text-indigo-800"> Pet Name{' '}
        <span className="font-normal  normal-case text-black">{ nombre || 'No disponible'}</span>
        </p>
        <p className="font-bold uppercase text-indigo-800"> Owner{' '}
        <span className="font-normal  normal-case text-black">{ propietario || 'No disponible'}</span>
        </p>
        <p className="font-bold uppercase text-indigo-800"> Email{' '}
        <span className="font-normal  normal-case text-black">{ email || 'No disponible'}</span>
        </p>
        <p className="font-bold uppercase text-indigo-800"> Check In Date{' '}
        <span className="font-normal  normal-case text-black">{ fecha || 'No disponible'}</span>
        </p>
        {/* <p className="font-bold uppercase text-indigo-800"> Telefono{' '}
        <span className="font-normal  normal-case text-black">{ telefono || 'No disponible'}</span>
        </p> */}
        <p className="font-bold uppercase text-indigo-800"> Quote:{' '}
        <span className="font-normal  normal-case text-black">{ sintomas || 'No disponible'}</span>
        </p>

        <div className=" flex justify-between my-5">
            <button 
            type="button" 
            className="py-2 px-10 bg-indigo-600 text-white hover:bg-indigo-700 uppercase font-bold rounded-lg"
            onClick={()=> setEdicion(Paciente)}
            >Editar</button>

            <button 
            type="button" 
            className="py-2 px-10 bg-red-600 text-white hover:bg-red-700 uppercase font-bold rounded-lg"
            onClick={()=>eliminarPaciente(_id)}
            >Eliminar</button>
        </div>
    </div>
  )
}

export default Paciente