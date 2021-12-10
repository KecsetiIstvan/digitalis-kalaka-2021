import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { LoginUserDto } from 'src/user/dto/login-user.dto';

import { AuthService } from './auth.service';
import { ForgottenPasswordDto } from './dto/forgotten-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { LoginStatus } from './login.status';
import { RegistrationStatus } from './registration.status';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  public async register(
    @Body() createUserDto: CreateUserDto,
  ): Promise<RegistrationStatus> {
    const result: RegistrationStatus = await this.authService.register(
      createUserDto,
    );
    if (!result.success) {
      throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
    }
    return result;
  }

  @Post('login')
  public async login(@Body() loginUserDto: LoginUserDto) {
    return await this.authService.login(loginUserDto);
  }

  /*
  @Post('forgotten-password')
  public async forgottenPassword(
    @Body() forgottenPasswordDto: ForgottenPasswordDto,
  ): Promise<void> {
    const { email } = forgottenPasswordDto;

    return await this.authService.forgottenPassword(email);
  }

  @Post('reset-password')
  public async resetPassword(
    @Body() resetPasswordDto: ResetPasswordDto,
  ): Promise<void> {
    const { password, token } = resetPasswordDto;

    return await this.authService.resetPassword(token, password);
  }*/
}
