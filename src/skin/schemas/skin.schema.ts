import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId } from 'mongoose';

export type SkinDocument = HydratedDocument<Skin>;

@Schema({ timestamps: true })
export class Skin {
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

export const SkinSchema = SchemaFactory.createForClass(Skin);
