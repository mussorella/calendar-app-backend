const { Router } = require('express')
const {validarJWT}=require('../middlewares/validar-jwt')
const {actualizarEvento, eliminarEvento, crearEvento, getEventos}=require('../controllers/events')
const {validarCampos}= require('../middlewares/validar-campos')
const { check } = require('express-validator')
const { isDate } = require('../helpers/isDate')
const router = Router()

//todas tienen que estar validadas
router.use(validarJWT)
/*
    Events Routes
    /api/events
*/


//obtener eventos
router.get('/', 
    
    getEventos);

//Crear un nuevo evento
router.post('/', [
    check('title', 'El titulo es obligatorio').not().isEmpty(),
    check('start', 'Fecha de inicio es obligatoria').custom(isDate),//la funcion custom lo q hace es que cuando no tenemos un check predeterminado, nos abre paso a que creemos unopa  mano(que ahora esta en los helpers), para usarlo.
    check('end', 'Fecha de finalizacion es obligatoria').custom(isDate),
    validarCampos
], 
    
crearEvento);


//Actualizar evento
router.put('/:id',  actualizarEvento);

//Eliminar evento
router.delete('/:id',  eliminarEvento);


module.exports=router;