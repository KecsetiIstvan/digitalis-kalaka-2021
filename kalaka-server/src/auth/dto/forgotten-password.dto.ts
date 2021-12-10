import { IsEmail, IsNotEmpty } from 'class-validator';

export class ForgottenPasswordDto {
  @IsNotEmpty({ message: 'Hiba: Email cím kötelező' })
  public readonly email: string;
}
