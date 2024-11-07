import express from "express";
const router = express.Router();
import {
    perfil, 
    registrar,
    confirmar,
    autenticar,
    olvidePassword,
    comprobarToken,
    nuevoPassword

} from "../controllers/VeterinarioController.js";
import checkOut from "../middleware/authMiddleware.js";


// Public Area


/*

GET:routing methods Como la vía de acceso se especifica en una única ubicación, la creación de rutas modulares es muy útil, al igual que la reducción de redundancia y errores tipográficos. Para obtener más información sobre las rutas, consulte: Documentación de Router().


  
*/ 

// verbo HTTP y pasandolo por postman para leerlo en la base y almacenarlo 
router.post("/", registrar); //se usa cuando recibe nueva informacion
router.get('/confirmar/:token', confirmar);//get se usa cuando ya hay una informacion agregada
router.post('/login', autenticar);
router.post('/olvide-password', olvidePassword);
router.route("/olvide-password/:token").get(comprobarToken).post(nuevoPassword)

// Private Area
router.get('/perfil',checkOut, perfil); // get se usa cuando ya hay una informacion agg




export default router;
