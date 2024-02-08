const { response } = require("express")
const jwt= require('jsonwebtoken')



const validarJWT=( req, res = response , next)=>{

//x-token headers

const token =req.header('x-token');//aca estoy viendo si toma el token del usuario 

if(!token){
    return res.status(401).json({
        ok:false,
        msg:'No hay token en la peticion'
    })
}

try{

const {uid,name}=jwt.verify(
    token,
    process.env.SECRET_JWT_SEED
);

req.uid=uid;
req.name=name;


} catch(error){
    return console.log(error), res.status(401).json({
        ok:false,
        msg: 'Token no válido'
        
    })

}




next();
}

module.exports={
    validarJWT
}