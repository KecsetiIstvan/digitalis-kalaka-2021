import { Status } from '@types';
import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { Schema } from 'mongoose';

export class UpdateStatusDto {
  @IsNotEmpty({
    message: 'Hiba: Kötelező!',
  })
  public readonly status: Status;

  @IsNotEmpty({
    message: 'Hiba: Kötelező!',
  })
  public readonly isLocationShared: Schema.Types.Boolean;
}
