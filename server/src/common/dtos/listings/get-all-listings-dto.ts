import {IsOptional, IsString, IsInt, Min, IsAlpha, IsEnum} from 'class-validator';
import {UnitType} from "../../../listings/enums/unit-type.enum";

export class GetAllListingsDto {
  @IsOptional()
  @IsString()
  unit_name?: string;

  @IsString()
  @IsOptional()
  unit_number: string;

  @IsEnum(UnitType)
  @IsOptional()
  unit_type: UnitType;

  @IsOptional()
  @IsString()
  @IsAlpha()
  project?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  page?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  limit?: number;

 
}
