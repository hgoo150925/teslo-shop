import {
  BadRequestException,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesService } from './files.service';
import { fileFilter } from './helpers/fileFilter.helper';

@Controller('files')
export class FilesController {
  // https://docs.nestjs.com/techniques/file-upload
  constructor(private readonly filesService: FilesService) {}

  @Post('product')
  // Interceptores interceptan las solicitudes y respuestas
  // FileInterceptor('file') -> nombre de la propiedad del body que estoy esperando
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: fileFilter,
    }),
  )
  @HttpCode(HttpStatus.CREATED)
  // file: Express.Multer.File -> argumento que recibo en mi archivo
  uploadProductFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('make sure that the file is a image');
    }
    return {
      fileName: file.originalname,
    };
  }
}
