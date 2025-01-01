import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { MenuService } from '../../Services/menu/menu.service';
import { CreateMenuDto } from '../../Dto/menu/create-menu.dto';
import { UpdateMenuDto } from '../../Dto/menu/update-menu.dto';
import { AuthGuard } from '@src/auth/auth.guard';
import { IRequest} from '@src/utils/interface/requestInterface';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}
  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createMenuDto: CreateMenuDto, @Req() request: IRequest) {
    const user = request.user
    return this.menuService.create(createMenuDto, user);
  }
  @UseGuards(AuthGuard)
  @Get()
  async find(@Req() request: IRequest) {
    const user = request.user
    return this.menuService.find(user);
  }
  
  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMenuDto: UpdateMenuDto) {
    return this.menuService.update(+id, updateMenuDto);
  }
  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.menuService.remove(+id);
  }
}
