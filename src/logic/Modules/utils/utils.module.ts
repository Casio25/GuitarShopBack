import { Module } from '@nestjs/common';

import { UtilsController } from '../../Controllers/utils/utils.controller';
import { AzureBlobService } from '@src/logic/Services/azure-blob/azure-blob.service';
import { AuthDataService } from '@src/logic/DataServices/authData.service';
import { PrismaService } from '@src/prisma/prisma.service';

@Module({
  controllers: [UtilsController],
  providers: [AzureBlobService, AuthDataService, PrismaService]
})
export class UtilsModule {}
