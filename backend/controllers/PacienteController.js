import Paciente from "../models/Paciente.js";

// Usando el CRUD (CREATE, READ, UPDATE; DELETE )


// CRUD que se aplica es CREATE- agregarPaciente

const agregarPaciente = async (req, res) =>{
    const {email} = req.body // .body se usa cuando llenas un form en este caso para registrar un nuevo usuario, el cual cuenta como form  
    
    // avoiding duplicate users
    const existePaciente = await Paciente.findOne({email})

        if (existePaciente) {
            const error = new Error("Paciente Registered") ;
            return res.status(400).json({msg: error.message})
        } 

    const paciente = new Paciente(req.body);
    paciente.veterinario = req.veterinario.id;
    
    try {
        const pacienteRegistrado = await paciente.save();
        res.json(pacienteRegistrado);

    } catch (error) {
        // const error = new Error("Invalid information, try again later");
        // return res.status(404).json({msg: error.message})
        console.log(error);
        
    }
    

};

// CRUD que se aplica es READ- obtenerPacientes / obtenerPaciente

const obtenerPacientes = async(req, res) =>{
    const pacientes = await Paciente.find().where('veterinario').equals(req.veterinario);


    res.json(pacientes)
    

};



const obtenerPaciente = async(req, res) =>{
    const {id} = req.params;


// Validamos el ID si este es correcto o no
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({ msg: 'ID de paciente no válido' });
    }


try {    
    // Obtenemos id y validamos si el paciente esta registrado
    const paciente = await Paciente.findById(id);   
    
    if (!paciente) {
        return res.status(404).json({msg: ' Paciente No encontrado... Intente de nuevo'})
    }    
    
        
        // Verificar el Veterinario correcto.     
        if (paciente.veterinario.id.toString() !== req.veterinario.id.toString()) {
            return res.status(403).json({msg:'Veterinario no encontrado'})
        }

        

        
                // Enviar la respuesta solo si todas las validaciones pasan
        res.json(paciente)
        
    } catch (error) {
        console.log(error);
        
    }
    
    
};    



// CRUD que se aplica es UPDATE- obtenerPacientes

const actualizarPaciente = async(req, res) =>{
    const {id} = req.params;
    // Validamos el ID si este es correcto o no
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({ msg: 'ID de paciente no válido' });
    }
    
    const paciente = await Paciente.findById(id);   

    if (!paciente) {
        return res.status(404).json({msg: ' Paciente No encontrado... Intente de nuevo'})
    } 


    if (paciente.veterinario.id.toString() !== req.veterinario.id.toString()) {
        return res.status(403).json({msg:'Accion No valida'});
    }

    // Actualizar paciente 
    paciente.nombre = req.body.nombre       

        try {
            const pacienteActualizado = await paciente.save();
            res.json(pacienteActualizado)

        } catch (error) {
            console.log(error);
            
        }

    
};



const eliminarPaciente = async(req, res) =>{
    const paciente = 
    res.json({paciente})
};


export{
    agregarPaciente,
    obtenerPacientes,
    obtenerPaciente, 
    actualizarPaciente,
    eliminarPaciente
}