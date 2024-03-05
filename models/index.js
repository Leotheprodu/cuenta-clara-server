import { readdirSync } from 'fs';
import path from 'path';
const models = {};
const filePath = new URL(import.meta.url).pathname;
const pathDir = path.normalize(path.dirname(filePath)).substring(1);
const PATH_MODELS = path.join(pathDir, 'mysql');
// Función que elimina la extensión del nombre de archivo
const removeExtension = (fileName) => {
  return fileName.split('.').shift();
};

// Lee los archivos de la carpeta y crea un modelo por cada uno
readdirSync(PATH_MODELS).forEach(async (file) => {
  if (file.endsWith('.js')) {
    const name = removeExtension(file);
    // Importa el archivo de modelo dinámicamente
    const module = await import(`./mysql/${file}`);
    // Agrega el modelo al objeto models
    models[`${name}Model`] = module.default;
  }
});

export default models;
