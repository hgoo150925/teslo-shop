import { v4 as uuid } from 'uuid';

export const fileNamer = (
  req: Express.Request,
  file: Express.Multer.File,
  callback: Function,
) => {
  if (!file) return callback(new Error(`File is empty`), false);

  // mimetype = image/png
  // fileExtension toma el primer argumento separandolo del "/"
  const fileExtension = file.mimetype.split('/')[1];

  // damos un nombre unico al archivo con uuid que da un id unico
  const fileName = `${uuid()}.${fileExtension}`;

  callback(null, fileName);
};
