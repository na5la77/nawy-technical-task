import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class LocationDto {
  @ApiProperty({
    description: "The address of the location",
    example: "O West Zayed Phase 2, Giza, Egypt",
  })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({
    description: "The city of the location",
    example: "Zayed",
  })
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty({
    description: "The state of the location",
    example: "Giza",
  })
  @IsString()
  @IsNotEmpty()
  state: string;
}
