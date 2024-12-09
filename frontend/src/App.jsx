import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthLayout from "./Layout/AuthLayout.jsx";

import  NotFound from "./pages/NotFound.jsx";
import RutaProtegida from "./Layout/RutaProtegida.jsx";

import Login from "./pages/Login.jsx";
import Register_Account from "./pages/Register_Account.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import Confirm_Account from "./pages/Confirm_Account.jsx";
import NewPassword from "./pages/NewPassword.jsx";
import AdminPacient from "../src/pages/AdminPacient.jsx";

import { AuthProvider } from "../src/context/AuthProvider.jsx";
import { PacientesProvider } from "../src/context/PacientesProvider.jsx";

function App() {  
// Public Layout  interfaz que vera el usuario, tambien se puede crear un layout privado donde se vera solo las tareas admin con user y password

  return (
      <BrowserRouter>  
          <AuthProvider>
            <PacientesProvider>
              <Routes>
                  <Route path="/" element={<AuthLayout/>}>

                        <Route index element={<Login/>}/>
                        <Route path="registrar" element={<Register_Account/>}/>
                        <Route path="confirmar/:id" element={<Confirm_Account/>}/>
                        <Route path="olvidePassword" element={<ForgotPassword/>}/>
                        <Route path="olvidePassword/:token" element={<NewPassword/>}/>
                    </Route>



                    <Route path="/admin" element={<RutaProtegida/>}>
                      <Route index element={<AdminPacient/>}/>
                   </Route>
                  
                  
                    <Route path="*" element={<NotFound/>}/>
              </Routes>
            </PacientesProvider>
          </AuthProvider>
      </BrowserRouter> 
    
  
  )
}

export default App
