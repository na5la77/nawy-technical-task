import { IsString, IsNotEmpty, IsAlpha } from "class-validator";

export class FeatureDto {
  @IsString()
  @IsNotEmpty()
  @IsAlpha()
  name: string;

  @IsString()
  @IsNotEmpty()
  iconUrl: string;
}
