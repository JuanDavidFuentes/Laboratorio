import mongoose from "mongoose";

const Empleados = new mongoose.Schema({
  cargo: { type: String, maxlength: 50, required: true },
  Nombre: { type: String, maxlength: 80, required: true },
  cedula:{ type: String, maxlength:20,required: true },
  dirección: { type: String, maxlength: 50, required: true },
  departamento: { type: String, maxlength: 50, required: true },
  municipio: { type: String, maxlength: 80, required: true },
  celular: { type: Number, maxlength: 50, required: true },
  Firma: { type: String, required: true },
})

export default mongoose.model("Emleado", Empleados);
