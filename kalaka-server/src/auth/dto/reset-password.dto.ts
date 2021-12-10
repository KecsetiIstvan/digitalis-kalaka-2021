import { IsNotEmpty } from 'class-validator';

export class ResetPasswordDto {
  @IsNotEmpty({ message: 'Hiba: Jelszó kötelező!' })
  public readonly password: string;

  @IsNotEmpty({
    message:
      'Hiba: Kérlek nyisd meg a linket újra! Ha továbbra is ezt látod, jelezd kérlek válaszolva az emailre!',
  })
  public readonly token: string;
}
