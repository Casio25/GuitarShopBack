import { Module } from '@nestjs/common';
import { VenueService } from '@src/logic/Services/venue/venue.service'; 
import { VenueController } from '@src/logic/Controllers/venue/venue.controller';
import { AuthDataService } from '@src/logic/DataServices/authData.service';
import { PrismaService } from '@src/prisma/prisma.service';
import { VenueDataService } from '@src/logic/DataServices/venueData.service';
import { MenuModule } from '../menu/menu.module';
import { MenuService } from '@src/logic/Services/menu/menu.service';
import { MenuDataService } from '@src/logic/DataServices/menuData.service';

@Module({
  controllers: [VenueController],
  providers: [VenueService, AuthDataService, PrismaService, VenueDataService, MenuService, MenuDataService],
})
export class VenueModule {}
