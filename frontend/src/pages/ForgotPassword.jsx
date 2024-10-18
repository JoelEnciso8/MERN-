import {  Link } from "react-router-dom";
const ForgotPassword = () => {
  return (
    
    <>
      <div> 

        <h1 className=" text-indigo-600 font-bold text-5xl">
            Recupera tu Usuario y Administra tus {" "}
            <span className=" font-black text-green-800"> Pacientes</span>
        </h1>

      </div>
      
        <div className=" space-y-5 mt-5 md:mt-20 shadow-xl px-7 py-10 rounded-xl bg-white">
          <form>
              <div className=" my-5">
                  <label className="mt-20  text-gray-700 block text-xl font-bold">

                    Email

                  </label>

                  <input
                    type="email"
                    placeholder=" Type your Email"
                    className="border w-full p-3 mt-2 bg-gray-50 rounded-xl"
                  />
              </div>
                <input
                  type="submit" 
                  value= "Enviar Instrucciones "
                  className="bg-indigo-700 w-full py-3 mt-4 hover:cursor-pointer hover:bg-indigo-900 text-white font-bold rounded-xl"
                />
          </form>

          <nav className=" mt-10 lg:flex lg: justify-between items-center" >
          <Link className="block text-center my-5 text-gray-500"
              href to="/registrar">Sign In as a new Doctor.
              </Link>

              <Link className="block text-center my-5 text-gray-500"
              href to="/login">Already Signed In? Log In
              </Link>
            </nav>
        </div>    
    </>
      

  )
}

export default ForgotPassword