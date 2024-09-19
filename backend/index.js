// creamos el servidor express js 

import  express  from "express";
import dotenv from "dotenv";
import conectarDB from "./config/db.js";
import VeterinarioRoute from "./routes/VeterinarioRoute.js";



const app = express();
app.use(express);

dotenv.config();

conectarDB();

console.log();

// MiddleWare - Application-level middleware 
app.use("/api/veterinarios",VeterinarioRoute )


const PORT = process.env.PORT || 4000;

app.listen(PORT,()=>{
    console.log(`Servidor Conectado en el puerto ${PORT}`);
    
});