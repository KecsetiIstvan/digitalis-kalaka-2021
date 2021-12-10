import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { Schema } from 'mongoose';

export class CreateUserDto {
  @IsNotEmpty({
    message: 'Hiba: Email cím kötelező!',
  })
  public readonly email: Schema.Types.String;

  @IsNotEmpty({
    message: 'Hiba: Jelszó kötelező!',
  })
  public readonly password: Schema.Types.String;

  @IsNotEmpty({
    message: 'Hiba: Keresztnév kötelező!',
  })
  public readonly firstName: Schema.Types.String;

  @IsNotEmpty({
    message: 'Hiba: Vezetéknév kötelező!',
  })
  public readonly lastName: Schema.Types.String;
}
