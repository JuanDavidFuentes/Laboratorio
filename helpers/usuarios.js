import Usuario from "../models/usuarios.js";

const HerlpersUsuario = {
  existeEmail: async (email) => {
    if (email) {
      const existe = await Usuario.findOne({ email });
      if (existe) throw new Error("Email ya existe en la bd");
    }
  },

  existeUsuarioById: async (id) => {
    const existe = await Usuario.findById(id)
    if (!existe) {
      throw new Error(`El id  ${id} no existe`)
    }
  },

  existeUsuarioNombre: async (nombre) => {
    const Existe= await Usuario.findOne({nombre})
    if (!Existe) {
      throw new Error(`El nombre: ${nombre} no existe`)
    }
  },

  contacto: async (contacto) => {
    contacto.forEach(contactos => {
      if (!contactos.nombre){
        throw new Error(`El nombre del contacto es obligatorio`)
      }
      if (!contactos.telefono){
        throw new Error(`El numero del contacto es obligatorio`)
      }
      if (!contactos.correoElectronico){
        throw new Error(`El correo electronico del contacto es obligatorio`)
      }
    })
  },

  noexisteEmail:async(email)=>{
    if(email){
        const existe=await Usuario.findOne({email})
        if(!existe) throw new Error("Correo no existe Base de datos")
    }
  }
}

export default HerlpersUsuario;              
