import { IsNotEmpty } from 'class-validator';

export class LoginUserDto {
  @IsNotEmpty({
    message: 'Hiba: Email cím kötelező!',
  })
  public readonly email: string;
  @IsNotEmpty({
    message: 'Hiba: Jelszó kötelező!',
  })
  public readonly password: string;
}
