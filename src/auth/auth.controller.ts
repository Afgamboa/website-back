import {
  Body,
  Controller,
  UnauthorizedException,
  Post,
  Res,
  BadRequestException,
  Delete,
  HttpException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginDTO, dataUserRegisterDTO } from '../dto/auth.dto';

@Controller('api/auth')
export class AuthController {
  constructor(private AuthService: AuthService) {}

  @Post('/login')
  async login(@Body() loginDTO: loginDTO, @Res() res) {
    try {
      const data = await this.AuthService.login(loginDTO);
      return res.status(200).json(data);
    } catch (e) {
      return res.status(e.status).json({ message: e.response });
    }
  }

  @Post('/register')
  async register(@Body() registerDTO: dataUserRegisterDTO, @Res() res) {
    try {
      const userRegister = await this.AuthService.register(registerDTO);
      return res.status(200).json({
        message: 'usuario registrado correctamente',
        user: userRegister,
      });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
