/* creamos el servidor express js, para eso tenemos que 
Activar nuestro Node en nuestro comando, npm init
Activar nuestro Express.js en nuestro comnando ya una vez inicializado node.js , npm init express



*/ 
import  express  from "express"; // llamamos nuestro library Express.js  para trabajar con sus middlewares
import dotenv from "dotenv"; // se Agrega a medida que el codigo avanza, para poder proteger informacion sencible, en este caso, contraseñas, dominios, entre otros.
import conectarDB from "./config/db.js"; // Conecta la BD de mongo DB con nuestro proyecto, esta es fundamental para almacenar los datos externos del POST y llamarlos con GET , usando Postman
import VeterinarioRoute from "./routes/VeterinarioRoute.js";//  indica la ruta URL que estaremos usando a lo largo de nuestra aplicacion web, para poder confirmar, registrar, autenticar, etc.
import PacienteRoute from "./routes/PacienteRoute.js"; //indica la ruta URL que estaremos usando a lo largo de nuestra aplicacion web, para poder confirmar, registrar, autenticar, etc.
import cors from "cors"; // es la forma que tiene el web de proteger una API y asegurando que la url este protegida 



const app = express();
app.use(express.json());  
/*
express.json() es un middleware integrado en Express que analiza las solicitudes entrantes con un cuerpo de datos en formato JSON.
Sin este middleware, Express no puede entender automáticamente los datos enviados en el cuerpo de una solicitud POST, PUT, o PATCH en formato JSON. Como resultado, el cuerpo de la solicitud (req.body) estaría undefined o vacío.

*/ 

dotenv.config();

conectarDB();

const dominiosPermitidos =['http://localhost:3000'];

const corsOptions = {
    origin: function(origin, callback) {
        if (dominiosPermitidos.indexOf(origin)!== -1)  {
            // El Origin del request esta permitido
            callback(null,true)
        }
        else{
            callback(new Error('No permitido por CORS'))
        }
    }
}

// using cors
app.use(cors(corsOptions))

// MiddleWare - Application-level middleware 
app.use("/api/veterinarios",VeterinarioRoute)
app.use("/api/pacientes",PacienteRoute)

// Variable de entorno, y puerto local 
const PORT = process.env.PORT || 4000;

app.listen(PORT,()=>{
    console.log(`Servidor Conectado en el puerto ${PORT}`);
    
});