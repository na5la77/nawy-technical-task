import { IsMongoId } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class IdValidationDto {
  @ApiProperty({
    required: true,
    description: "The Mongo ID field is required",
  })
  @IsMongoId({ message: "The provided ID is not a valid MongoDB ObjectId" })
  id: string;
}
