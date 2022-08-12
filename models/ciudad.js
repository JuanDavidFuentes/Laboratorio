import mongoose from "mongoose";

const CiudadSchema = new mongoose.Schema({
  coddepartamento: {type: mongoose.Schema.ObjectId, ref: "Departamento", required: true},
  ciudad: {type: String,required: true},
  codciudad: {type: String,required: true},
});

export default mongoose.model("Ciudad", CiudadSchema);
