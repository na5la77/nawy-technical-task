import { Module } from '@nestjs/common';
import { ListingsService } from './listings.service';
import { ListingsController } from './listings.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Feature, FeatureSchema } from 'src/listings/schemas/feature.schema';
import { Listing, ListingSchema } from 'src/listings/schemas/listing.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Listing.name,
        schema: ListingSchema,
        collection:'listings',
      },
      {
        name: Feature.name,
        schema: FeatureSchema,
        collection:'features',
      },
    ],
  ),
  ],
  providers: [ListingsService],
  controllers: [ListingsController]
})
export class ListingsModule {}
