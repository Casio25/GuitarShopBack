import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PhotoService } from '../../Services/photo/photo.service';

@Controller('photos')
export class PhotoController {
    constructor(private readonly photoService: PhotoService) { }

    // @Post('upload')
    // @UseInterceptors(FileInterceptor('photo'))
    // async uploadPhoto(@UploadedFile() photo: Express.Multer.File): Promise<string> {
    //     return this.photoService.uploadPhoto(photo);
    // }
}