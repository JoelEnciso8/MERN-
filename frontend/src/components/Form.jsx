import {useState, useEffect} from 'react'
import Alerta from "../components/Alerta";
import  usePacientes from "../hooks/usePacientes";

const Form = () => {

    const [nombre, setNombre] = useState('')
    const [propietario, setPropietario] = useState('')
    const [email, setEmail] = useState('')
    const [fecha, setFecha ]= useState('')
    const [sintomas, setSintomas] = useState('')
    // const [telefono, setTelefono] = useState('')
    const [id, setId] = useState(null)

    const [alerta , setAlerta] = useState({})

    const {guardarPaciente, paciente } = usePacientes()

    useEffect(()=>{
        if (paciente?.nombre) {
            setNombre(paciente.nombre || "" )
            setPropietario(paciente.propietario || "")
            setEmail(paciente.email || "")
            setFecha(paciente.fecha || "")
            // setTelefono(paciente.telefono || "")
            setSintomas(paciente.sintomas || "")
            setId(paciente._id || null)
        }
    },[paciente])


    const handleSubmit = e  =>{
        e.preventDefault()

        // Validar Form 
        if ([nombre, propietario,email,fecha,sintomas].includes('')) {
            setAlerta({
                msg:'Todos Los campos son obligatorios!!',
                error:true
                
            });
                // Ocultando alerta
                setTimeout(() => {
                    setAlerta({})
                }, 3000);
            
            return ;
        }


        setAlerta({})
        // Guarda al paciente 
        guardarPaciente({nombre, propietario,email,fecha,sintomas,id})
        
        setAlerta({
            msg:'paciente Registrado',
            error:false
         });

         
        // Limpiar el formulario después de enviar
        setNombre('');
        setPropietario('');
        // setTelefono('');
        setEmail('');
        setFecha('');
        setSintomas('');

                // Ocultar la alerta después de 3 segundos
                setTimeout(() => {
                    setAlerta({});
                }, 3000);

    }

    const {msg} = alerta

  return (
    <>

            <h2 className=' font-black text-3xl text-center'> Administrador de Pacientes</h2>

            <p className='text-xl mt-5 mb-10 text-center'> 
                Añade tus pacientes y  {''}
                <span className='text-indigo-700 font-bold'> Administralos.</span>
            </p>


        <form className='bg-white py-10 px-5 mb-10 lg:mb-5 shadow-md rounded-md'
        onSubmit={handleSubmit}>
            <div className='mb-5'>
                <label
                className='text-gray-700 uppercase font-bold' 
                htmlFor='nombre'
                >Paw Name</label>
                <input
                    
                    id="nombre"
                    type="text" 
                    placeholder='Pet Name'
                    className='border-2 w-full p-2 mt-2 placeholder-gray-500 rounded-md'
                    value={nombre}
                    onChange={e => setNombre(e.target.value)}
                    
                    />
            </div>
            
            <div className='mb-5'>
                <label
                className='text-gray-700 uppercase font-bold' 
                htmlFor='propietario'
                >Owner's Name</label>
                <input
                    id="propietario"
                    type="text" 
                    placeholder='Pet Owner'
                    className='border-2 w-full p-2 mt-2 placeholder-gray-500 rounded-md'
                    value={propietario}
                    onChange={e => setPropietario(e.target.value)}
                    />
            </div>
            
            {/* <div className='mb-5'>
                <label
                className='text-gray-700 uppercase font-bold' 
                htmlFor='telefono'
                >Phone Number</label>
                <input
                    id="telefono"
                    type="text" 
                    placeholder='Phone Number'
                    className='border-2 w-full p-2 mt-2 placeholder-gray-500 rounded-md'
                    value={telefono}
                    onChange={e=> setTelefono(e.target.value)}
                    />
            </div> */}
            
            <div className='mb-5'>
                <label
                className='text-gray-700 uppercase font-bold' 
                htmlFor='email'
                >Email</label>
                <input
                    id="email"
                    type="text" 
                    placeholder='email'
                    className='border-2 w-full p-2 mt-2 placeholder-gray-500 rounded-md'
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    />
            </div>
            
            <div className='mb-5'>
                <label
                className='text-gray-700 uppercase font-bold' 
                htmlFor='Check in'
                >Check in</label>
                <input
                    id="fecha"
                    type="date" 
                    className='border-2 w-full p-2 mt-2 placeholder-gray-500 rounded-md'
                    value={fecha}
                    onChange={e => setFecha(e.target.value)}
                    />
            </div>
            
{/*             
            <div className='mb-5'>
                <label
                className='text-gray-700 uppercase font-bold' 
                htmlFor='Check out'
                >Check out</label>
                <input
                    id="fecha"
                    type="date" 
                    className='border-2 w-full p-2 mt-2 placeholder-gray-500 rounded-md'
                    value={fecha}
                    onChange={e => setFecha(e.target.value)}
                    />
            </div> */}
            
            
            <div className='mb-5'>
                <label
                className='text-gray-700 uppercase font-bold' 
                htmlFor='sintomas
                '
                >Syntomas</label>
                <textarea
                    id="sintomas" 
                    className='border-2 w-full p-2 mt-2 placeholder-gray-500 rounded-md'
                    value={sintomas}
                    onChange={e => setSintomas(e.target.value)}
                    />
            </div>
            
            <input 
            className='bg-indigo-600 cursor-pointer w-full p-3 text-white uppercase font-bold hover:bg-indigo-900 transition-colors'
            type="submit" 
            value={id ? 'Guardar Cambios' : ' Agregar Pacientes'}
            />



        </form>
        
        {/* pasamos la alerta */}
        {msg && <Alerta alerta={alerta}/>}


    </>
  )
}

export default Form