import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ collection: 'Users' })
export class Users {
  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  firstName: string;

  @Prop()
  username: string;
}

export const userSchema = SchemaFactory.createForClass(Users);
