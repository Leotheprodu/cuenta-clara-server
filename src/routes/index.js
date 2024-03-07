import express from 'express';
import path from 'path';
import { readdirSync } from 'fs';

const router = express.Router();
const filePath = new URL(import.meta.url).pathname;
const PATH_ROUTES = path.normalize(path.dirname(filePath)).substring(1);

const removeExtension = (fileName) => fileName.split('.').shift();

readdirSync(PATH_ROUTES).forEach((file) => {
  const name = removeExtension(file);
  if (name !== 'index') {
    import(`./${file}`)
      .then((module) => {
        router.use(`/${name}`, module.default);
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.error(`Error importing route file ${file}:`, err);
      });
  }
});

export default router;
