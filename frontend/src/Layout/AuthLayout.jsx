import { Outlet } from "react-router-dom";
const AuthLayout = () => {
  return (
    <>

        <main className="container mx-auto md:grid md:grid-cols-2 mt-20 w-full p-10 items-center">
        <Outlet />

        </main>
    </>
  )
}

export default AuthLayout