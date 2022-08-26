import mongoose from 'mongoose';
import HerlpersEnsayo from "../helpers/ensayo.js";

const validarMongoId = async (itemsEnsayo) => {

    //promisse
    const valido = mongoose.Types.ObjectId.isValid(itemsEnsayo);
    if (!valido) {
        return "id no valido"
    }
    const xx = await HerlpersEnsayo.existeEnsayoById2(itemsEnsayo);
    console.log(xx);
    if (!xx) {
        return "id no existe"
    }
    return ""
}

const validarItems = (itemsEnsayo) => {
    return new Promise(async (resolve, reject) => {
        const valido = mongoose.Types.ObjectId.isValid(itemsEnsayo);
        if (!valido) {
            reject("id no valido");
        } else {
            const xx = await HerlpersEnsayo.existeEnsayoById2(itemsEnsayo);
            if (!xx) {
                reject("id no existe");
            }
        }
        resolve("");
    })

}

export { validarMongoId, validarItems }
