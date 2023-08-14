/* eslint-disable prettier/prettier */
import { PrismaClient } from '@prisma/client';
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    constructor() {
        super();
    }

    async onModuleInit() {
        console.log('PrismaService connected to the database.');
        await this.$connect();
    }

    async onModuleDestroy() {
        console.log('PrismaService disconnecting from the database.');
        await this.$disconnect();
        console.log('PrismaService disconnected from the database.');
    }
}
