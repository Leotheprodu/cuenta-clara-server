import { readdirSync } from 'fs';
import path from 'path';

const models = {};
const filePath = new URL(import.meta.url).pathname;
const pathDir = path.normalize(path.dirname(filePath)).substring(1);
const PATH_MODELS = path.join(pathDir, 'mysql');
// Función que elimina la extensión del nombre de archivo
const removeExtension = (fileName) => fileName.split('.').shift();

// Lee los archivos de la carpeta y crea un modelo por cada uno
readdirSync(PATH_MODELS).forEach((file) => {
  const name = removeExtension(file);
  if (file.endsWith('.js')) {
    // Importa el archivo de modelo dinámicamente
    import(`./mysql/${file}`)
      .then((module) => {
        // Agrega el modelo al objeto models
        models[`${name}Model`] = module.default;
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.error(`Error importing model file ${file}:`, err);
      });
  }
});
export default models;
