const registrar = (req,res)=>{


    console.log(req.body);
    
    res.json( { msg: 'Registrando User...'});

};


const perfil =(req,res)=>{
    res.json( {msg:'mostrando perfil'} )
};






export{
    registrar,perfil
};