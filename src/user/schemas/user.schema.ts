import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId } from 'mongoose';
import { Skins } from 'src/skins/schemas/skins.schema';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: Skins.name }],
    default: [],
  })
  skins: mongoose.Types.ObjectId[];
}

export const UserSchema = SchemaFactory.createForClass(User);
