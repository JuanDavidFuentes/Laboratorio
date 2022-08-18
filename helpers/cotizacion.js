import Cotizacion from "../models/cotizacion.js";

const HerlpersCotizacion = {
  
  items: async (items) => {
    items.item1.itemsEnsayo.forEach(item => {

      
      if (!item.item1.itemsEnsayo.ensayo){
        throw new Error(`El codigo_ref es obligatorio`)
      }
      if (!item.descripcion_ensayo){
        throw new Error(`La descripcion_ensayo es obligatoria`)
      }
      if (!item.unidades){
        throw new Error(`Las unidades son obligatorias`)
      }
      if (!item.tecnica_analitica){
        throw new Error(`la tecnica_analitica es obligatoria`)
      }
      if (!item.metodo_analitico){
        throw new Error(`El metodo_analitico es obligatorio`)
      }
      if (!item.limite_cuantificacion){
        throw new Error(`El limite_cuantificacion es obligatorio`)
      }
      if (!item.costo_ensayo){
        throw new Error(`El costo_ensayo es obligatorio`)
      }
      if (!item.costo_item){
        throw new Error(`El costo_item es obligatorio`)
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