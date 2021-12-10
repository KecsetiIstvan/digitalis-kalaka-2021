import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { Schema } from 'mongoose';

export class UpdateCurrentLocationDto {
  @IsNotEmpty({
    message: 'Hiba: Kötelező!',
  })
  public readonly latitude: Schema.Types.String;

  @IsNotEmpty({
    message: 'Hiba: Kötelező!',
  })
  public readonly longitude: Schema.Types.String;
}
