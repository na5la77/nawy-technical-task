import {  Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { UnitType } from "../enums/unit-type.enum";
import { Document } from 'mongoose';
import { LocationDto } from "../../common/dtos/listings/location.dto";
import { FeatureDto } from "../../common/dtos/listings/feature.dto";


@Schema()
export class Listing extends Document {
  @Prop({ unique: true, required: true, lowercase: true  })
  unit_name: string;

  @Prop({required: true})
  unit_number: string;

  @Prop({ enum: UnitType, required: true })
  unit_type: UnitType;

  @Prop({ required: true, min: 0 })
  bedrooms: number;

  @Prop({ required: true, min: 0 })
  bathrooms: number;

  @Prop()
  description: string;

  @Prop({ required: true, min: 0 })
  price: number;
  @Prop({ required: true})
  project: string;

  @Prop({
    type: LocationDto,
    _id: false,
    required: true,
  })
  location: LocationDto;

  @Prop({ type: [String] })
  images: string[];

  @Prop({ type: [FeatureDto], _id: false })
  features: FeatureDto[];
}

export const ListingSchema = SchemaFactory.createForClass(Listing);

