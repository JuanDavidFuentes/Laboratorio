import {Router} from "express"
import {usuarioGetListarTodosContactos,usuarioGetListarTodosClientes,usuarioPost,usuarioPutdatos,usuarioPutActivar,usuarioPutRol,cargarArchivoCloudPut,mostrarImagenCloud,usuarioPutDesactivar,usuarioLogin,usuarioGetListarTodos,usuarioGetListarid,usuarioGetListarNombre} from "../controllers/usuarios.js"
import { check } from "express-validator";
import HerlpersUsuario from "../helpers/usuarios.js";
import { validarCampos } from "../middlewares/validar_campos.js";
import { validarJWT } from "../middlewares/validar_jwt.js";
import validarExistaArchivo from "../middlewares/validar_file.js";
import HelpersCiudad from "../helpers/ciudad.js";
const router=Router()

router.post("/",[
    check('nombre',"El nombre es obligatorio").not().isEmpty(),
    check('nombre',"Debe tener menos de 50 caracteres").isLength({max:50}),
    check('apellidos',"El apellidos es obligatorio").not().isEmpty(),
    check('apellidos',"Debe tener menos de 50 caracteres").isLength({max:50}),
    check('documento',"El documento es obligatorio").not().isEmpty(),
    check('documento',"Debe tener menos de 13 caracteres").isLength({max:13}),
    check('documento').custom(HerlpersUsuario.existeDocumento),
    check('direccion',"El direccion es obligatorio").not().isEmpty(),
    check('direccion',"Debe tener menos de 50 caracteres").isLength({max:50}),
    check('ciudad',"La ciudad es obligatoria").not().isEmpty(),
    check('ciudad').custom(HelpersCiudad.existeciudadById),
    check('celular',"El celular es obligatoro").not().isEmpty(),
    check('celular',"Debe tener menos de 50 caracteres").isLength({max:50}),
    check('email',"Es Obligatorio").not().isEmpty(),
    check('email',"No es un email valido").isEmail(),
    check('email').custom(HerlpersUsuario.existeEmail),
    check('password',"Es Obligatorio").not().isEmpty(),
    check('password',"Debe tener mas de 8 caracteres").isLength({min:6}),
    validarCampos,
],usuarioPost);

router.put("/datos/:id",[
    validarJWT,
    check('nombre',"El nombre es obligatorio").not().isEmpty(),
    check('nombre',"Debe tener menos de 50 caracteres").isLength({max:50}),
    check('apellidos',"El apellidos es obligatorio").not().isEmpty(),
    check('apellidos',"Debe tener menos de 50 caracteres").isLength({max:50}),

    
    check('direccion',"El direccion es obligatorio").not().isEmpty(),
    check('direccion',"Debe tener menos de 50 caracteres").isLength({max:50}),
    check('ciudad',"La ciudad es obligatoria").not().isEmpty(),
    check('celular',"El celular es obligatoro").not().isEmpty(),
    check('celular',"Debe tener menos de 50 caracteres").isLength({max:50}),
    // check('email',"Es Obligatorio").not().isEmpty(),
    // check('email',"No es un email valido").isEmail(),
    check('password',"Es Obligatorio").not().isEmpty(),
    check('password',"Debe tener mas de 8 caracteres").isLength({min:6}),
    check('rol',"Debe tener menos de 50 caracteres").isLength({max:50}),
    validarCampos,
],usuarioPutdatos)

router.put("/rol/:id",[
    validarJWT,
    check('rol',"Debe tener menos de 50 caracteres").not().isEmpty(),
    validarCampos,
],usuarioPutRol)


router.post("/login",[
    check('email').custom(HerlpersUsuario.noexisteEmail),
    check('email',"No es un email valido").isEmail(),
    validarCampos
],usuarioLogin)

router.get("/",[
    validarJWT,
    validarCampos
],usuarioGetListarTodos)

router.get("/listarClientes",[//usuarioGetListarTodosContactos
    validarJWT,
    validarCampos
],usuarioGetListarTodosClientes)

router.get("/listarContactos",[
    validarJWT,
    validarCampos
],usuarioGetListarTodosContactos)


router.get("/listar/:id",[
    validarJWT,
    check('id').isMongoId(),
    check('id').custom(HerlpersUsuario.existeUsuarioById),
    validarCampos
],usuarioGetListarid)

router.get("/nombre",[
    check('nombre',"El nombre es obligatorio").not().isEmpty(),
    validarCampos
],usuarioGetListarNombre)

router.get("/Mostrarimagen/:id",[   
    check('id','No es un ID válido'),
    check('id').custom(HerlpersUsuario.existeUsuarioById),
    validarCampos
],mostrarImagenCloud)

router.put("/Subirimagen/:id",[
    validarJWT,
    check('id').not().isEmpty(),
    check('id').custom(HerlpersUsuario.existeUsuarioById),
    validarExistaArchivo,
    validarCampos
],cargarArchivoCloudPut) 

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

router.put("/rol/:id",[
    validarJWT,
    check('id').isMongoId(),
    check('id').custom(HerlpersUsuario.existeUsuarioById),
    check('rol').not().isEmpty(),
    validarCampos
],usuarioPutRol)

export default router;
