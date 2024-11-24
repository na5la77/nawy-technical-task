import { IsEmail, IsNotEmpty, IsString, Matches } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UserDto {
  @ApiProperty({
    description: "The name of the user",
    example: "Shadi Nakhla",
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: "The email address of the user",
    example: "shadi.nakhla@example.com",
  })
  @IsEmail({}, { message: "Please enter a valid email address" })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description:
      "The phone number of the user. Must be a valid Egyptian phone number starting with +20.",
    example: "+201234567890",
  })
  @Matches(/^((\+20|0020)?1[0-9]{9})$/, {
    message: "Please enter a valid Egyptian phone number starting with +20",
  })
  @IsString()
  @IsNotEmpty()
  phoneNumber: string;
}
