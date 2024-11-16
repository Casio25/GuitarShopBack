import { Module } from '@nestjs/common';
import { VenueService } from '@src/logic/Services/venue/venue.service'; 
import { VenueController } from '@src/logic/Controllers/venue/venue.controller';
import { AuthDataService } from '@src/logic/DataServices/authData.service';
import { PrismaService } from '@src/prisma/prisma.service';
import { VenueDataService } from '@src/logic/DataServices/venueData.service';

@Module({
  controllers: [VenueController],
  providers: [VenueService, AuthDataService, PrismaService, VenueDataService],
})
export class VenueModule {}
