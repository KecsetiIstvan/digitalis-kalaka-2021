import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { Schema } from 'mongoose';

export class AddEmergencyContactDto {
  @IsNotEmpty({
    message: 'Hiba: Kötelező!',
  })
  public readonly name: string;
  @IsNotEmpty({
    message: 'Hiba: Kötelező!',
  })
  public readonly emergencyInfo: string;
  @IsNotEmpty({
    message: 'Hiba: Kötelező!',
  })
  public readonly settings: string;
}
