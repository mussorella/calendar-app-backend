const {Schema, model} = require ('mongoose')


const EventoSchema= Schema({
   
    title: {
        type: String,
        required: true,

    },
    notes:{
        type:String,
    },
    start:{
        type:Date,
        required:true
    },
    end:{
        type:Date,
        required:true
    },
    user:{
        type: Schema.Types.ObjectId,
        ref:'Usuario',
        required: true
    }
});


//esto ultimo es para que aparezca en postman bien el id y eso
    EventoSchema.method('toJSON', function(){
        const{ __v, _id, ...object } = this.toObject();
        
        object.id=_id

        return object;
    
    
    })

module.exports= model('Evento', EventoSchema)