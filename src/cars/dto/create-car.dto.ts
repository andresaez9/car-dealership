import { IsString } from 'class-validator';

export class CreateCarDto {
  @IsString({ message: 'Brand must be a string' })
  readonly brand: string;
  @IsString({ message: 'Model must be a string' })
  readonly model: string;
}
