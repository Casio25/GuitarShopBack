import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Inject, UseGuards, Res, ValidationPipe } from '@nestjs/common';
import { UtilsService } from '../../Services/utils/utils.service';
import { CreateUtilDto } from '../../../utils/dto/create-util.dto';
import { UpdateUtilDto } from '../../../utils/dto/update-util.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { AzureBlobService } from '../../Services/azure-blob/azure-blob.service';
import { AuthGuard } from '@src/auth/auth.guard';

@Controller('utils')
export class UtilsController {
  containerName = "photos"
  constructor(
    @Inject(UtilsService)
    private utilsService: UtilsService,
    private readonly azureBlobService: AzureBlobService) { }
  
  // Method to upload file to Azure Blob Storage
  @Post('upload')
  @UseInterceptors(FileInterceptor('myfile'))
  async upload(@UploadedFile() file: Express.Multer.File): Promise<string> {
    console.log("hello world", file)
    const fileUploaded = this.azureBlobService.upload(file, this.containerName);
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
    await this.azureBlobService.deletefile(filename, this.containerName);
    return { message: 'File deleted successfully' };
  }
}
 
