import { Injectable } from "@nestjs/common";
import { PrismaService } from "@src/prisma/prisma.service";
import { CreateVenue } from "@src/utils/interface/venueInterface";

@Injectable()
 export class VenueDataService {
     constructor(private prisma: PrismaService) { }
     async createVenue(venueName: string, authorId: number) {
        console.log("VenueData", venueName)
         try {
             const newVenue = await this.prisma.venue.create({
                    data: {
                        name: venueName,
                        authorId: authorId
                    }
             })
            return newVenue
             
         } catch (error) {
             console.error("Error creating new venue", error)
             throw new Error("Failed to create venue"); 
         }
     }

     async getVenue(authorId: number) {
        try{
            const venueData = await this.prisma.venue.findMany({
                where: {
                    authorId: authorId
                }
            })
            return venueData
        }catch (error) {
            console.error("error getting venue", error)
            throw new Error("Falied to  get venue Data");
            
        }
     }
 }