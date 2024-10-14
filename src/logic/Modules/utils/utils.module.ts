import { Module } from '@nestjs/common';
import { UtilsService } from '../../Services/utils/utils.service';
import { UtilsController } from '../../Controllers/utils/utils.controller';
import { AzureBlobService } from '@src/logic/Services/azure-blob/azure-blob.service';

@Module({
  controllers: [UtilsController],
  providers: [UtilsService, AzureBlobService]
})
export class UtilsModule {}
