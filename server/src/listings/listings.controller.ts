import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import { ListingsService } from "./listings.service";
import { CreateListingDto } from "../common/dtos/listings/create-listing.dto";
import { GetAllListingsDto } from "../common/dtos/listings/get-all-listings-dto";
import { IdValidationDto } from "../common/dtos/listings/id-validation.dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Listings")
@Controller("listings")
export class ListingsController {
  constructor(private readonly listingsService: ListingsService) {}

  @Post()
  async createListing(@Body() createListingDto: CreateListingDto) {
    return this.listingsService.createListing(createListingDto);
  }

  @Get()
  async getAllListings(@Query() query: GetAllListingsDto) {
    return this.listingsService.findAll(query);
  }

  @Get(":id")
  async getListingById(@Param() params: IdValidationDto) {
    return this.listingsService.findOne(params.id);
  }
}
