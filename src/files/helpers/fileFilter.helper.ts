export const fileFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  callback: Function,
) => {
  if (!file) return callback(new Error(`File is empty`), false);

  // mimetype = image/png
  // fileExtension toma el primer argumento separandolo del "/"
  const fileExtension = file.mimetype.split('/')[1];
  const validExtensions = ['jpg', 'jpeg', 'gif', 'png', 'svg'];

  // validamos que la extension del archivo
  if (validExtensions.includes(fileExtension)) {
    return callback(null, true);
  }
  callback(null, false);
};
