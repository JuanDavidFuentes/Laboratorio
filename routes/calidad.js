import {Router} from "express"
import {listarGet,listadoPut,listadoPost} from "../controllers/calidad.js"
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar_campos.js";
import { validarJWT } from "../middlewares/validar_jwt.js";

const router=Router() 

router.post("/",listadoPost)    
      
router.put("/calidadPut/id:",[
    check('id').isMongoId(),
    validarCampos
],listadoPut)

router.get("/listar",listarGet)
    
export default router