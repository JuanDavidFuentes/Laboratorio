import Ensayo from "../models/ensayo.js";

const HelpersEnsayo= {
  existeEnsayoById: async (id) => {
    const existe = await Ensayo.findById(id)
    if (!existe) {
      throw new Error(`El id no existe ${id}`)
    }
  },

  existeEnsayoById2: async (id) => {
    const existe = await Ensayo.findById(id)
    if (!existe) {
      return false
    }
    return true
  }
}

export default HelpersEnsayo;