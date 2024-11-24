import {
  IsEnum,
  IsInt,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Min,
  ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";
import { UnitType } from "../../../listings/enums/unit-type.enum";
import { LocationDto } from "./location.dto";
import { UserDto } from "./user.dto";
import { ApiProperty } from "@nestjs/swagger";

export class CreateListingDto {
  @ApiProperty({
    required: true,
    description: "The name of the listing",
    example: "luxury villa23",
  })
  @IsString()
  @IsNotEmpty()
  unit_name: string;

  @ApiProperty({
    required: true,
    description: "The unit number of the listing",
    type: "string",
    example: "V123",
  })
  @IsString()
  @IsNotEmpty()
  unit_number: string;

  @ApiProperty({
    required: true,
    description: "The unit type of the listing",
    enum: UnitType,
    type: "string",
  })
  @IsEnum(UnitType)
  @IsNotEmpty()
  unit_type: UnitType;

  @ApiProperty({
    required: true,
    description: "The number of bedrooms of the listing",
    type: "number",
    minimum: 1,
  })
  @IsInt()
  @Min(1)
  @IsNotEmpty()
  bedrooms: number;

  @ApiProperty({
    required: true,
    description: "The number of bathrooms of the listing",
    type: "number",
    minimum: 1,
  })
  @IsInt()
  @Min(1)
  @IsNotEmpty()
  bathrooms: number;
  @ApiProperty({
    required: true,
    description: "The size in m^2 of the listing",
    type: "number",
    minimum: 20,
  })
  @IsInt()
  @Min(20)
  @IsNotEmpty()
  size: number;

  @ApiProperty({
    required: false,
    description: "The description of the listing",
    type: "string",
    example:
      "A wonderful Villa with exceptional views on the pools, with also incredible finishing and furnishing",
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    required: true,
    description: "The price of the listing",
    type: "number",
    minimum: 1,
  })
  @Min(1)
  @IsInt()
  @IsNotEmpty()
  price: number;

  @ApiProperty({
    required: true,
    description: "The project of the listing",
    type: "string",
    example: "O West",
  })
  @IsString()
  @IsNotEmpty()
  project: string;

  @ApiProperty({
    required: true,
    description: "The location of the listing",
    type: LocationDto,
  })
  @ValidateNested()
  @Type(() => LocationDto)
  @IsNotEmpty()
  location: LocationDto;

  @ApiProperty({
    required: false,
    description: "The images of the listing",
    type: [String],
    example: [
      "https://i.ibb.co/VWjXSPg/bloomfields-1.png",
      "https://i.ibb.co/2cqq5Rb/bloomfields-2.png",
      "https://i.ibb.co/DC3fTCD/bloomfields-3.png",
    ],
  })
  @IsOptional()
  @IsString({ each: true })
  @IsUrl({}, { each: true, message: "Please enter valid Url" })
  images?: string[];

  @ApiProperty({
    required: true,
    description: "Valid ID's of features of the listing",
    type: [String],
    example: ["673fdb884eefe888370e761d", "673fdb884eefe888370e7621"],
  })
  @IsMongoId({ each: true })
  @IsNotEmpty({ message: "Features ID's are required" })
  features: string[];

  @ApiProperty({
    required: true,
    description: "The owner of the listing",
    type: UserDto,
    example: {
      name: "Shadi",
      email: "shadi@test.com",
      phoneNumber: "+201208433113",
    },
  })
  @ValidateNested()
  @Type(() => UserDto)
  @IsNotEmpty()
  user: UserDto;
}
