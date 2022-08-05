import mongoose from "mongoose";
const DatosMuestraSchema= new mongoose.Schema({
    id_cotizacion:{type:mongoose.Schema.ObjectId,ref:"Cotizacion",required:true},
    codigo_muestra:{type:String,maxlength:15,required:true},
    municipio_recoleccion:{type:String,required:true},
    direccion_toma:{type:String,required:true},
    recoletada_por:{type:String,required:true,maxlength:30},
    procedimiento:{type:String,required:true},
    tipo_muestra:{type:String,maxlength:15,required:true},
    matriz_muestra:{type:String,maxlength:20,required:true},
    fecha_recoleccion:{type:Date,required:true},
    observaciones:{type:String,required:true},
    entregada_por:{type:mongoose.Schema.ObjectId,ref:"Usuario",required:true},
    cedula:{type:mongoose.Schema.ObjectId,ref:"Usuario",required:true},
    estado:{type:Number,default:1},
    // firma:{type:mongoose.Schema.ObjectId,ref:"Usuario",required:true},
    fecha_recepcion_muestra:{type:Date,required:true},
    recibida_por:{type:mongoose.Schema.ObjectId,ref:"Usuario",required:true},
    foto:{type:mongoose.Schema.ObjectId,ref:"Usuario",required:true},

    createdAt:{type:Date,default:Date.now()}
})

export default mongoose.model("datos-muestra",DatosMuestraSchema)