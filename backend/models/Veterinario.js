/*Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment. Mongoose supports Node.js and Deno (alpha). importanto mongoose*/ 
import  mongoose from "mongoose";
import bcrypt from "bcrypt";
import generarId from "../helpers/generarid.js";




const veterinariaSchema = mongoose.Schema({
    nombre:{
        type: String,
        required: true,
        trim: true
    },
    password:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
        trim:true
    // },
    // telefono:{
    //     type: Number,
    //     default: null,
    //     unique: true,
    //     trim:true
    },
    web:{
        type: String,
        default: null,
    },
    token:{
        type: String,
        default: generarId()
    },
    confirmado:{
        type: Boolean,
        default: false,
    },
});

//hash password para evitar perdida de Datos 
veterinariaSchema.pre('save', async function(next){
if (!this.isModified("password")) {
  return  next();
}

//Validacion de seguridad hash
const salt = await bcrypt.genSalt(10)
this.password = await bcrypt.hash(this.password, salt);
next();
});

// comprobamos el password de cada user
veterinariaSchema.methods.comprobarPassword = async function (passwordFormulario) {
    return await bcrypt.compare(passwordFormulario, this.password)
}

const Veterinario = mongoose.model("Veterinario",veterinariaSchema);
export default Veterinario;
