import DatosMuestra from "../models/datos-muestras.js";

const HerlpersDatosMuestra = {
  existeDatosMuestraById: async (id) => {
    const existe = await DatosMuestra.findById(id);
    if (!existe) {
      throw new Error(`El id no existe ${id}`);
    }
  },

  // orden: async (orden) => {
  //   for (let i = 0; i < ensayo.length; i++) {
  //     if (ensayo[i].idensayo != "") {
  //       await validarOrden(ensayo[i].idensayo).catch((err) => {
  //         throw new Error("idensayo " + err);
  //       });
  //     } else {
  //       throw new Error("Falta id del ensayo idensayo");
  //     }
  //     if (!ensayo[i].realizado) {
  //       throw new Error("El realizado es obligatorio");
  //     }
  //     if (!ensayo[i].supervisado) {
  //       throw new Error("El supervisor es obligatorio");
  //     }
  //   }
  // },
};

export default HerlpersDatosMuestra;
