import Orden_del_servicio from "../models/orden_del_servicio.js"

//POST insertar orden de servicio

 const insertarordendeservicioPost=async(req,res)=>{
     const {idMuestra,ensayo,realizado,supervisado,observaciones,estadocreatedAD}=req.body
     const usuario = new Orden_del_servicio({idMuestra,ensayo,realizado,supervisado,observaciones,estadocreatedAD})
     await usuario.save()
     res.json({
        msg:"Se ha insertado una orden de servicio correctamente"
     })
    }

//GET listar todas las ordenes del servicio

const listartodaslasordenesGet=async(req, res)=>{
    const ordenservi=await Orden_del_servicio.find()
    res.json({ordenservi})
}                        

//GET listar orden de servicio por idMuestra 

const listaridMuestraGet=async(req, res)=>{
    const listaridMuestraGet=await Orden_del_servicio.find()
    res.json({listaridMuestraGet})
}

//GET buscar orden por codigo
//   const listarOrdenxIdGet=async(req, res)=>{
//     const {codigo_de_la_orden}=req.query;
//     const muestrass=await Orden_del_servicio.find({codigo_de_la_orden})
//     res.json({muestrass}) 
// }

//PUT Modificar datos de la orden

const modificarordenPut=async(req,res)=>{
    const {id}=req.params
    const {idMuestra,ensayo,realizado,supervisado,observaciones,estadocreatedAD}=req.body
    
    const Modificardatosdeorden=await Orden_del_servicio.findByIdAndUpdate(id,{idMuestra,ensayo,realizado,supervisado,observaciones,estadocreatedAD})
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

//GET realisada por 

const Getrealizadopor=async(req, res)=>{
    const {id}=req.params
    const Getrealizadopor=await Orden_del_servicio.findByIdAndUpdate(id,{realizado})
    res.json({Getrealizadopor})
}

//GET supervisado-por

const supervisadoGet=async(req, res)=>{
    const {id}=req.params
    const supervisadoGet=await Orden_del_servicio.findByIdAndUpdate(id,{supervisado})
    res.json({supervisadoGet})
}

//GET observaciones
const sepervisadoGet=async(req, res)=>{
    const {id}=req.params
    const observacionGet=await orden_del_servicio.findByIdAndUpdate(id,{observaciones})
    res.json({observacionGet})
}

//GET mostrar fecha de creacion 

const fechacreacionGet=async(req,res)=>{
    const {id}=req.params
    const fechacreacion=await Orden_del_servicio.findByIdAndUpdate(id,{createdAt})
    res.json({fechacreacion})
}


export{insertarordendeservicioPost,
    listartodaslasordenesGet,
    listaridMuestraGet,
    modificarordenPut,
    activarordenPUT,
    Getrealizadopor,
    supervisadoGet,
    fechacreacionGet
    }