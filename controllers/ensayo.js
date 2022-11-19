 import Ensayo from "../models/ensayo.js";
 import Log from "../models/log.js";
 import Consecutivo from "../models/consecutivo.js";


//  if (consecutivo) {
//     const codMuestra = numeros(consecutivo.codMuestra)
//     const { solicitante, munRecoleccion, direccionTomaMuestra, lugarTomaMuestra, muestraRecolectadaPor, procedimientoMuestreo, tipoMuestra, matrizMuestra, fechaRecoleccion, cotizacion, item, estado } = req.body
//     const coti = new DatosMuestra({ solicitante, codMuestra, munRecoleccion, direccionTomaMuestra, lugarTomaMuestra, muestraRecolectadaPor, procedimientoMuestreo, tipoMuestra, matrizMuestra, fechaRecoleccion, cotizacion, item, estado })
//     await coti.save()
//     const nuevo = consecutivo.codMuestra + 1
//     await Consecutivo.findByIdAndUpdate(consecutivo._id, { codMuestra: nuevo })
//     const idUsuario = req.usuario._id
//     const idPost = coti._id
//     const texto=`El usuario: ${req.usuario.nombre} ha creado una muestra`
//     const ip = req.socket.remoteAddress
//     const log = new Log({ idUsuario, idPost ,texto, ip })
//     await log.save()
//  }


const ensayoPost=async(req,res)=>{
    const consecutivo = await Consecutivo.findOne()
    if(consecutivo){
        const numero=consecutivo.informe_No
        const {metodo,tecnica,valorMinimo,valorMaximo,unidades,costo,descripcion,limiteCuantificacion,responsables}=req.body
        const ensayoPostt = new Ensayo ({numero,metodo,tecnica,valorMinimo,valorMaximo,unidades,costo,descripcion,limiteCuantificacion,responsables})
        await ensayoPostt.save()
        const nuevo =consecutivo.informe_No + 1
        await Consecutivo.findByIdAndUpdate(consecutivo._id, { informe_No: nuevo })
        const idUsuario=req.usuario._id
        const idPost=ensayoPostt._id
        const texto=`El usuario: ${req.usuario.nombre} ha creado un ensayo`
        const ip=req.socket.remoteAddress
        const log=new Log({idUsuario,idPost,texto,ip})
        await log.save()
        res.json({
            ensayoPostt
        })
    }
}

const ensayoPut = async (req,res)=>{
    const {id}=req.params
    const {ensayo,metodo,tecnica,valorMinimo,valorMaximo,unidades,costo,estado,descripcion,limiteCuantificacion,responsables}=req.body
    const ensayoput =await Ensayo.findByIdAndUpdate(id,{ensayo,metodo,tecnica,valorMinimo,valorMaximo,unidades,costo,estado,descripcion,limiteCuantificacion,responsables})

    const idUsuario=req.usuario._id
    const idPut= id
    const texto=`El usuario: ${req.usuario.nombre} ha editado un ensayo`
    const ip=req.socket.remoteAddress
    const log=new Log({idUsuario,idPut,texto,ip})
    await log.save()

    res.json({
        "msg":"Actualizacion Exitosa!"
    })
}
const ensayoPutActivar=async(req,res)=>{
    const {id}=req.params
    const activar =await Ensayo.findByIdAndUpdate(id,{estado:1})
    const idUsuario=req.usuario._id
    const idPut= id
    const texto=`El usuario: ${req.usuario.nombre} ha activado un ensayo`
    const ip=req.socket.remoteAddress
    const log=new Log({idUsuario,idPut,texto,ip})
    await log.save()
    res.json({
        "msg":"Ensayo activado con exito"
    })
}

const ensayoPutDesactivar=async(req,res)=>{
    const {id}=req.params
    const desactivar =await Ensayo.findByIdAndUpdate(id,{estado:0})
    const idUsuario=req.usuario._id
    const idPut= id
    const texto=`El usuario: ${req.usuario.nombre} ha desactivado un ensayo`
    const ip=req.socket.remoteAddress
    const log=new Log({idUsuario,idPut,texto,ip})
    await log.save()
    res.json({
        "msg":"Ensayo desactivado con exito"
    })
}

const ensayoGetTodos=async(req,res)=>{
    const ensayo= await Ensayo.find()
    .populate({
        path:"responsables.titular",
        populate:{
            path:"ciudad"    
        }
    })
    .populate({        
        path:"responsables.suplente",
        populate:{
            path:"ciudad"
        }
    })
    res.json({
        ensayo
    }) 
}

const ensatoGetbyId=async(req,res)=>{
    const {id}=req.params
    const ensayo =await Ensayo.findOne({id})
    res.json({
        ensayo
    })
}

export {ensayoPost,ensayoPut,ensayoGetTodos,ensatoGetbyId,ensayoPutDesactivar,ensayoPutActivar}
