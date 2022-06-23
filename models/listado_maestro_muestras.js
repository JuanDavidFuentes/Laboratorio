import mongoose from "mongoose";

const ListadoMaestroMuestras = new mongoose.Schema({
  FechaDeIngresoMuestra: { type: Date, required: true },
  CodigoMuestra: { type: String, maxLength: 15, required: true },
  DatosSolicitante: [
    {
      Solitante: { type: String, required: true },
      Cedula: { type: String, maxLength: 15, required: true },
      Direccion: { type: String, maxLength: 15, required: true },
      Ciudad: { type: String, maxLength: 15, required: true },
      Departamento: { type: String, maxLength: 15, required: true },
      Contacto: { type: String, required: true },
      Telefono: { type: String, maxLength: 10, required: true },
      Correo: { type: String, maxLength: 50, required: true },
    },
  ],
  DatosMuestras: [
    {
      MunicipioRecoleccion: { type: String, required: true },
      DireccionTomaMuestra: { type: String, required: true },
      LugarTomaMuestra: { type: String, required: true },
      MuestraRecolectadaPor: { type: String, maxLength: 20, required: true },
      Procedimiento: { type: String, required: true },
      TipoMuestra: { type: String, required: true },
      MatrizMuestra: { type: String, required: true },
      FechaRecoleccion: { type: Date, maxLength: 20, required: true },
      Cotizacion: { type: String, required: true },
      ItemCotizacion: { type: String, required: true },
    },
  ],
  DatosInformeResultado: [
    {
      FechaRecepcionMuestra: { type: Date, required: true },
      FechaEmisionInforme: { type: Date, required: true },
    },
  ],
  FechaEntregaResultado: { type: Date, required: true },
  SeguimientoEntregaResultado: { type: String, required: true },
  EstadoMuestra: { type: String, default: 1 },
  DiligenciadoPor: { type: String, maxLength: 20, required: true },
  SupervisadoPor: { type: String, maxLength: 20, required: true },
  Observaciones: { type: String, required: true },
  createdAt: { type: Date, default: Date.now() },
});
export default mongoose.model("Listado", ListadoMaestroMuestras);
