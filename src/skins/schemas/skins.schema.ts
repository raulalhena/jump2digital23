import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type SkinsDocument = HydratedDocument<Skins>;

@Schema({ timestamps: true })
export class Skins {
  @Prop()
  name: string;

  @Prop()
  type: string;

  @Prop()
  color: string;

  @Prop({ default: true })
  available: boolean;

  @Prop()
  price: number;
}

export const SkinsSchema = SchemaFactory.createForClass(Skins);
