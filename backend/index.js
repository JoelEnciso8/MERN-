// creamos el servidor express js 
import  express  from "express";
import dotenv from "dotenv";
import conectarDB from "./config/db.js";
import VeterinarioRoute from "./routes/VeterinarioRoute.js";



const app = express();
app.use(express.json());  
/*
express.json() es un middleware integrado en Express que analiza las solicitudes entrantes con un cuerpo de datos en formato JSON.
Sin este middleware, Express no puede entender automáticamente los datos enviados en el cuerpo de una solicitud POST, PUT, o PATCH en formato JSON. Como resultado, el cuerpo de la solicitud (req.body) estaría undefined o vacío.

*/ 

dotenv.config();

conectarDB();



// MiddleWare - Application-level middleware 
app.use("/api/veterinarios",VeterinarioRoute)


const PORT = process.env.PORT || 4000;

app.listen(PORT,()=>{
    console.log(`Servidor Conectado en el puerto ${PORT}`);
    
});