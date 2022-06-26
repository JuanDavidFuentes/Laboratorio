import mongoose from "mongoose";

const ListadoMaestroMuestras = new mongoose.Schema({
  FechaDeIngresoMuestra: { type:mongoose.Schema.ObjectId,ref:"Muestra",required:true },
  fechaEmision:{type:mongoose.Schema.ObjectId,ref:"Muestra",required:true},
  CodigoMuestra: { type: String, maxLength: 15, required: true },
  DatosSolicitante: {type:mongoose.Schema.ObjectId,ref:"Cotizacion",required:true},
  DatosMuestras: {type:mongoose.Schema.ObjectId,ref:"Muestra",required:true},

  DatosInformeResultado: [
    {
      FechaRecepcionMuestra: { type:mongoose.Schema.ObjectId,ref:"Muestra",required:true },
      FechaEmisionInforme: { type:mongoose.Schema.ObjectId,ref:"Muestra",required:true},
    },
  ],
  FechaEntregaResultado: { type: Date, required: true },
  SeguimientoEntregaResultado: { type: String, required: true },
  EstadoMuestra: { type: String, default: 1 },
  DiligenciadoPor: { type:mongoose.Schema.ObjectId,ref:"Emleado",required:true },
  SupervisadoPor: { type:mongoose.Schema.ObjectId,ref:"Emleado",required:true },
  Observaciones: { type: String, required: true },
  createdAt: { type: Date, default: Date.now() },
});
export default mongoose.model("Listado", ListadoMaestroMuestras);