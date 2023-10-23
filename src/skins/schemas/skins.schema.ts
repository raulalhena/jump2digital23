import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId } from 'mongoose';

export type SkinsDocument = HydratedDocument<Skins>;

@Schema({ timestamps: true })
export class Skins {
  @Prop()
  _id: ObjectId;

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
