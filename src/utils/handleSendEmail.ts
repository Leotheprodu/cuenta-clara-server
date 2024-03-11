import ejs from 'ejs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import transporter from '../config/nodemailer/transporter.js';

const filePath = fileURLToPath(import.meta.url);
const PATH_ROUTES = dirname(filePath);
/**
 * el nombre del template que debe estar en configuracion, dataToEJS es la data que ocupa el template es un objeto, from es un objeto con el nombre quien envia y el correo, to es el correo del destinatario, y subjet es el asunto del correo.
 * @param {*} templateName
 * @param {*} dataToEJS
 * @param {*} from
 * @param {*} to
 * @param {*} subject
 */
const sendAEmail = async (
  templateName: string,
  dataToEJS: object,
  from: { name: string; email: string },
  to: string,
  subject: string,
): Promise<any> => {
  ejs.renderFile(
    `${PATH_ROUTES}/../../public/templates/${templateName}.ejs`,
    dataToEJS,
    (error, data) => {
      if (error != null) {
        console.log(error);
      } else {
        const mailOptions = {
          from: `${from.name} <${from.email}>`, // Coloca el correo desde el que enviarás los correos
          to, // Coloca el correo del destinatario
          subject,
          html: data, // Contenido HTML generado a partir de la plantilla
        };

        // eslint-disable-next-line no-shadow
        transporter.sendMail(mailOptions, (error, info) => {
          if (error != null) {
            console.log(error);
          } else {
            const message = {
              message: `Email Send: ${info.response}`,
            };

            return message;
          }
          return '';
        });
      }
    },
  );
};
export default sendAEmail;
