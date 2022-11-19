import {ensayoPost,ensayoPut,ensayoGetTodos,ensatoGetbyId,ensayoPutDesactivar,ensayoPutActivar} from "../controllers/ensayo.js";
import { Router } from "express";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar_campos.js";
import { validarJWT } from "../middlewares/validar_jwt.js";
import HelpersEnsayo from "../helpers/ensayo.js"

const router =Router ()

router.post("/",[
    validarJWT,
    check('metodo',"El metodo es requerido").not().isEmpty(),
    check('tecnica',"La tecnica es requerida").not().isEmpty(),
    check('valorMinimo',"El valor minimo es requerido").not().isEmpty(),
    check('valorMaximo',"El valor maximo es requerido").not().isEmpty(),
    check('unidades',"Las unidades son requeridas").not().isEmpty(),
    check('costo',"El costo es requerido").not().isEmpty(),
    check('costo',"El costo es numerico").isNumeric(),
    check('limiteCuantificacion',"El limite de cuantificacion es requerido").not().isEmpty(),
    check('limiteCuantificacion',"El limite de cuantificacion debe de ser numero").isNumeric(),
    check('responsables').custom(HelpersEnsayo.responsabless),
    validarCampos
],ensayoPost)

router.put("/:id",[
    validarJWT,
    check('id').isMongoId(),
    check('id').custom(HelpersEnsayo.existeEnsayoById),
    // check('ensayo').custom(HelpersEnsayo.existeEnsayo),
    check('metodo',"El metodo es requerido").not().isEmpty(),
    check('tecnica',"La tecnica es requerido").not().isEmpty(),
    check('valorMinimo',"El valor minimo es requerido").not().isEmpty(),
    check('valorMaximo',"El valor maximo es requerido").not().isEmpty(),
    check('unidades',"Las unidades es requerido").not().isEmpty(),
    check('costo',"El costo es requerido").not().isEmpty(),
    check('costo',"El costo es numerico").isNumeric(),
    check('limiteCuantificacion',"El limite de cuantificacion es requerido").not().isEmpty(),
    check('limiteCuantificacion',"El limite de cuantificacion debe de ser numerico").isNumeric(),
    check('responsables').custom(HelpersEnsayo.responsabless),
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