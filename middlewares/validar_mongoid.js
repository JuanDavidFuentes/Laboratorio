import mongoose from 'mongoose';
import HerlpersEnsayo from "../helpers/ensayo.js";

const validarMongoId=async(itemsEnsayo)=>{
    if(itemsEnsayo.length>0){
        for(let i= 0; i<itemsEnsayo.length; i++){
            const element=itemsEnsayo[i].ensayo;
            const valido = mongoose.Types.ObjectId.isValid(element);
            if(!valido){
                return"id no valido"
            }
            const xx=await HerlpersEnsayo.existeEnsayoById(element);
            if(xx){
                return "id no existe"
            }
        }
    }
    return ""
}

export {validarMongoId}