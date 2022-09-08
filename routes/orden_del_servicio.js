import {Router} from "express"
import {insertarordendeservicioPost,getInformeResultados,listartodaslasordenesGet,listaridGet,modificarordenPut,Getrealizadopor,supervisadoGet,OrdenactivarPUt,OrdenDesactivarPUt} from "../controllers/orden_del_servicio.js";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar_campos.js";
import { validarJWT } from "../middlewares/validar_jwt.js";
import HerlpersDatosMuestra from "../helpers/datos-muestra.js";
import HerlpersEnsayo from "../helpers/ensayo.js";
import HerlpersUsuario from "../helpers/usuarios.js";
import HerlpersOdenServicio from "../helpers/oden_del_servicio.js";
 
 
const router=Router()

router.get('/InformeResultados/:id',getInformeResultados)
router.post("/insertar_orden",[
    validarJWT,
    check('idMuestra').isMongoId(),
    check('idMuestra').custom(HerlpersDatosMuestra.existeDatosMuestraById),
    check('ensayo').isMongoId(),
    check('ensayo').custom(HerlpersEnsayo.existeEnsayoById),
    check('realizado').isMongoId(),
    check('realizado').custom(HerlpersUsuario.existeUsuarioById),
    check('supervisado').isMongoId(),
    check('supervisado').custom(HerlpersUsuario.existeUsuarioById),
    // check('tecnica','se debe agregar una tecnica').not().isEmpty(),
    // check('tecnica',"La tecnica debe tener menos de 25 caracteres").isLength({max:25}),
    // check('metodo','se debe agregar un metodo').not().isEmpty(),
    // check('metodo',"El el metodo debe de tener menos de 50 caracteres ").isLength({max:50}),
    // check('estado_de_muestra','se debe agregar un estado_de_muestra').not().isEmpty(),
    // check('realizado_por',"el usuario debe tener menos de 30  caracteres").isLength({max:30}),
    // check('supervisado_por',"el usuario debe tener menos de 30 caracteres").isLength({max:25}),
    // check('estado','se dede agregrar un estado').not().isEmpty(),
    validarCampos    
],insertarordendeservicioPost);
 //listar todo
router.get("/listartodo",listartodaslasordenesGet);

//supervisado por 
router.get("/supervisado/:id",[
    validarJWT,
    check('id').isMongoId(),
    check('id').custom(HerlpersUsuario.existeUsuarioById),
    validarCampos
],supervisadoGet)

//listar por id
router.get("/listar/:id",[
    validarJWT,
    check('id').isMongoId(),
    check('id').custom(HerlpersOdenServicio.existeOrdenById),
    validarCampos
],listaridGet);

// realizado por
router.get("/realizado/:id",[
    validarJWT,
    check('id').isMongoId(),
    check('id').custom(HerlpersUsuario.existeUsuarioById),
    validarCampos
],Getrealizadopor)
//supervisado por 
router.get("/supervisado/:id",[
    validarJWT,
    check('id').isMongoId(),
    check('id').custom(HerlpersUsuario.existeUsuarioById),
    validarCampos
],supervisadoGet)

// Modificar datos de la orden 
router.put("/editar_orden/:id",[
    validarJWT,
    // check('id').isMongoId(),
    // check('id').custom(HerlpersOdenServicio.existeOrdenById),
    check('ensayo.realzado').isMongoId(),
    check('ensayo').custom(HerlpersEnsayo.existeEnsayoById),
    check('supervisado').isMongoId(),
    check('supervisado').custom(HerlpersUsuario.existeUsuarioById),
    validarCampos    
],modificarordenPut);

//Activar orden
router.put("/activar/:id",[
    validarJWT,
    check('id').isMongoId(),
    check('id').custom(HerlpersOdenServicio.existeOrdenById),
    validarCampos
],OrdenactivarPUt)
//desactivar orden
router.put("/desactivar/:id",[
    validarJWT,
    check('id').isMongoId(),
    check('id').custom(HerlpersOdenServicio.existeOrdenById),
    validarCampos    
],OrdenDesactivarPUt)

// Modificar datos de la orden 
router.put("/editar_orden/:id",[
    validarJWT,
    check('id').isMongoId(),
    check('id').custom(HerlpersOdenServicio.existeOrdenById),
    check('idMuestra').isMongoId(),
    check('idMuestra').custom(HerlpersDatosMuestra.existeDatosMuestraById),
    // check('ensayo').isMongoId(),
    // check('ensayo').custom(HerlpersEnsayo.existeEnsayoById),
    check('realizado').isMongoId(),
    check('realizado').custom(HerlpersUsuario.existeUsuarioById),
    check('supervisado').isMongoId(),
    check('supervisado').custom(HerlpersUsuario.existeUsuarioById),
    validarCampos    
],modificarordenPut);

export default router;