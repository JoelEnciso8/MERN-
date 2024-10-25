import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthLayout from "./Layout/AuthLayout.jsx";
import Register_Account from "./pages/Register_Account.jsx";
import Login from "./pages/Login.jsx";
import Confirm_Account from "./pages/Confirm_Account.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import  NotFound from "./pages/NotFound.jsx";


function App() {
// Public Layout  interfaz que vera el usuario, tambien se puede crear un layout privado donde se vera solo las tareas admin con user y password

  return (
      <BrowserRouter>  
        <Routes>
            <Route path="/" element={<AuthLayout/>}>
              <Route path="registrar" element={<Register_Account/>}/>
              <Route index element={<Login/>}/>
              <Route path="confirmar/:id" element={<Confirm_Account/>}/>
              <Route path="olvidePassword" element={<ForgotPassword/>}/>
            </Route>
            <Route path="*" element={<NotFound/>}/>
        </Routes>
    </BrowserRouter> 
    
  
  )
}

export default App
