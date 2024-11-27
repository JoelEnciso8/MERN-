import { useState } from "react";
import { Link } from "react-router-dom"; // se importa la manera en como react Importa los links, consumiendo menos memoria
import useAuth from "../hooks/useAuth";
import Alerta from "../components/Alerta";
import clientAxios from "../config/axios";

const Login =  () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alerta, setAlerta] = useState({});


  const handleSubmit = async e =>{
    e.preventDefault()
    
      if ([email,password].includes('')) {
        setAlerta({
        msg:'Todos los campos son obligatorios!!',
        error:true
      });
      ocultarAlerta()
      return

    }
      
    
  try {
    const {data} =  await clientAxios.post('/veterinarios/login',{email,password});

    // limpiando los campos 
    limpiarCampos();

    localStorage.setItem('Token',data.token)
    
  } catch (error) {
    setAlerta({
      msg: error.response.data.msg,
      error: true 
    })
    ocultarAlerta()
  }

  }


  const ocultarAlerta = () => {
    setTimeout(() => {
      setAlerta({})
    }, 3000);
    
  }
  
  const limpiarCampos = () => {
    setEmail("");
    setPassword("");
  };
  
  const {msg} = alerta
  return (
    <>
      
      <div> 

          <h1 className=" text-indigo-600 font-bold text-7xl">
              Inicia Sesión y Administra tus {" "}
              <span className=" font-black text-green-700"> Pacientes</span>
          </h1>

      </div>

      <div className="w-full space-y-7 mt-8 md:mt-20 shadow-xl px-7 py-10 rounded-xl bg-white">

         {alerta.msg && <Alerta
            alerta={alerta}
          />}
        <form onSubmit={handleSubmit}>
            <div className=" my-2">
                <label className="mt-20  text-gray-700 block text-xl font-bold">

                  Email

                </label>
                  <input
                  type="email"
                  placeholder=" Type your Email"
                  className="border w-full p-3 mt-2 bg-gray-50 rounded-xl"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  />
            </div>
              <div> 
                 <label className="  text-gray-700 block text-xl font-bold">

                  Password

                </label>
                  <input

                  type="password"
                  placeholder=" Type your Password"
                  className="border w-full p-3 mt-2 bg-gray-50 rounded-xl"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />           
            </div>  
            <input
             type="submit" 
             value= "Log In"
             className="bg-indigo-700 w-full py-3 mt-4 hover:cursor-pointer hover:bg-indigo-900 text-white font-bold rounded-xl"
             />
        </form> 
            <nav className=" mt-2 lg:flex lg: justify-between items-center" >
              <Link className="block text-center my-5 text-gray-500"
              href to="/registrar">Sign In as a new Doctor.
              </Link>

              <Link className="block text-center my-5 text-gray-500"
              href to="/olvidePassword">Forgot Password?
              </Link>
            </nav>
      </div>
    
    </>
  )
}

export default Login