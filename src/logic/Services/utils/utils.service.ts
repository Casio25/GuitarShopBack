import { Injectable } from '@nestjs/common';
import { CreateUtilDto } from '../../../utils/dto/create-util.dto';
import { UpdateUtilDto } from '../../../utils/dto/update-util.dto';

@Injectable()
export class UtilsService {
  create(createUtilDto: CreateUtilDto) {
    return 'This action adds a new util';
  }

  uploadPhoto (file){
    
  }

  findAll() {
    return `This action returns all utils`;
  }

  findOne(id: number) {
    return `This action returns a #${id} util`;
  }

  update(id: number, updateUtilDto: UpdateUtilDto) {
    return `This action updates a #${id} util`;
  }

  remove(id: number) {
    return `This action removes a #${id} util`;
  }
}
