import mongoose from "mongoose";

const RolSchema= new mongoose.Schema({
    rol:{type:String,required:true}
})
export default mongoose.model("Rol",RolSchema) 