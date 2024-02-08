const {response} = require("express");
const Evento=require('../models/Evento')


const getEventos= async (req, res= response) => {
    //quiero que me retorne todos los eventos


    const eventos= await Evento.find()
                                .populate('user', 'name')//con esto muestro la info que quiero en postman
    
    res.json({
        ok:true,
        eventos})//con esto llamo a los eventos
}



const crearEvento= async (req, res= response)=>{
    
    
//para guardar un evento!!
    const evento= new Evento(req.body)//para guardar en la abse de datos un evento

    try {
       
       //antes de guardarlo tengo que conseguir el usuario
       evento.user=req.uid
       //lo guardo
        const eventoGuardado=  await evento.save()//con esto grabamos el evento
        
        
        res.json({
            ok:true,
            evento : eventoGuardado
        })
    
    } catch (error) {
        console.log(error),
        res.status(500).json({
            ok:false,
            msg:"hable con el administrador"
        });
    }

}




const actualizarEvento=async(req, res= response)=>{ 
    //primero voya  tomar el valor del id de evento
    const eventoId= req.params.id;
    const uid=req.uid;//pide el id
    
    try {
        //para verificar si esta en la base de datos
        
        const evento= await Evento.findById(eventoId)
        
        
        
        if (!evento){
            return res.status(404).json({
                ok:false,
                msg:"El evento no existe con ese id"
            });
        };
        if (evento.user.toString() !== uid){//compara el striung del id
            return res.status(401).json({
                ok:false,
                msg:"no tiene permiso para editar este evento"
            })
        }//si es el mismo explaya el body de la nota y el id del usuario
        const nuevoEvento= {
            ...req.body,
            user:uid
        }
        const eventoActualizado=await Evento.findByIdAndUpdate(eventoId, nuevoEvento, {new:true} )//lo busca por actualizacion y id
        res.json({
            ok:true,
            evento: eventoActualizado//actualiza el evento
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:"hable con el administrador"
        })
        
    }
    

}

const eliminarEvento= async (req, res= response)=>{ 
    
        //primero voya  tomar el valor del id de evento
        const eventoId= req.params.id;
        const uid=req.uid;
        try {
            //para verificar si esta en la base de datos
            
            const evento= await Evento.findById(eventoId)
            
            
            
            if (!evento){
                return res.status(404).json({
                    ok:false,
                    msg:"El evento no existe con ese id"
                });
            };
            if (evento.user.toString() !== uid){//compara el striung del id
                return res.status(401).json({
                    ok:false,
                    msg:"no tiene permiso para editar este evento"
                })
            }//si es el mismo explaya el body de la nota y el id del usuario
            
            await Evento.findByIdAndDelete(eventoId )//lo busca por actualizacion y id
            res.json({
                ok:true,
                //elimina el evento
            })
    
        } catch (error) {
            console.log(error);
            res.status(500).json({
                ok:false,
                msg:"hable con el administrador"
            })
            
        }
        
    
    }
    
    


module.exports= 
{
    getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento
}
