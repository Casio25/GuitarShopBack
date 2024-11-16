import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Inject, UseGuards, Res, ValidationPipe } from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';
import { AzureBlobService } from '../../Services/azure-blob/azure-blob.service';
import { AuthGuard } from '@src/auth/auth.guard';

@Controller('utils')
export class UtilsController {
  containerName = "photos"
  constructor(
    private readonly azureBlobService: AzureBlobService) { }
  
  // Method to upload file to Azure Blob Storage
  
  @Post('upload')
  @UseInterceptors(FileInterceptor('myfile'))
  async upload(@UploadedFile() file: Express.Multer.File, photoName: string): Promise<string> {
    console.log("hello world", file)
    
    const fileUploaded = this.azureBlobService.upload(file, photoName, this.containerName);
    return fileUploaded;
  }

  // Method to retrieve file from Azure Blob Storage
  @Get('read')
  async readFile(@Res() res, @Body() filename: string) {
    const file = await this.azureBlobService.getFile(filename, this.containerName);
    return file.pipe(res);
  }

  // Method to delete file from Azure Blob Storage
  @Delete('delete')
  async DeleteFile(@Body() filename: string) {
    await this.azureBlobService.deleteFile(filename, this.containerName);
    return { message: 'File deleted successfully' };
  }
}
 
