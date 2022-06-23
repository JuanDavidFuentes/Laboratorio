import mongoose from "mongoose";
const RecepcionMuestra = new mongoose.Schema({
  DatosSolicitante: [
    {
      Solicitante: { type: String, maxLength: 30, required: true },
      Cedula: { type: String, maxLength: 15, required: true },
      Direccion: { type: String, maxLength: 20, required: true },
      Ciudad: { type: String, maxLength: 15, required: true },
      Departamento: { type: String, maxLength: 15, required: true },
      Contacto: { type: String, maxLength: 30, required: true },
      Telefono: { type: String, maxLength: 10, required: true },
      Correo: { type: String, maxLength: 50, required: true },
    },
  ],
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
      Cotizacion: { type: String, required: true },
      ItemCotizacion: { type: String, required: true },
      Obervaciones: { type: String, required: true },
    },
  ],
  ObservacionesPrestablecidas: [
    {
      Observaciones: { type: String, required: true },
      MuestraEntregadaPor: { type: String, required: true },
      Cedula: { type: String, maxLength: 15, required: true },
      Firma: { type: String, required: true },
    },
  ],
  CondicionesServicio: [
    {
      Condiciones: { type: String, required: true },
      FechaMuestra: { type: Date, required: true },
      MuestraRecibidaPor: { type: String, required: true },
      Firma: { type: String, required: true },
    },
  ],
  createdAt: { type: Date, default: Date.now() },
});
export default mongoose.model("Recepcion", RecepcionMuestra);
