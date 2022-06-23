import mongoose from "mongoose";

const OfertaDeServicios = new mongoose.Schema({
  cotizacionNo: { type: Number },
  datosDelCliente: [
    {
      cliente: { type: String, maxlength: 80, required: true },
      dirección: { type: String, maxlength: 50, required: true },
      departamento: { type: String, maxlength: 50, required: true },
      contacto: { type: String, maxlength: 80, required: true },
      celular: { type: Number, maxlength: 50, required: true },
      validezDeLaOferta: { type: String, maxlength: 50, required: true },
      elaboradoPor: { type: String, maxlength: 50, required: true },
      NIT_CC: { type: String, maxlength: 20, required: true },
      ciudad: { type: String, maxlength: 50, required: true },
      telefono: { type: String, maxlength: 50, required: true },
      cargo: { type: String, maxlength: 50, required: true },
      correo: { type: String, maxlength: 100, required: true },
      EntregaDeResultados: { type: String, maxlength: 50, required: true },
      cargo: { type: String, maxlength: 50, required: true },
    },
  ],
  propuestaTecnicaYEconomica: [
    {
      item: [
        {
          codigoDeReferencia: { type: String, maxlength: 50, required: true },
          descripcionDelEnsayo: {type: String,maxlength: 200,required: true,
          },
          unidades: { type: String, maxlength: 50, required: true },
          TecnicaAnalitica: { type: String, maxlength: 50, required: true },
          metodoanAnalitico: { type: String, maxlength: 50, required: true },
          limiteDeCuantificacion: {type: String,maxlength: 50,required: true,
          },
          costoDelEnsayo: { type: Number, maxlength: 50, required: true },

          costoDelItem: { type: Number, maxlength: 50 },
        },
        {
          observacionesPropuestaTecnicaYEconomica: [
            {
              subtotal: { type: Number, maxlength: 50, required: true },
              iva: { type: Number, maxlength: 50, required: true },
              total: { type: Number, maxlength: 50, required: true },
            },
          ],
        },
      ],
    },
  ],
  //Observaciones del servicio
  // 1. Para el ingreso de las muestras al proceso analítico es necesario cumplir con el anexo de aceptación del servicio, enviar propuesta aceptada y copia de la consignación vía correo electrónico a labficat@sena.edu.co.
  // 2. En caso de solicitar alguna modificación o inclusión al servicio se debe solicitar al correo electrónico institucional labficat@sena.edu.co.
  // 3. Las muestras deben ser recolectadas por el cliente. Se entregará copia No controlada del Instructivo de toma de muestras CAT–ST–MU–F–001 vigente como apoyo para el proceso de muestreo.
  // 4. Los ensayos que no cuenten con símbolo de referencia indica: Ensayo sin acreditación y sin habilitación.
  // 5. Los ensayos referenciados con    (°)    se encuentran habilitados por estandares de calidad ante la Secretaria de Salud Departamental (SSD).
  // 6. Los ensayos referenciados con    (*)    se encuentran acreditados ante el Organismo Nacional de Acreditación (ONAC).
  // 7. El laboratorio se abstiene de emitir declaraciones de conformidad, opiniones e interpretaciones.
  aceptoCondiciones: [
    {
      nombre: { type: String, maxlength: 50, required: true },
      cargo: { type: String, maxlength: 50, required: true },
      firma: { type: String, maxlength: 50, required: true },
      cc: { type: String, maxlength: 50, required: true },
    },
  ],
// 3. Anexo de cotizaciones
//Aceptción del servicio		
//- El cliente es responsable de suministrar la información de los parámetros a analizar de acuerdo a sus requerimientos normativos.
// - Si el cliente acepta la presente oferta deberá enviar la propuesta técnica y económica diligenciada y firmada, orden de servicio, contrato o carta de aceptación al correo electrónico institucional labficat@sena.edu.co en el cual se referencie el código y versión de oferta aceptada.
// - Si el cliente presenta alguna inconformidad con los términos de la cotización deberá manifestarlo antes de iniciar los análisis, con el fin de realizar las modificaciones necesarias y actualizar la versión de la cotización, para proceder a la aceptación de la misma.
// - La aceptación de la propuesta implica que el cliente esta de acuerdo con todas las condiciones aquí descritas, incluyendo que las muestras se analicen por las técnicas, métodos y limites de cuantificación indicados para cada uno de los ensayos.
// - El cliente se compromete a no ejercer presiones indebidas sobre el laboratorio y su personal con la intención de acelerar el proceso de análisis o modificar los resultados del servicio.										

// Condiciones comerciales										
// - Forma de Pago:  se debe realizar la totalidad del pago de la presente oferta antes de iniciar los análisis de las muestras recepcionadas en el laboratorio.
// - El pago podrá efectuarse en efectivo en las oficinas del Centro Agroturístico o mediante consignación a la siguiente cuenta bancaria a nombre de SENA: BANCO No. XXXXXXXXX.
// - Únicamente se dará por cancelado el servicio una vez se envíe la copia de consignación al correo electrónico institucional labficat@sena.edu.co
// - La recepción y procesamiento de las muestras se realizara dentro de los días hábiles  Lunes a Viernes de 08:00 am - 12:00 pm y 02:00 pm - 05:00 pm.
// - La fecha de entrega de resultados mencionada en la presente oferta está contemplada desde la fecha de recepción de las muestras al laboratorio, teniendo en cuenta que solo cuentan días hábiles.
// - El informe de resultados se entregara de acuerdo a las condiciones pactadas en la cotización, una vez sean analizadas las muestras.										
																										
// Condiciones técnicas										
// - LABFICAT no es responsable de la recolección ni del transporte de las muestras ya que el servicio de muestreo es realizado por el cliente.
// - Solo se guardaran remanentes de las muestras cuando el cliente lo solicite por escrito y deberá quedar constancia en la orden de servicio, contrato o aceptación del servicio.										
										
// Garantía del servicio										
// - Se entregará copia No controlada del Instructivo de toma de muestras CAT–ST–MU–F–001 vigente como apoyo para el proceso de muestreo que es responsabilidad del cliente, donde se especifican las condiciones y recomendaciones a tener en cuenta cuando se efectué el muestreo, LABFICAT solo se hace responsable del ítem de ensayo desde el momento de la recepción de la muestra y no garantiza los criterios de calidad considerados durante la recolección.
// - Aquellos resultados cuestionados por el cliente serán tratatos de acuerdo al procedimiento de Quejas CAT-ST-QJ-P-001. De requerir re-análisis se realizará de la muestra que el cliente haya traído inicialmente y que se encuentra bajo la custodia del laboratorio si los resultados del re-análisis confirman los datos originales, el cliente asumirá los costos asociados al re-análisis.
// - LABFICAT garantiza la protección de la confidencialidad de la información y de los derechos de propiedad que los clientes tienen sobre sus resultados, asimismo, garantiza la imparcialidad e integridad operativa en las actividades de la Organización.
// - LABFICAT reconoce que la información del cliente es confidencial y solo será revelada si la ley o el mismo lo disponen. Cuando la información sea solicitada por la ley, se notifica mediante correo electrónico institucional al cliente que la información será divulgada siempre y cuando la ley no lo prohíba.										
																				
// Calidad del servicio										
// - LABFICAT se encuentra en proceso de acreditación ante el Organismo Nacional de Acreditación (ONAC) bajo la norma NTC ISO/IEC 17025:2017 en la matriz de Alimentos.
// - LABFICAT se encuentra en proceso de habilitación de estandares de calidad ante la Secretaría de Salud Departamental (SSD).
// - LABFICAT participa en Pruebas de Desempeño anualmente conforme a lo establecido en el inciso a) del numeral 7.7.2. Aseguramiento de la validez de los resultados de la norma NTC ISO/IEC 17025:2017.																			
});
export default mongoose.model("Servicios", OfertaDeServicios);
