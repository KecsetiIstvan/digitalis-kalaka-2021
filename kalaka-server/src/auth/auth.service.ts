import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { UserService } from 'src/user/user.service';
//import { UserTokensService } from 'src/user/user-tokens/user-tokens.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoginUserDto } from '../user/dto/login-user.dto';

import { JwtPayload } from './jwt.payload';
import { LoginStatus } from './login.status';
import { RegistrationStatus } from './registration.status';
import * as argon2 from 'argon2';
import { User } from '@types';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    //private readonly userTokensService: UserTokensService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async register(userDto: CreateUserDto): Promise<RegistrationStatus> {
    let status: RegistrationStatus = {
      success: true,
      message: 'user registered',
    };

    try {
      await this.userService.create(userDto);
    } catch (err) {
      status = {
        success: false,
        message: err,
      };
    }
    return status;
  }

  async login(loginUserDto: LoginUserDto) {
    const user = await this.userService.findOneByEmail(loginUserDto.email);

    try {
      const isMatch = await argon2.verify(user.password, loginUserDto.password);
      if (!isMatch)
        throw new HttpException(
          'Hibás bejelentkezési adatok',
          HttpStatus.UNAUTHORIZED,
        );
    } catch {
      throw new HttpException(
        'Hibás bejelentkezési adatok',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const token = this._createToken(user);

    return {
      ...token,
    };
  }

  private _createToken({ email }: User) {
    const user = { email };
    const accessToken = this.jwtService.sign(user);

    return {
      email,
      accessToken,
    };
  }

  async validateUser(payload: JwtPayload): Promise<User> {
    const user = await this.userService.findOneByEmail(payload.email);
    if (!user) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }

  /*
  public async forgottenPassword(email: string): Promise<void> {
    const user = await this.userService.findOne(undefined, {
      where: {
        email,
      },
    });

    if (!user) {
      throw new HttpException(
        'Hiba: Helytelen email cím.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const token = await this.userTokensService.issueToken(
      E_TOKEN_TYPE.PASSWORD_RESET,
      user.id,
    );

  }

  public async resetPassword(value: string, password: string) {
    const token = await this.userTokensService.findOne(undefined, {
      where: {
        value,
        type: E_TOKEN_TYPE.PASSWORD_RESET,
      },
    });

    if (!token) {
      throw new HttpException(
        'Hiba: Hiba történt a kérés feldolgozása közben. Kérlek vedd fel a kapcsolatot velünk, a jelszó visszaállítós emailre válaszolva!',
        HttpStatus.BAD_REQUEST,
      );
    }
    const verify = await this.userTokensService.verifyToken(token);

    if (!verify) {
      throw new HttpException(
        'Hiba: Ez a link már nem él. Kérlek igényelj újat!',
        HttpStatus.BAD_REQUEST,
      );
    }

    const user = await this.userService.findOne(token.userId);

    if (!user) {
      throw new HttpException(
        'Hiba: A felhasználó nem található.',
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.userService.update(user.id, {
      password,
    });

    await this.userTokensService.invalidateToken(token.id);
  }
  */
}
