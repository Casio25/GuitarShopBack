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

  private checkAdminRole(user: User) {
    console.log("user", user.roleId)
    if (user.roleId !== 1) {
      throw new UnauthorizedException("Access denied")
    }
  }
  private checkForUser(user: User) {
    if (!user) {
      throw new NotFoundException("User not found")
    }
  }
  async createVenue(newVenue: CreateVenue, user: IUserRequest) {
    const userData = {
      id: user.uid
    }
    const foundedUser = await this.authDataService.findUser(user.email)
    this.checkForUser(foundedUser)
    this.checkAdminRole(foundedUser)
    try {
      await this.venueDataService.createVenue(newVenue, foundedUser.id)
    } catch (error) {
      throw new BadRequestException("Error creating venue", error);

    }
  }
 
}
