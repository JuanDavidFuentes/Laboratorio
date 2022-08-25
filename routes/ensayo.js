import {ensayoPost,ensayoPut,ensayoGetTodos,ensatoGetbyId,ensayoPutDesactivar,ensayoPutActivar} from "../controllers/ensayo.js";
import { Router } from "express";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar_campos.js";
import { validarJWT } from "../middlewares/validar_jwt.js";
import HelpersEnsayo from "../helpers/ensayo.js"

const router =Router ()

router.post("/",[
    validarJWT,
    check('ensayo',"el aaaa es requerido").not().isEmpty(),
    check('metodo',"el metodo es requerido","el aaaa es requerido").not().isEmpty(),
    check('tecnica',"la tecnica es requerido").not().isEmpty(),
    check('valorMinimo',"el valorMinimo es requerido").not().isEmpty(),
    check('valorMaximo',"el valorMaximo es requerido").not().isEmpty().not().isEmpty(),
    check('unidades',"las unidades es requerido").not().isEmpty(),
    check('costo',"el costo es requerido").not().isEmpty(),
    check('costo',"el costo es numerico").isNumeric(),
    check('descripcion',"la descripcion es requerido").not().isEmpty(),
    validarCampos
],ensayoPost)

router.put("/:id",[
    validarJWT,
    check('id').isMongoId(),
    check('id').custom(HelpersEnsayo.existeEnsayoById),
    check('ensayo',"el ensayo es requerido").not().isEmpty(),
    check('metodo',"el metodo es requerido","el aaaa es requerido").not().isEmpty(),
    check('tecnica',"la tecnica es requerido").not().isEmpty(),
    check('valorMinimo',"el valorMinimo es requerido").not().isEmpty(),
    check('valorMaximo',"el valorMaximo es requerido").not().isEmpty().not().isEmpty(),
    check('unidades',"las unidades es requerido").not().isEmpty(),
    check('costo',"el costo es requerido").not().isEmpty(),
    check('costo',"el costo es numerico").isNumeric(),
    check('descripcion',"la descripcion es requerido").not().isEmpty(),
    validarCampos
],ensayoPut)

router.put("/activar/:id",[
    validarJWT,
    check('id').isMongoId(),
    check('id').custom(HelpersEnsayo.existeEnsayoById),
    validarCampos
],ensayoPutActivar)

router.put("/desactivar/:id",[
    validarJWT,
    check('id').isMongoId(),
    check('id').custom(HelpersEnsayo.existeEnsayoById),
    validarCampos
],ensayoPutDesactivar)

router.get("/",ensayoGetTodos)

router.get("/listar/:id",[
    validarJWT,
    check('id').isMongoId(),
    check('id').custom(HelpersEnsayo.existeEnsayoById),
    validarCampos
],ensatoGetbyId)



export default router