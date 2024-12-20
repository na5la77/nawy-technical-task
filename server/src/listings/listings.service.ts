import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Listing } from "./schemas/listing.schema";
import { CreateListingDto } from "../common/dtos/listings/create-listing.dto";
import { Feature } from "./schemas/feature.schema";
import { Pagination } from "./models/pagination.model";
import { GetAllListingsResponse } from "./models/get-all-listing-response.model";
import { ListingsFilter } from "./models/get-listings-filter.model";
import { GetAllListingsDto } from "../common/dtos/listings/get-all-listings-dto";

@Injectable()
export class ListingsService {
  constructor(
    @InjectModel(Listing.name) private readonly listingModel: Model<Listing>,
    @InjectModel(Feature.name) private readonly featureModel: Model<Feature>,
  ) {}

  async createListing(createListingDto: CreateListingDto): Promise<Listing> {
    const { features, ...listingData } = createListingDto;

    const featureObjects = await this.featureModel
      .find({ _id: { $in: features } })
      .exec();
    if (featureObjects.length !== features.length) {
      throw new BadRequestException("Some features do not exist");
    }

    const newListing = new this.listingModel({
      ...listingData,
      features: featureObjects,
    });

    try {
      return await newListing.save();
    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException(
          "A listing with this name already exists",
        );
      }

      throw new InternalServerErrorException("Failed to create listing");
    }
  }

  async findAll(query: GetAllListingsDto): Promise<GetAllListingsResponse> {
    const parsedPage = parseInt(query.page, 10) || 1;
    const parsedLimit = parseInt(query.limit, 10) || 10;

    const skip = (parsedPage - 1) * parsedLimit;
    const filterQuery = { ...query };
    delete filterQuery.page;
    delete filterQuery.limit;
    const filters = this.buildFilters(filterQuery);

    const [listings, total] = await Promise.all([
      this.listingModel
        .find(filters)
        .select(
          "unit_name unit_number unit_type bedrooms bathrooms price location images project",
        )
        .skip(skip)
        .limit(parsedLimit)
        .exec(),
      this.listingModel.countDocuments(filters),
    ]);

    const totalPages = Math.ceil(total / parsedLimit);

    const pagination: Pagination = {
      limit: parsedLimit,
      page: parsedPage,
      total,
      totalPages,
    };

    return { listings, pagination };
  }

  async findOne(id: string): Promise<Listing> {
    const listing = await this.listingModel.findById(id).exec();
    if (!listing) {
      throw new NotFoundException(`Listing with ID "${id}" not found`);
    }
    return listing;
  }

  private buildFilters(query: GetAllListingsDto): ListingsFilter {
    const filters: ListingsFilter = {};
    Object.entries(query).forEach(([key, value]) => {
      filters[key] = new RegExp(value, "i");
    });
    return filters;
  }
}
