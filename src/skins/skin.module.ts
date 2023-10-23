import { Module } from '@nestjs/common';
import { SkinsService } from './skins.service';
import { SkinsController } from './skins.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SkinsSchema, Skins } from './schemas/skins.schema';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Skins.name,
        schema: SkinsSchema,
      },
    ]),
    UserModule,
  ],
  controllers: [SkinsController],
  providers: [SkinsService],
})
export class SkinsModule {}
