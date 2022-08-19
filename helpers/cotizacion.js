import { validarMongoId } from "../middlewares/validar_mongoid.js";
import Cotizacion from "../models/cotizacion.js";

const HerlpersCotizacion = {
  
  items: async (items) => {
    items.item1.itemsEnsayo.forEach(item => {

      if (item.ensayo){
        const error = validarMongoId(item.ensayo)
        if(error!=""){
          throw new Error(error)
        }
      }
      if (!items.item1.costo){
        throw new Error("El costo es obligatorio")
      }
      });
    items.item2.itemsEnsayo.forEach(item => {
      if (item.ensayo){
        const error = validarMongoId(item.ensayo)
        if(error!=""){
          throw new Error(error)
        }
      }
      });
    items.item3.itemsEnsayo.forEach(item => {
      if (item.ensayo){
        validarMongoId(item.ensayo)
      }
      });
  },
  
  existeCotizacionById: async (id) => {
    const existe = await Cotizacion.findById(id)
    if (!existe) {
      throw new Error(`El id: ${id} no existe`)
    }
  },
  existeNumeroCotizacion: async (numero_cotizacion) => {
    const existe = await Cotizacion.findOne({numero_cotizacion})
    if (!existe) {
      throw new Error(`El numero de cotizacion: ${numero_cotizacion} no existe`)
    }
  },

}

export default HerlpersCotizacion;