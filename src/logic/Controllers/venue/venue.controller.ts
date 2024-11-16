import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@src/auth/auth.guard';
import { CreateVenueDto } from '@src/logic/Dto/venue/create-venue.dto';
import { VenueService } from '@src/logic/Services/venue/venue.service';
import { IRequest } from '@src/utils/interface/requestInterface';


@Controller('venue')
export class VenueController {
  constructor(private readonly venueService: VenueService) {}
  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createVenueDto: CreateVenueDto, @Req() request: IRequest) {
    const user = request.user
    return this.venueService.createVenue(createVenueDto, user);
  }
}
