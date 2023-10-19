import { Module } from '@nestjs/common';
import { SkinService } from './skin.service';
import { SkinController } from './skin.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SkinSchema, Skin } from './schemas/skin.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Skin.name,
        schema: SkinSchema,
      },
    ]),
  ],
  controllers: [SkinController],
  providers: [SkinService],
})
export class SkinModule {}
