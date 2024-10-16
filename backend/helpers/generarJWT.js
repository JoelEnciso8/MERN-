// creamos nuestro jsonWebTOken  para crear un token que sirva para enviar datos entre aplicaciones o servicios y garantizar que sean válidos y seguros, es para manejar la autenticación en aplicaciones móviles o web.

import jwt from "jsonwebtoken";



const generarJWT = (id) =>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn: "30d"
    })
};


export default generarJWT;