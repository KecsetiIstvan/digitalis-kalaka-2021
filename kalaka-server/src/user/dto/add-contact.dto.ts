import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { Schema } from 'mongoose';

export class AddContactDto {
  @IsNotEmpty({
    message: 'Hiba: Kötelező!',
  })
  public readonly _id: Schema.Types.ObjectId;
}
