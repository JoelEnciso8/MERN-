import jwt  from "jsonwebtoken";
import Veterinario from "../models/Veterinario.js";

// This help to create the webtoken que estaremos usando para confirmar el passdord y poder continuar si esta connfirmado. 

const checkAuth = async (req, res, next) =>{
    let token;

    // Esta palabra es clave en postman ; Bearer
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token,process.env.JWT_SECRET);
            req.veterinario = await Veterinario.findById(decoded.id).select("-password  -token -confirmado")

            return next();
            
            
        } catch (error) {
           const e= new Error('Token No valido ');
               return res.status(404).json({msg: e.message})   
        }
    }

    if (!token) {
            // En caso de que por algun motivo no se este usando el token se dispone este mensaje 
    const error= new Error('Token No valido o no existe');
    return res.status(404).json({msg: error.message})
    }
        next();
};

export default checkAuth;