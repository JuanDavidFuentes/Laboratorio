// API SEGUIMIENTO: debe permitir: 
import Seguimiento from "../models/seguimientos.js"

// GET listar seguimiento por nombre o cc de usuario
const SeguimientosGetNombreoCC=async(req,res)=>{
    const {valorBuscar}=req.query
    const usuario= await Seguimiento.find({Datos_del_cliente:valorBuscar})
    res.json({
        usuario
    })
}
//"listo"
// GET Listar todos los seguimientos
const SeguimientosGet= async(req,res)=>{
    const seguimiento=await Seguimiento.find()
    res.json({
        seguimiento
    })
}

// GET Buscar seguimiento por #N resultado
const SeguimientoGetN= async(req,res)=>{
    const seguimiento= await Seguimiento.find()
    .populate("Codigo","informe_No")
    .populate("Seguimiento",["Solicitud","Porcentaje_de_Aceptacion","Registro_de_Aceptacion","Motivo_de_Rechazo"])
    .populate("Usuario")
    .populate("Cotizacion")

    res.json({
        seguimiento
    })
}

Putdatos=async(req,res)=>{ 
    const {id}=req.params
    const {Codigo,Datos_del_cliente,Datos_del_contacto,Solicitud,Medio_de_solicitud,Recibido_por,Porcentaje_de_Aceptacion,Registro_de_Aceptacion,Motivo_de_Rechazo,Seguimiento_de_Cotizaciones}=req.body
    const SeguimientoEditarDatos=await Seguimiento.findByIdAndUpdate(id,{Codigo,Datos_del_cliente,Datos_del_contacto,Solicitud,Medio_de_solicitud,Recibido_por,Porcentaje_de_Aceptacion,Registro_de_Aceptacion,Motivo_de_Rechazo,Seguimiento_de_Cotizaciones})
    res.json({
        "msg":'Actualizacion realizada con exito'
    })
}

// POST Insertar seguimiento 
const SeguimientoPost=async(req,res)=>{
    const {Codigo,Datos_del_cliente,Datos_del_contacto,Solicitud,Medio_de_solicitud,Recibido_por,Porcentaje_de_Aceptacion,Registro_de_Aceptacion,Motivo_de_Rechazo,Seguimiento_de_Cotizaciones}=req.body
    const seguimiento = new Seguimiento ({Codigo,Datos_del_cliente,Datos_del_contacto,Solicitud,Medio_de_solicitud,Recibido_por,Porcentaje_de_Aceptacion,Registro_de_Aceptacion,Motivo_de_Rechazo,Seguimiento_de_Cotizaciones})
    await seguimiento.save()

    res.json({
        msg:"Registro Exitoso"
    })
}

export {SeguimientosGet,SeguimientosGetNombreoCC,SeguimientoPost,SeguimientoPutdatos,SeguimientoGetN}