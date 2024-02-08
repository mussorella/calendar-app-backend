

/*
Rutas de Usuarios /Auth

host + /api/auth
*/ 



const { Router } = require('express')
const {check}=require('express-validator')

const {validarCampos}=require('../middlewares/validar-campos')
const {crearUsuario, loginUsuario, revalidarToken} = require ('../controllers/auth')
const {validarJWT}= require('../middlewares/validar-jwt')

const router = Router()


router.post(
    '/new', 
    [ // middlewares
        check('name', 'El nombre es obligatorio').not().isEmpty(),//primer argumento del check es el que voy a ver en el datop q me tira, el segundo es el aviso de error, el tercero que va con punto es el valor q tiene q tener, por ejemplo q sea email, o q no sea undefined
        check('email', 'El email es obligatorio').isEmail(),//es una regla de validacion, dice que el nombre tienq que estar y no ser undefined o string vacio
        check('password', 'El password debe de ser de 6 caracteres').isLength({ min: 6 }),
        validarCampos
    ],
    crearUsuario 
);

router.post(
    '/',
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe de ser de 6 caracteres').isLength({ min: 6 }),
        validarCampos
    ],
    loginUsuario 
);


router.get('/renew', validarJWT , revalidarToken);


module.exports= router
