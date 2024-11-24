import { IsNotEmpty, IsString } from "class-validator";

export class FeatureDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  iconUrl: string;
}
