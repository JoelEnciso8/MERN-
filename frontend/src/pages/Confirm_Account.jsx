import { useEffect,useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import  Alerta  from "../components/Alerta.jsx";

const Confirm_Account = () => {
  const [cuentaConfirmada, setCuentaConfirmada] = useState(false);
  const [cargando, setCargando] = useState(true);
  const [alerta, setAlerta] = useState({})
  const params = useParams();
  const {id} = params

  useEffect(()=>{
    const confirmAccount = async () =>{
      try {
        const URL = `http://localhost:4000/api/veterinarios/confirmar/${id}`;
        const {data} = await axios.get(URL);
        console.log(data);
                
      } catch (error) {
        setAlerta({
          msg:error.response.data.msg,
          error: true
        });
        
      }
      setCargando(false)
    }
    confirmAccount();
  },[id])
  

  return (
    <>
    
    <div>
          
            <h1 className=" text-indigo-700 font-black text-6xl">
              confirma tu cuenta, y comienza a administrar {" "}<span className="text-green-800">tus pacientes. </span>
            </h1>
        </div>
        
        <div className=" space-y-5 mt-5 md:mt-20 shadow-xl px-7 py-10 rounded-xl bg-white">
          { 
            <Alerta
            alerta={alerta}
          />}

      </div>    
    
    </>
  )
}

export default Confirm_Account