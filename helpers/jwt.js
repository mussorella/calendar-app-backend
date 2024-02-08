

const jwt = require('jsonwebtoken');

const generarJWT=(uid,name)=>{
    
    return new Promise((resolve,reject)=>{

        const payload={uid,name}
        jwt.sign(payload, process.env.SECRET_JWT_SEED, {
            expiresIn:'3w'
        }, (err,token)=>{
            if(err){
                console.log(err)
                reject('No se pudo generar el token')
            }
            resolve(token)//si esta todo bien con el uid y name del paylaod, me da el token sino me tira error
        })//el segundo es la variable de entorno de la palabra secreta seriadel token



    })
}


module.exports={
    generarJWT
}