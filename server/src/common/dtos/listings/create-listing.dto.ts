import {
  IsEnum,
  IsInt,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";
import { UnitType } from "../../../listings/enums/unit-type.enum";
import { LocationDto } from "./location.dto";

export class CreateListingDto {
  @IsString()
  @IsNotEmpty()
  unit_name: string;

  @IsString()
  @IsNotEmpty()
  unit_number: string;

  @IsEnum(UnitType)
  @IsNotEmpty()
  unit_type: UnitType;

  @IsInt()
  @Min(0)
  @IsNotEmpty()
  bedrooms: number;

  @IsInt()
  @Min(0)
  @IsNotEmpty()
  bathrooms: number;

  @IsOptional()
  @IsString()
  description?: string;

  @Min(0)
  @IsInt()
  @IsNotEmpty()
  price: number;

  @IsString()
  @IsNotEmpty()
  project: string;

  @ValidateNested()
  @Type(() => LocationDto)
  @IsNotEmpty()
  location: LocationDto;

  @IsOptional()
  @IsString({ each: true })
  images?: string[];

  @IsMongoId({ each: true })
  @IsNotEmpty({ message: "Features ID's are required" })
  features: string[];
}
