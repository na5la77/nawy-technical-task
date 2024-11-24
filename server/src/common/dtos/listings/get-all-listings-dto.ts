import { IsEnum, IsOptional, IsString, Matches } from "class-validator";
import { UnitType } from "../../../listings/enums/unit-type.enum";
import { ApiProperty } from "@nestjs/swagger";

export class GetAllListingsDto {
  @ApiProperty({
    required: false,
    description: "The name of the listing",
    example: "luxury villa23",
  })
  @IsOptional()
  @IsString()
  unit_name?: string;

  @ApiProperty({
    required: false,
    description: "The unit number of the listing",
    type: "string",
    example: "V123",
  })
  @IsOptional()
  @IsString()
  unit_number?: string;

  @ApiProperty({
    required: false,
    description: "The unit type of the listing",
    enum: UnitType,
    type: "string",
  })
  @IsEnum(UnitType, {
    message: "The allowed unit_types are ['Villa','Duplex','Apartment']",
  })
  @IsOptional()
  unit_type?: UnitType;

  @ApiProperty({
    required: false,
    description: "The project of the listing",
    type: "string",
    example: "O West",
  })
  @IsOptional()
  @IsString()
  project?: string;

  @ApiProperty({
    required: false,
    description: "The required page of the listings",
    pattern: "^\\d+$",
    type: "string",
  })
  @IsOptional()
  @Matches(/^\d+$/, { message: "page must contain only digits" })
  page?: string;

  @ApiProperty({
    required: false,
    description: "The required limit for each page of the listings",
    pattern: "^\\d+$",
    type: "string",
  })
  @IsOptional()
  @Matches(/^\d+$/, { message: "limit must contain only digits" })
  limit?: string;
}
