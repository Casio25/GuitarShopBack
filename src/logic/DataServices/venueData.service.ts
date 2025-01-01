import { PrismaService } from "@src/prisma/prisma.service";
import { CreateVenue } from "@src/utils/interface/venueInterface";


 export class VenueDataService {
    constructor (private prisma: PrismaService) {}
     async createVenue(venueName: string, authorId: number) {
        console.log("VenueData", venueName)
         try {
             const newVenue = await this.prisma.venue.delete({
                    where: {
                        id: 1
                    }
             })
            return newVenue
             
         } catch (error) {
             console.error("Error creating new venue", error)
             throw new Error("Failed to create venue"); 
         }
     }
 }