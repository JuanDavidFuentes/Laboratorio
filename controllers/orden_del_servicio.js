import Orden_del_servicio from "../models/orden_del_servicio.js"

//POST insertar orden de servicio

 const insertarordendeservicioPost=async(req,res)=>{
     const {codigo_de_la_orden,fecha_de_ingreso_muestra,codigo_de_muestra,parametro,tecnica,metodo,estado_de_muestra,realizado_por,supervisado_por,estado}=req.body
     const usuario = new Orden_del_servicio({codigo_de_la_orden,fecha_de_ingreso_muestra,codigo_de_muestra,parametro,tecnica,metodo,estado_de_muestra,realizado_por,supervisado_por,supervisado_por,estado})
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

//GET listar orden de servicio por codigo 

const listarordenporcodigoGet=async(req, res)=>{
    const listarordenporcodigo=await Orden_del_servicio.find()
    res.json({listarordenporcodigo})
}

//GET buscar orden por codigo
  const listarOrdenxIdGet=async(req, res)=>{
    const {codigo_de_la_orden}=req.query;
    const muestrass=await Orden_del_servicio.find({codigo_de_la_orden})
    res.json({muestrass}) 
}

//PUT Modificar datos de la orden

const modificardatosdeordenPut=async(req,res)=>{
    const {id}=req.params
    const {codigo_de_la_orden,fecha_de_ingreso_muestra,codigo_de_muestra,parametro,tecnica,metodo,estado_de_muestra,realizado_por,supervisado_por,estado}=req.body
    
    const Modificardatosdeorden=await Orden_del_servicio.findByIdAndUpdate(id,{codigo_de_la_orden,fecha_de_ingreso_muestra,codigo_de_muestra,parametro,tecnica,metodo,estado_de_muestra,realizado_por,supervisado_por,estado})
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
// desactivar orden
const OrdendesactivarPut=async(req,res)=>{
    const {id}=req.params
    const desactivar =await Orden_del_servicio.findByIdAndUpdate(id,{estado:0})
    res.json({
        "msg":"Usuario desactivado con exito"
    })
}


export{insertarordendeservicioPost,
    listartodaslasordenesGet,
    listarordenporcodigoGet,modificardatosdeordenPut,
    activarordenPUT,
    listarOrdenxIdGet

}