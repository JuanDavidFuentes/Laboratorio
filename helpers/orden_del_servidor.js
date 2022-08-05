import Orden_del_servicio from "../models/orden_del_servicio.js";

const HerlpersOrdenServicio = {
  
  items: async (items) => {
    items.forEach(item => {
      if (!item.codigo_ref){
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
  existeOrdenById: async (id) => {
    const existe = await Orden_del_servicio.findById(id)
    if (!existe) {
      throw new Error(`El id no existe ${id}`)
    }
  },
  existeCodigoOrden: async (codigo_de_la_orden) => {
    const existe = await Orden_del_servicio.findOne({codigo_de_la_orden})
    if (!existe) {
      throw new Error(`El no existe ${codigo_de_la_orden}`)
    }
  },

}

export default HerlpersOrdenServicio;