import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateMenuDto } from '../../Dto/menu/create-menu.dto';
import { UpdateMenuDto } from '../../Dto/menu/update-menu.dto';
import { IUserRequest } from '@src/utils/interface/requestInterface';
import { AuthDataService } from '@src/logic/DataServices/authData.service';
import { User } from '@prisma/client';
import { MenuDataService } from '@src/logic/DataServices/menuData.service';

@Injectable()
export class MenuService {
  constructor(
    private authDataService: AuthDataService,
    private menuDataService: MenuDataService
  ) {}
  // private checkAdminRole(user: User) {
  //   console.log("user", user.roleId)
  //   if (user.roleId !== 1) {
  //     throw new UnauthorizedException("Access denied")
  //   }
  // }
  // private checkForUser(user: User) {
  //   if (!user) {
  //     throw new NotFoundException("User not found")
  //   }
  // }

  async create(createMenuDto: CreateMenuDto, user: IUserRequest) {
    const foundedUser = await this.authDataService.findUser(user)
    // this.checkForUser(foundedUser)
    // this.checkAdminRole(foundedUser)
    await this.menuDataService.create()
    return 'This action adds a new menu';
  }

  async find(user: IUserRequest) {
    const foundedUser = await this.authDataService.findUser(user)
    console.log("menu service", foundedUser)
  }

  update(id: number, updateMenuDto: UpdateMenuDto) {
    return `This action updates a #${id} menu`;
  }

  remove(id: number) {
    return `This action removes a #${id} menu`;
  }
}
