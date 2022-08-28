import {
  BadRequestException,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { diskStorage } from 'multer';

import { FilesService } from './files.service';
import { fileFilter, fileNamer } from './helpers/index';

@Controller('files')
export class FilesController {
  // https://docs.nestjs.com/techniques/file-upload
  constructor(private readonly filesService: FilesService) {}

  @Get('product/:imageName')
  findProductImage(
    @Res() res: Response,
    @Param('imageName')
    imageName: string,
  ) {
    const path = this.filesService.getStaticProductImage(imageName);
    res.sendFile(path);
  }

  @Post('product')
  // Interceptores interceptan las solicitudes y respuestas
  // FileInterceptor('file') -> nombre de la propiedad del body que estoy esperando
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: fileFilter,
      storage: diskStorage({
        destination: './static/products',
        filename: fileNamer,
      }),
      // limits:{fileSize: 2000}
    }),
  )
  @HttpCode(HttpStatus.CREATED)
  // file: Express.Multer.File -> argumento que recibo en mi archivo
  uploadProductFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('make sure that the file is a image');
    }

    const secureUrl = `${file.fieldname}`;
    return {
      secureUrl,
    };
  }
}
