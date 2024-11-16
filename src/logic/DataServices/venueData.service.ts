import { PrismaService } from "@src/prisma/prisma.service";
import { CreateVenue } from "@src/utils/interface/venueInterface";

 export class VenueDataService {
    constructor (private prisma: PrismaService) {}
     async createVenue(VenueData: CreateVenue, authorId: number) {
        //  try {
        //      const newVenue = await this.prisma.venue.create({
        //          data: {
        //              name: VenueData.name,
        //              users: {
        //                  connect: {
        //                      id: authorId,
        //                  }
        //              }
        //          }
        //      })
        //      return newVenue
        //  } catch (error) {
        //      console.error("Error creating new venue", error)
        //  }
     }
 }