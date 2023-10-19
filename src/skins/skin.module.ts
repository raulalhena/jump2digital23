import { Module } from '@nestjs/common';
import { SkinsService } from './skins.service';
import { SkinsController } from './skins.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SkinsSchema, Skins } from './schemas/skins.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Skins.name,
        schema: SkinsSchema,
      },
    ]),
  ],
  controllers: [SkinsController],
  providers: [SkinsService],
})
export class SkinsModule {}
