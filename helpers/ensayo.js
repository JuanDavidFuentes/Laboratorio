import Ensayo from "../models/ensayo.js";

const HerlpersEnsayo= {
  existeEnsayoById: async (id) => {
    const existe = await Ensayo.findById(id)
    if (!existe) {
      throw new Error(`El id no existe ${id}`)
    }
  },
}


export default HerlpersEnsayo;