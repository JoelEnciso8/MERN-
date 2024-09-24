import  Veterinario from "../models/Veterinario.js";

const registrar = async (req,res)=>{
    const {email, password, nombre,telefono} = req.body

    try {
        // Nuevo Veterinario
        const veterinario = new Veterinario(req.body);
        const vetGuardado = await veterinario.save();

        res.json( {msg:'Registrando Veterinario...'});

    } catch (error) {
        console.log(error);
        
    }



};


const perfil =(req,res)=>{
    res.send({msg:'Desde el Perfil creado del Veterinario...'})
    
};






export{
    registrar,perfil
};