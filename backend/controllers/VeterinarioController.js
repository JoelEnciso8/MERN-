import  Veterinario from "../models/Veterinario.js";

const registrar = async (req,res)=>{
    const {email} = req.body //cuadno llenas un form en este caso para registrar se unas .body

    // avoiding duplicate users
    const existeUser = await Veterinario.findOne({email})

        if (existeUser) {
            const error = new Error("User Registered") ;
            return res.status(400).json({msg: error.message})
        } 

    try {
        // Nuevo Veterinario
        const veterinario = new Veterinario(req.body);
        const vetGuardado = await veterinario.save();

        res.json( vetGuardado);

    } catch (error) {
        console.log(error);
        
    }



};



const confirmar = async (req,res)=>{
     // cuando lees datos de la URL utilza params, permite recibir la informacion de la web usando el endpoint
    
    const {token} = req.params; //destructuring

    
    const userConfirmed = await Veterinario.findOne({token})
    
    if (!userConfirmed) {
        const error = new Error("Token No valido");
        return res.status(404).json({msg: error.message})
    }
    
    try {
        userConfirmed.token = null;
        userConfirmed.confirmado = true;
        await userConfirmed.save()

        res.json({msg:'User Confirmed Correctly'})

    } catch (error) {
        console.log(error);
        
    }



    
};



const perfil =(req,res)=>{
    res.json({msg:'Desde el Perfil creado del Veterinario...'})
    
};








const autenticar = async (req, res) =>{
// validamos que exista el user 
    const {email, password} = req.body; // destructuring 
    
    //   Autenticando si el user existe
    const user = await Veterinario.findOne({email})

    if (!user) {
        const error = new Error("El usuario NO existe ");
        return res.status(404).json({msg: error.message})
    }


    // Usuario no confirmado 
    if (!user.confirmado) {
     const error = new Error("Tu cuenta no ha sido confirmada...");
     return res.status(403).json({msg: error.message})
    };

    // revisar Password
    const passwordCorrecto = await user.comprobarPassword(password) 
    if (!passwordCorrecto) {
        return res.status(404).json({msg: "Contraseña incorrecta"});
    }

    res.json({msg: "Inicio de sesión exitoso", user});

};





export{
    registrar,perfil, confirmar,autenticar
};