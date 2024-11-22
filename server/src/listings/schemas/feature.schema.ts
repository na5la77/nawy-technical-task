import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Feature extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  iconUrl: string;
}

export const FeatureSchema = SchemaFactory.createForClass(Feature);

FeatureSchema.index({ name: 1, iconUrl: 1 }, { unique: true });
