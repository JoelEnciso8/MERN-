import { useState } from "react";
import {  Link } from "react-router-dom";
import  axios  from "axios"; // Axios es un Cliente HTTP basado en promesas para node.js y el navegador. Es isomorfico (= puede ejecutarse en el navegador y nodejs con el mismo código base).
import Alerta from "../components/Alerta.jsx";

function Register() {
  const[nombre, setNombre] =useState('')
  const[email, setEmail] =useState('')
  const[password, setPassword] =useState('')
  const[repeatPassword, setrepeatPassword] =useState('')
  // Alerta mensage
  const [ alerta, setAlerta ] = useState({})
  

  const handleSubmit = async (e) =>{
    e.preventDefault();

    if ([nombre, email, password, repeatPassword].includes('')) 
      {
      setAlerta({msg:'Aun hay campos vacios',error:true});
        return;
      }  
      

    if (password!== repeatPassword) {
      setAlerta({msg: 'No son Iguales, repetir de nuevo', error: true});
          return;
        }    

    if (password.length < 6) {
      setAlerta({msg:'password muy corto, Min 6 Max 8 Caracteres, intente de nuevo ',error:true});
          return;
        }  

        setAlerta({});
        //Creando user en la API 

        try {
          const url = "http://localhost:4000/api/veterinarios"
          const respuesta = await axios.post(url,{nombre, email, password})
          console.log(respuesta);
          
        } catch (error) {
          console.log(error);
          
        }
      }  

      const {msg} = alerta     
       
  return (
    <>
        <div>
          
            <h1 className=" text-indigo-700 font-black text-6xl">
              Formulario Unico de {" "}<span className="text-green-800"> registro </span>
            </h1>
        </div>
        
        <div className=" space-y-5 mt-5 md:mt-20 shadow-xl px-7 py-10 rounded-xl bg-white">

          {msg && <Alerta
            alerta={alerta}
          />}

         <form onSubmit={handleSubmit}>
              <div className=" my-2">
                  <label className="mt-20  text-gray-700 block text-xl font-bold">
                    Nombre
                  </label>

                  <input
                    type="text"
                    placeholder=" Type your name..."
                    className="border w-full p-3 mt-2 bg-gray-50 rounded-xl"
                    value={nombre}
                    onChange={e => setNombre(e.target.value)}
                  />
              </div>
                  <div className=" my-2">
                      <label className="  text-gray-700 block text-xl font-bold">
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

                      <div className=" my-2">
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

                          <div className=" my-2">
                              <label className="  text-gray-700 block text-xl font-bold">
                                Repeat Password
                              </label>
                                <input
                                type="password"
                                placeholder=" Type your Password"
                                className="border w-full p-3 mt-2 bg-gray-50 rounded-xl"
                                value={repeatPassword}
                                onChange={e => setrepeatPassword(e.target.value)}
                              />           
                          </div>  
                        <input
                        type="submit" 
                        value= "Finalizar"
                        className="bg-indigo-700 w-full py-3 mt-4 hover:cursor-pointer hover:bg-indigo-900 text-white font-bold rounded-xl"
                        />
        </form> 

        <nav className=" mt-2 lg:flex lg: justify-between items-center" >
              <Link className="block text-center my-5 text-gray-500"
              href to="/">Already Signed In? Log In
              </Link>

              <Link className="block text-center my-5 text-gray-500"
              href to="/olvidePassword">Forgot Password?
              </Link>
            </nav>

      </div>    
    </>
  )
}

export default Register