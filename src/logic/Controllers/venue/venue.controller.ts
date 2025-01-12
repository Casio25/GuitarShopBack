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
  async create(@Body() createVenueDto: CreateVenueDto, @Req() request: IRequest) {
    const user = request.user
    console.log("createVenueDto", createVenueDto)
    await this.venueService.createVenue(createVenueDto, user);
  }
  @UseGuards(AuthGuard)
  @Get()
  async get(@Req() request: IRequest) {
    const user = request.user
    const response = await this.venueService.getVenue(user)
    return response
  }
}
