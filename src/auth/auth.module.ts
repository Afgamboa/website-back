import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Users, userSchema } from '../schemas/user.schema';

@Module({
  imports: [MongooseModule.forFeature([
    {name: Users.name, schema: userSchema}
  ])],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
