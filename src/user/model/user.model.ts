import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import { mongooseSchemaConfig } from 'src/utils/database/schema.config';

export type UserDocument = User & Document;

@Schema(mongooseSchemaConfig)
export class User {

  @Prop()
  username: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

}

export const UserSchema = SchemaFactory.createForClass(User);
