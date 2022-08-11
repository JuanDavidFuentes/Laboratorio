import mongoose from "mongoose"
const DepartamentoSchema= new mongoose.Schema({
    coddepartamento: {type: String, required: true},
    departamento: {type: String, required: true},
})

export default mongoose.model("Departamento",DepartamentoSchema)