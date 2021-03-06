import mongoose from "mongoose";

const SeguimientoSchema = new mongoose.Schema({
  fecha: { type: Date, required: true },
  CodigoCotizacion: { type: String, required: true },
  datosCliente: {type:mongoose.Schema.ObjectId,ref:"Cotizacion",required:true},

  datosContacto: [
    {
      nombre: { type: String, maxlength: 80, required: true },
      telefono: { type: String, maxlength: 20, required: true },
      correo: { type: String, maxlength: 100, required: true },
    },
  ],

  solicitud: [
    {
      descripcion: { type: String, required: true },
    },
  ],

  medioSolicitud: { type:mongoose.Schema.ObjectId,ref:"Cotizacion",required:true },
  recibidoPor: { type:mongoose.Schema.ObjectId,ref:"Emleado",required:true },
  porcentajeAceptacion: [
    {
      emitida: { type: String, maxlength: 50 },
      aceptada: { type: String, maxlength: 50 },
      rechazada: { type: String, maxlength: 50 },
      noAplica: { type: String, maxlength: 50 },
      enProceso: { type: String, maxlength: 50 },
    },
  ],
  registroAceptacion: [
    {
      tipoRegistro: { type: String, maxlength: 50 },
    },
  ],
  motivoRechazo: [
    {
      rechazadoPor: { type: String, maxlength: 50 },
    },
  ],
  seguimientoCotizaciones: [
    {
      segimiento: { type: String },
    },
  ],
  createdAt: { type: Date, default: Date.now() },
});

export default mongoose.model("Seguimiento", SeguimientoSchema);
