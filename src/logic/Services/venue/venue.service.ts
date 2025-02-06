import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';

import { User } from '@prisma/client';
import { AuthDataService } from '@src/logic/DataServices/authData.service';
import { VenueDataService } from '@src/logic/DataServices/venueData.service';
import { IUserRequest } from '@src/utils/interface/requestInterface';
import { CreateVenue } from '@src/utils/interface/venueInterface';

@Injectable()
export class VenueService {
  constructor (
    private authDataService: AuthDataService,
    private venueDataService: VenueDataService
  ) {}

 
  async createVenue(newVenue: CreateVenue, user: IUserRequest) {
 
    const foundedUser = await this.authDataService.findUser(user)
    try {
      await this.venueDataService.createVenue(newVenue.name, foundedUser.id)
    } catch (error) {
      throw new BadRequestException("Error creating venue", error);
      console.error("Error creating venue", error)

    }
  }

  async getVenue(user: IUserRequest){
    const foundedUser = await this.authDataService.findUser(user)
    try {
    const venueData = await this.venueDataService.getVenue(foundedUser.id)
    if (!venueData || venueData.length === 0) {
      throw new NotFoundException("No venue data found")
    }
    return venueData
    }catch (error) {
      if (error instanceof NotFoundException) {
        throw error
      }
      throw new BadRequestException("Error getting venue data", error)
    }
  }
 
}
