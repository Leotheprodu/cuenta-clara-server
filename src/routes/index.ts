import { type RequestHandler, Router } from 'express';
import { dirname } from 'path';
import { readdirSync } from 'fs';
import { fileURLToPath } from 'url';

const router = Router();
const filePath = fileURLToPath(import.meta.url);
const PATH_ROUTES = dirname(filePath);
const removeExtension = (fileName: string): any => {
  return fileName.split('.').shift();
};

readdirSync(PATH_ROUTES).forEach((file: string) => {
  const name = removeExtension(file);
  if (name !== 'index') {
    import(`./${file}`)
      .then((module) => {
        router.use(`/${name}`, module.default as RequestHandler);
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.error(`Error importing route file ${file}:`, err);
      });
  }
});

export default router;
