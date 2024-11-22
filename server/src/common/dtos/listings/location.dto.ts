import { IsString, IsNotEmpty } from "class-validator";

export class LocationDto {
    @IsString()
    @IsNotEmpty()
    address: string;
  
    @IsString()
    @IsNotEmpty()
    city: string;
  
    @IsString()
    @IsNotEmpty()
    state: string;
  }