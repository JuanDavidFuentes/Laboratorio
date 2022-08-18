import {Router} from "express"
import {insertarordendeservicioPost,listartodaslasordenesGet,listarordenporcodigoGet,modificardatosdeordenPut} from "../controllers/orden_del_servicio.js";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar_campos.js";
import { validarJWT } from "../middlewares/validar_jwt.js";
import HerlpersDatosMuestra from "../helpers/datos-muestra.js";
import HerlpersEnsayo from "../helpers/ensayo.js";
import HerlpersUsuario from "../helpers/usuarios.js";
 
 
const router=Router()
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
router.get("/listartodo",[
    validarJWT,
    check('idMuestra').custom(HerlpersDatosMuestra.existeDatosMuestraById),
    check('ensayo').custom(HerlpersEnsayo.existeEnsayoById),
    check('realizado').custom(HerlpersUsuario.existeUsuarioById),
    check('supervisado').custom(HerlpersUsuario.existeUsuarioById),
],listartodaslasordenesGet);
//listar por id
router.get("/listar/:id",[
    validarJWT,
    check('idMuestra',"el Id de la muestra es obligatorio").not().isEmpty(),
    check('idMuestra').custom(HerlpersDatosMuestra.existeDatosMuestraById),
    //AA
    validarCampos
],listarordenporcodigoGet);
//buscar orden por codigo
//FALTA

router.modificardatosdeordenPut("/editar_orden",[
    validarJWT,
    check('codigo_de_la_orden',"el codigo de la orden es requerido ").not().isEmpty(),
    check('codigo_de_la_orden',"El codigo de la orden debe de tener menos de 25 caracteres ").isLength({max:25}),
    check('codigo_de_muestra','El codigo de la muestra es requerido').custom(),
    check('parametro','se debe agregar un parametro ').not().isEmpty(),
    check('parametro',"El parametro debe tener menos de 15 caracteres ").isLength({max:25}),
    check('tecnica','se debe agregar una tecnica').not().isEmpty(),
    check('tecnica',"La tecnica debe tener menos de 25 caracteres").isLength({max:25}),
    check('metodo','se debe agregar un metodo').not().isEmpty(),
    check('metodo',"El el metodo debe de tener menos de 50 caracteres ").isLength({max:50}),
    check('estado_de_muestra','se debe agregar un estado_de_muestra').not().isEmpty(),
    check('realizado_por',"el usuario debe tener menos de 30  caracteres").isLength({max:30}),
    check('supervisado_por',"el usuario debe tener menos de 30 caracteres").isLength({max:25}),
    check('estado','se dede agregrar un estado').not().isEmpty(),
    validarCampos    
],modificardatosdeordenPut);

router.put("/activar/:id",[
    validarJWT,
    check('id').isMongoId(),
    check('id').custom(HerlpersUsuario.existeUsuarioById),
    validarCampos
],usuarioPutActivar)

router.put("/desactivar/:id",[
    validarJWT,
    check('id').isMongoId(),
    check('id').custom(HerlpersUsuario.existeUsuarioById),
    validarCampos
],usuarioPutDesactivar)


export default router;