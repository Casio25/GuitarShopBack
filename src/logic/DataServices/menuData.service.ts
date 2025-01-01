import { PrismaService } from "@src/prisma/prisma.service";
import { connect } from "http2";

export class MenuDataService {
    constructor(
        private prisma: PrismaService
    ){}
    async create(){
        try {
        } catch (error) {
            console.error("Error creating menu", error)
        }
    }
}