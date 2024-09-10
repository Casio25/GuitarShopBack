import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { UtilsService } from '../../Services/utils/utils.service';
import { CreateUtilDto } from '../../../utils/dto/create-util.dto';
import { UpdateUtilDto } from '../../../utils/dto/update-util.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('utils')
export class UtilsController {
  constructor(private readonly utilsService: UtilsService) {}

  @Post()
  create(@Body() createUtilDto: CreateUtilDto) {
    return this.utilsService.create(createUtilDto);
  }
@Post("upload_photo")
@UseInterceptors(FileInterceptor("file"))
async uploadFile(@UploadedFile() file){
  const uploadedPhotoLink = await this.utilsService.uploadPhoto(file)
  return uploadedPhotoLink
}
  @Get()
  findAll() {
    return this.utilsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.utilsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUtilDto: UpdateUtilDto) {
    return this.utilsService.update(+id, updateUtilDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.utilsService.remove(+id);
  }
}
