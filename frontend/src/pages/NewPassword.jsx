import { useState , useEffect } from "react";
import { useParams,Link } from "react-router-dom";
import Alerta from "../components/Alerta";
import clientAxios from "../config/axios";



const NewPassword = () => {
  const [ password, setPassword] = useState("")
  const [ repeatPassword, setrepeatPassword] = useState("")
  const [ alerta, setAlerta] = useState({})
  const [tokenValido, setTokenValido] = useState(false)
  const [passwordModificado, setPasswordModificado] = useState(false)


  const params = useParams()
  const {token} = params

  useEffect(() =>{
    const comprobarToken = async () =>{
        try {
          await clientAxios.post(`/veterinarios/olvidePassword/${token}`)

          setTokenValido(true)

        } catch (error) {
          console.log(error.response);
          
          setAlerta({
            msg:"Hubo un error en la URL,  intente mas tarde..",
            error:true
          })
        };
    };

    comprobarToken()
  },[])
  
  const handleSubmit = async(e) =>{
      e.preventDefault()
      if (password.length < 6) {
        setAlerta({
          msg: 'Minimo 6 caracteres, intente de nuevo',
          error:true
        })

        if (password !== repeatPassword) { setAlerta({ msg: 'Las contraseñas no coinciden, intente de nuevo', error: true }); return; }
      } 


      try {
        const url = `/veterinarios/olvidePassword/${token}`
        const {data} = await clientAxios.post(url,{password})
        setAlerta({
          msg: data.msg
        });
        setPassword('')
        setrepeatPassword('')
        setPasswordModificado(true)
      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true 
        })
      }

  }


  const { msg } = alerta;
  
  return (
  <>
    <div>
      <h1 className="text-indigo-700 font-black text-6xl">
        Eres nuestra  {" "}<span className="text-green-800">Prioridad</span>, dejame ayudarte con tu password
      </h1>
    </div>
    {msg && <Alerta alerta={alerta} />}
    {tokenValido && (<>
          <form onSubmit={handleSubmit }>
          <div className="my-2">
                  <label className="text-gray-700 block text-xl font-bold">
                   New Password
                  </label>
                  <input
                    type="password"
                    placeholder="Type your Password"
                    className="border w-full p-3 mt-2 bg-gray-50 rounded-xl"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                </div>
                <div className="my-2">
                  <label className="text-gray-700 block text-xl font-bold">
                    Repeat New Password
                  </label>
                  <input
                    type="password"
                    placeholder="Type your Password"
                    className="border w-full p-3 mt-2 bg-gray-50 rounded-xl"
                    value={repeatPassword}
                    onChange={e => setrepeatPassword(e.target.value)}
                  />
                </div>
                <input
                  type="submit"
                  value="Actualizar"
                  className="bg-indigo-700 w-full py-3 mt-4 hover:cursor-pointer hover:bg-indigo-900 text-white font-bold rounded-xl"
                />
      
          </form>

         </>

    )};
                  {passwordModificado && 
                    <Link
                     className="block text-center my-5 text-gray-500" to="/">Log In
                     </Link>
                  }

  </>

  )
};

export default NewPassword