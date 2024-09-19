/*Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment. Mongoose supports Node.js and Deno (alpha). importanto mongoose*/ 
import  mongoose from "mongoose";


const veterinariaSchema = mongoose.Schema({
    nombre:{
        type: String,
        required: true,
        trim: true
    },
    password:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        trim:true
    },
    telefono:{
        type: Number,
        default: null,
        unique: true,
        trim:true
    },
    web:{
        type: String,
        default: null,
    },
    token:{
    
        type: String
    },
    confirmado:{
        type: Boolean,
        default: false,
    },
});



const Veterinario = mongoose.model("Veterinario",veterinariaSchema);

export default Veterinario;