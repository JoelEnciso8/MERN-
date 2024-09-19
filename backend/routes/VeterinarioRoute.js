import express from "express";
const router = express.Router();
import {perfil, registrar} from "../controllers/VeterinarioController.js";




// verbo HTTP y pasandolo por postman para leerlo en la base y almacenarlo
router.post("/",registrar); //se usa cuando recibe nueva informacion
router.get('/perfil',perfil); // get se usa cuando ya hay una informacion agg







export default router;
