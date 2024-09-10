import { Module } from '@nestjs/common';
import { UtilsService } from '../../Services/utils/utils.service';
import { UtilsController } from '../../Controllers/utils/utils.controller';

@Module({
  controllers: [UtilsController],
  providers: [UtilsService]
})
export class UtilsModule {}
