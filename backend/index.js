import express from "express";
import dotenv from "dotenv";
import conectarDB from "./config/db.js";
import VeterinarioRoute from "./routes/VeterinarioRoute.js";
import PacienteRoute from "./routes/PacienteRoute.js";
import cors from "cors";

const app = express();
app.use(express.json());

dotenv.config();

conectarDB();

const dominiosPermitidos = [process.env.FRONTEND_URL];
const corsOptions = {
  origin: function (origin, callback) {
    console.log('origin:', origin);
    
    if (dominiosPermitidos.indexOf(origin) !== -1 || !origin) {
      // El Origin del request esta permitido
      callback(null, true);
    } else {  
      callback(new Error('No permitido por CORS'));
    }
  },
  methods: 'GET,POST,PUT,DELETE,OPTIONS',
  allowedHeaders: 'Content-Type, Authorization',
  optionsSuccessStatus: 200 // Para navegadores legacy como IE11
};

// using cors
app.use(cors(corsOptions));

// MiddleWare - Application-level middleware 
app.use("/api/veterinarios", VeterinarioRoute);
app.use("/api/pacientes", PacienteRoute);

// Variable de entorno, y puerto local 
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Servidor Conectado en el puerto ${PORT}`);
});
