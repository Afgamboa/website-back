import { Prop, Schema, SchemaFactory  } from "@nestjs/mongoose";

@Schema({collection: 'Users'})
export class User {

    @Prop()
    email: string

    @Prop()
    password: string

    @Prop()
    firstName: string

    @Prop()
    username: string

}

export const userSchema = SchemaFactory.createForClass(User);