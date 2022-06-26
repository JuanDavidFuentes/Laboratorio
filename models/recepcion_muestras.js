import mongoose from "mongoose";
const RecepcionMuestra = new mongoose.Schema({
  DatosSolicitante: {type:mongoose.Schema.ObjectId,ref:"Cotizacion",required:true},
  DatosMuestra: [
    {
      CodigoMuestra: { type: String, maxLength: 15, required: true },
      MunicipioRecoleccion: { type: String, maxLength: 15, required: true },
      DireccionTomaMuestra: { type: String, maxLength: 15, required: true },
      LugarTomaMuestra: { type: String, maxLength: 30, required: true },
      MuestraRecolectadaPor: { type: String, maxLength: 30, required: true },
      ProcedimientoMuestreo: { type: String, required: true },
      TipoMuestra: { type: String, maxLength: 15, required: true },
      MatrizMuestra: { type: String, required: true },
      FechaRecoleccion: { type: Date, required: true },
      Cotizacion: {type:mongoose.Schema.ObjectId,ref:"Cotizacion",required:true},
      ItemCotizacion: { type: String, required: true },
      Obervaciones: { type: String, required: true },
    },
  ],
  ObservacionesPrestablecidas: [
    {
      Observaciones: { type: String, required: true },
      MuestraEntregadaPor: {type:mongoose.Schema.ObjectId,ref:"Emleado",required:true},
    },
  ],
  CondicionesServicio: [
    {
      FechaMuestra: {type:mongoose.Schema.ObjectId,ref:"Cotizacion",required:true},
      MuestraRecibidaPor: { type:mongoose.Schema.ObjectId,ref:"Emleado",required:true},
      Firma: { type: String, required: true },
    },
  ],
  createdAt: { type: Date, default: Date.now() },
});
export default mongoose.model("Muestra", RecepcionMuestra);
