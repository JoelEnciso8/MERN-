import  Veterinario from "../models/Veterinario.js";
import generarJWT  from "../helpers/generarJWT.js";
import generarId from "../helpers/generarid.js";
import emailRegistro from "../helpers/emailRegistro.js";
import emailOlvidePassword from "../helpers/emailOlvidePassword.js";

// permite controlar el registro que se esta haciendo, asi evitamos duplicados con el mismo correo, por lo general se usa el correo para confirmacion de unica cuenta. 

const registrar = async (req,res)=>{
    const {email, nombre} = req.body // .body se usa cuando llenas un form en este caso para registrar un nuevo usuario, el cual cuenta como form  

    // avoiding duplicate users
    const existeUser = await Veterinario.findOne({email})

        if (existeUser) {
            const error = new Error("User Registered") ;
            return res.status(400).json({msg: error.message})
        } 

    try {
        // Nuevo Veterinario
        const token= generarId();
        const veterinario = new Veterinario({...req.body,token});
        const vetGuardado = await veterinario.save();
        
        // Enviar Email es lo que se pasa mediante la funcion email registro, en token, este nos muestra el token guardado que se asigna  
            emailRegistro({
                email,
                nombre,
                token:vetGuardado.token
            });

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

       return res.json({msg:'User Confirmed Correctly'})

    } catch (error) {
        const e = new Error("NO data server")
        return res.status(404).json({msg: e.message});   
    }  
};



const perfil =(req,res)=>{   
    const {veterinario: perfil} = req
    res.json({perfil})
    
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
     return res.status(403).json({msg: error.message});
    };

    // revisar Password
    if (await user.comprobarPassword(password)) {
        res.json({token: generarJWT(user.id),msg: "Inicio de sesión exitoso", user})
    } else {
        const error = new Error("Contraseña incorrecta")
        return res.status(404).json({msg: error.message});

    }

};


const olvidePassword = async (req,res)=>{   
    const { email} = req.body; // body: es usualmente la informacion del formulario que estamos creando, en este caso la estructura del obj en json 

    const existeVeterinario = await Veterinario.findOne({email});
    if (!existeVeterinario) {
        const error = new Error("User no existe...");
        return res.status(404).json({msg: error.message})
    }

    try {
        existeVeterinario.token = generarId();
        await existeVeterinario.save();
        // enviar email con instrucciones
        emailOlvidePassword({
            email,
            nombre: existeVeterinario.nombre,
            token: existeVeterinario.token
        })


        res.json({msg: "Hemos Enviado un Email , revisalo"})
    } catch (error) {
        const e = new Error("no existe Data...");
        return res.status(404).json({msg: e.message})
        
    }
};

const comprobarToken = async (req,res)=>{   
    const {token } = req.params // params: lee la informacion de la URL lo cual manda el msj por postman y lo transmite en el body 

    const tokenValido = await Veterinario.findOne({token});
    
    if (tokenValido) {        
        // Token Valido, user exist
        res.json({msg: "Token Valido, User exist"})

    }else{
        const error = new Error("Token no valido");
        return res.status(404).json({msg: error.message})
    }

    
        
};

const nuevoPassword = async (req,res)=>{   
    const {token } = req.params
    const {password } = req.body
  
    const veterinario = await Veterinario.findOne({token});
    if (!veterinario) {
        const error = new Error("Hubo un Error ");
        return res.status(404).json({msg: error.message})

    };

    try {
        console.log('Token encontrado:', token);
         console.log('Password nuevo:',password);

        veterinario.token = null;
        veterinario.password = password;
        await veterinario.save();

        res.json({msg:"Password modificado correctamente"})
        
    } catch (e) {
        const error = new Error("Hubo un Error al reconocer la informacion");
        return res.status(404).json({msg: error.message})
    }

    res.json({})
    
};




export{
    registrar,perfil, confirmar,autenticar,olvidePassword,nuevoPassword,comprobarToken
};