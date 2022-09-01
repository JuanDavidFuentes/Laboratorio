import Orden_del_servicio from "../models/orden_del_servicio.js"
import log from "../models/log.js";

//POST insertar orden de servicio

 const insertarordendeservicioPost=async(req,res)=>{
     const {idMuestra,ensayo,realizado,supervisado,observaciones}=req.body
     const usuario = new Orden_del_servicio({idMuestra,ensayo,realizado,supervisado,observaciones})
     await usuario.save()
     const idUsuario=req.usuario._id
     const idPost=usuario._id
     const navegador=req.headers['user-agent']
     const ip=req.socket.remoteAddress
     const log=new Log({idUsuario,idPost,navegador,ip})
     await log.save()
     res.json({
        "msg":"Se ha insertado una orden de servicio correctamente"
     })
    }

//GET listar todas las ordenes del servicio

const listartodaslasordenesGet=async(req, res)=>{
    const ordenservi=await Orden_del_servicio.find()
    res.json({ordenservi})
}                        

//GET listar orden de servicio por idMuestra 

const listaridGet=async(req, res)=>{
    const {id}=req.params;
    const listaridGet=await Orden_del_servicio.findById(id)
    res.json({listaridGet})
}

//GET supervisado-por
const supervisadoGet=async(req, res)=>{
    const {id}=req.params
    const sup=await Orden_del_servicio.find({supervisado:id})
    res.json({sup})
}

//GET realisada por
const Getrealizadopor=async(req, res)=>{
    const {id}=req.params
    const realizadopor=await Orden_del_servicio.find({realizado:id})
    res.json({realizadopor})
}

//PUT Modificar datos de la orden

const modificarordenPut=async(req,res)=>{
    const {id}=req.params
    const {idMuestra,ensayo,realizado,supervisado,observaciones}=req.body
    const Modificardatosdeorden=await Orden_del_servicio.findByIdAndUpdate(id,{idMuestra,ensayo,realizado,supervisado,observaciones})
    const idUsuario=req.usuario._id
    const idPost=id
    const navegador=req.headers['user-agent']
    const ip=req.socket.remoteAddress
    const log=new Log({idUsuario,idPut,navegador,ip})
    await log.save
    res.json({
        "msg":'Modificacion realizada con exito'
    })
}

//PUT Activar orden
const OrdenactivarPUt=async(req,res)=>{
    const {id}=req.params
    const activar =await Orden_del_servicio.findByIdAndUpdate(id,{estado:1})
    
    res.json({
        "msg":"Usuario activado con exito"
    })
}
//PUT Desactivar orden
const OrdenDesactivarPUt=async(req,res)=>{
    const {id}=req.params
    const activar =await Orden_del_servicio.findByIdAndUpdate(id,{estado:0})
    const idUsuario=req.usuario._id
    const idPut= id
    const navegador=req.headers['user-agent']
    const ip=req.socket.remoteAddress
    const log=new Log({idUsuario,idPut,navegador,ip})
    res.json({
        "msg":"Usuario activado con exito"
    })
}

// //GET observaciones
// const observacionesGet=async(req, res)=>{
//     const {id}=req.params
//     const observacionGet=await Orden_del_servicio.findByIdAndUpdate(id,{observaciones})
//     res.json({observacionGet})
// }
// //GET mostrar fecha de creacion 

// const fechacreacionGet=async(req,res)=>{
//     const {id}=req.params
//     const fechacreacion=await Orden_del_servicio.findByIdAndUpdate(id,{createdAt})
//     res.json({fechacreacion})
// }


export{insertarordendeservicioPost,
    listartodaslasordenesGet,
    listaridGet,
    modificarordenPut,
    OrdenactivarPUt,
    OrdenDesactivarPUt,
    Getrealizadopor,
    supervisadoGet
    }