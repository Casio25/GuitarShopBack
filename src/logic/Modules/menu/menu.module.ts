import { Module } from '@nestjs/common';
import { MenuService } from '../../Services/menu/menu.service';
import { MenuController } from '../../Controllers/menu/menu.controller';
import { AuthDataService } from '@src/logic/DataServices/authData.service';
import { PrismaService } from '@src/prisma/prisma.service';
import { VenueModule } from '../venue/venue.module';
import { MenuDataService } from '@src/logic/DataServices/menuData.service';

@Module({
  controllers: [MenuController],
  providers: [MenuService, AuthDataService, PrismaService, VenueModule, MenuDataService],
})
export class MenuModule {}
