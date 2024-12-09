import { useState } from "react";
import Form from "../components/Form";
import PatientList from "../components/PatientList";

const AdminPacient = () => {
  const [mostrarForm, setMostrarForm] = useState(false);


  return (
    <div className="flex flex-col md:flex-row">
      <button 
        type="button" 
        onClick={()=>setMostrarForm(!mostrarForm)} // Añadimos el manejador de eventos
        className="bg-indigo-500 text-white mx-10 p-2 rounded-md mb-10 md:hidden hover:bg-indigo-900 transition-colors font-bold"
      >
        {mostrarForm ? "Ocultar Formulario" : "Mostrar Formulario"}
      </button>

      <div className={`${mostrarForm ? 'block' : 'hidden'} md:w-1/2 lg:w-2/5`}>
        <Form />
      </div>

      <div className="md:w-1/2 lg:w-3/5">
        <PatientList />
      </div>
    </div>
  );
};

export default AdminPacient;
