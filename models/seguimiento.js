import mongoose from "mongoose";

const SeguimientoSchema= new mongoose.Schema({
    Codigo:{type:mongoose.Schema.ObjectId,ref:"InformeR",required:true},
    Datos_del_cliente:{type:mongoose.Schema.ObjectId,ref:"Usuario",required:true},
    Datos_del_contacto:{type:mongoose.Schema.ObjectId,ref:"Usuario",required:true}, 
    Solicitud:{type:String,required:true},
    Medio_de_solicitud:{type:mongoose.Schema.ObjectId,ref:"Cotizacion",required:true}, 
    Recibido_por:{type:mongoose.Schema.ObjectId,ref:"Usuario",required:true}, 
    Porcentaje_de_Aceptacion:{type:String,required:true},
    Registro_de_Aceptacion:{type:String,required:true},
    Motivo_de_Rechazo:{type:String,required:true},
    Seguimiento_de_Cotizaciones:{type:mongoose.Schema.ObjectId,ref:"Cotizacion",required:true},
    createdAt:{type:Date,default:Date.now()}
})

export default mongoose.model("Seguimiento",SeguimientoSchema)
 
