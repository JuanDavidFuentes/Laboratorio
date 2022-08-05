import mongoose from "mongoose";

const Orden_del_servicio= new mongoose.Schema({
    codigo_de_la_orden:{type:String,maxlength:25,required:true},
    fecha_de_ingreso_muestra:{type:Date,default:Date.now()},
    codigo_de_muestra:{type:mongoose.Schema.ObjectId,ref:"datos-muestra",requiered:true},
    parametro:{type:String,maxlength:15,requiered:true},
    tecnica:{type:String,maxlength:25,required:true},
    metodo:{type:String,maxlength:50,required:true},
    estado_de_muestra:{type:String,requiered:true},
    realizado_por:{type:String,maxlength:30,ref:"usuario",requiered:true},
    supervisado_por:{type:String,maxlength:30,ref:"usuario",requiered:true},
    estado:{type:Number,default:1},
    createdAt:{type:Date,default:Date.now()}
})

export default mongoose.model("Orden_del_servicio",Orden_del_servicio)