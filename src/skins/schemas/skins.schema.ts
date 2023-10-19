import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId } from 'mongoose';

export type SkinssDocument = HydratedDocument<Skins>;

@Schema({ timestamps: true })
export class Skins {
  @Prop()
  name: string;

  @Prop()
  type: string;

  @Prop()
  color: string;

  @Prop()
  available: boolean;

  @Prop()
  price: number;
}

export const SkinsSchema = SchemaFactory.createForClass(Skins);
