import {Router} from "express"
import {usuarioPost,usuarioPutdatos,usuarioPutActivar,cargarArchivoCloudPut,mostrarImagenCloud,usuarioPutDesactivar,usuarioLogin,usuarioGetListarTodos,usuarioGetListarid,usuarioGetListarNombre} from "../controllers/usuarios.js"
import { check } from "express-validator";
import HerlpersUsuario from "../helpers/usuarios.js";
import { validarCampos } from "../middlewares/validar_campos.js";
import { validarJWT } from "../middlewares/validar_jwt.js";
import validarExistaArchivo from "../middlewares/validar_file.js";

const router=Router()

router.post("/",[
    check('nombre',"El nombre es obligatoro").not().isEmpty(),
    check('nombre',"Debe tener menos de 50 caracteres").isLength({max:50}),
    check('apellidos',"El apellidos es obligatoro").not().isEmpty(),
    check('apellidos',"Debe tener menos de 50 caracteres").isLength({max:50}),
    check('direccion',"El direccion es obligatoro").not().isEmpty(),
    check('direccion',"Debe tener menos de 50 caracteres").isLength({max:50}),
    check('email',"Es Obligatorio").not().isEmpty(),
    check('email',"No es un email valido").isEmail(),
    check('password',"Es Obligatorio").not().isEmpty(),
    check('password',"Debe tener mas de 8 caracteres").isLength({min:6}),
    check('telefono',"El telefono es obligatoro").not().isEmpty(),
    check('telefono',"Debe tener menos de 50 caracteres").isLength({max:50}),
    check('cedula',"La cedula es obligatoro").not().isEmpty(),
    check('cedula',"Debe tener menos de 50 caracteres").isLength({max:50}),
    check('departamento',"El departamento es obligatoro").not().isEmpty(),
    check('departamento',"Debe tener menos de 50 caracteres").isLength({max:50}),
    check('municipio',"El municipio es obligatoro").not().isEmpty(),
    check('municipio',"Debe tener menos de 50 caracteres").isLength({max:50}),
    check('rol',"El rol es obligatoro").not().isEmpty(),
    check('rol',"Debe tener menos de 50 caracteres").isLength({max:50}),
    check('cargo',"El rol es obligatoro").not().isEmpty(),
    check('cargo',"Debe tener menos de 50 caracteres").isLength({max:50}),
    check('foto',"El rol es obligatoro").not().isEmpty(),
    check('foto',"Debe tener menos de 50 caracteres").isLength({max:50}),
    check('empresa',"El rol es obligatoro").not().isEmpty(),
    check('empresa',"Debe tener menos de 50 caracteres").isLength({max:50}),
    check('email').custom(HerlpersUsuario.existeEmail),
    check('contacto').custom(HerlpersUsuario.contacto),
    validarCampos,
],usuarioPost);

router.post("/login",[
    check('email').custom(HerlpersUsuario.noexisteEmail),
    check('email',"No es un email valido").isEmail(),
    validarCampos
],usuarioLogin)

router.get("/",[
    validarJWT,
],usuarioGetListarTodos)

router.get("/listar/:id",[
    validarJWT,
    check('id').isMongoId(),
    check('id').custom(HerlpersUsuario.existeUsuarioById),
    validarCampos
],usuarioGetListarid)

router.get("/nombre",[
    check('nombre',"El nombre es obligatorio").not().isEmpty(),
    check('nombre').custom(HerlpersUsuario.existeUsuarioNombre),
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

router.put("/datos/:id",[
    validarJWT,
    check('nombre',"El nombre es obligatoro").not().isEmpty(),
    check('nombre',"Debe tener menos de 50 caracteres").isLength({max:50}),
    check('apellidos',"El apellidos es obligatoro").not().isEmpty(),
    check('apellidos',"Debe tener menos de 50 caracteres").isLength({max:50}),
    check('direccion',"El direccion es obligatoro").not().isEmpty(),
    check('direccion',"Debe tener menos de 50 caracteres").isLength({max:50}),
    check('email',"Es Obligatorio").not().isEmpty(),
    check('email',"No es un email valido").isEmail(),
    check('password',"Es Obligatorio").not().isEmpty(),
    check('password',"Debe tener mas de 8 caracteres").isLength({min:6}),
    check('telefono',"El telefono es obligatoro").not().isEmpty(),
    check('telefono',"Debe tener menos de 50 caracteres").isLength({max:50}),
    check('cedula',"El cedula es obligatoro").not().isEmpty(),
    check('cedula',"Debe tener menos de 50 caracteres").isLength({max:50}),
    check('departamento',"El departamento es obligatoro").not().isEmpty(),
    check('departamento',"Debe tener menos de 50 caracteres").isLength({max:50}),
    check('municipio',"El municipio es obligatoro").not().isEmpty(),
    check('municipio',"Debe tener menos de 50 caracteres").isLength({max:50}),
    check('rol',"El rol es obligatoro").not().isEmpty(),
    check('rol',"Debe tener menos de 50 caracteres").isLength({max:50}),
    check('cargo',"El rol es obligatoro").not().isEmpty(),
    check('cargo',"Debe tener menos de 50 caracteres").isLength({max:50}),
    check('foto',"El rol es obligatoro").not().isEmpty(),
    check('foto',"Debe tener menos de 50 caracteres").isLength({max:50}),
    check('empresa',"El rol es obligatoro").not().isEmpty(),
    check('empresa',"Debe tener menos de 50 caracteres").isLength({max:50}),
    check('email').custom(HerlpersUsuario.existeEmail),
    check('contacto').custom(HerlpersUsuario.contacto),
    validarCampos,
],usuarioPutdatos)

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
