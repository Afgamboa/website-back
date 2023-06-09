import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Users } from '../schemas/user.schema';
import { Model } from 'mongoose';
import * as jwt from 'jsonwebtoken';
import { config } from '../config';
import { loginDTO, dataUserRegisterDTO } from '../dto/auth.dto';
import { userRegister } from '../interfaces/Auth.interfaces';

@Injectable()
export class AuthService {
  constructor(@InjectModel(Users.name) private userModel: Model<Users>) {}

  async login(login: loginDTO) {
    const user = await this.userModel.findOne({ email: login.email });

    if (user != null && user.password === login.password) {
      const data = this.generateToken(user);
      return data;
    } else {
      throw new HttpException(
        'Credenciales invalidas',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  async register(
    dataUserRegisterDTO: dataUserRegisterDTO,
  ): Promise<userRegister> {
    const user = await this.userModel.findOne({
      email: dataUserRegisterDTO.email,
    });
    if (user) {
      throw new ConflictException(
        `El correo electronico ${dataUserRegisterDTO.email} ya ha sido registrado`,
      );
    }
    const userRegister = await this.userModel.create(dataUserRegisterDTO);
    userRegister.save();
    return userRegister;
  }

  generateToken(user) {
    const token = jwt.sign({ id: user._id }, config.SECRET_KEY, {
      expiresIn: '1d',
    });
    const userId = user._id;
    return { token, userId };
  }
}
