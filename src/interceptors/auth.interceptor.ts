import { CallHandler, ConflictException, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken';
import { config } from "../config";
import { Users } from "../schemas/user.schema";
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';


@Injectable()
export class AuthenticateTokenInterceptor implements NestInterceptor {

  constructor(@InjectModel(Users.name) private userModel: Model<Users>){}

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
       throw new ConflictException('Unauthorized');
    }
    const token = authHeader.split(' ')[1];

    try {
      const decodedJwt: any = jwt.verify(token, config.SECRET_KEY);

      const user = await this.userModel.findById(decodedJwt.id);

      if (!user) {
        throw new ConflictException('Invalid token');
      }

      req.user = user;
    } catch (err) {
        throw new ConflictException(err)
    }

    return next.handle();
  }
}