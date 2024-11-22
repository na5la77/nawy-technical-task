import { Pagination } from './pagination.model';
import {Listing} from "../schemas/listing.schema";

export class GetAllListingsResponse {
  listings: Listing[];
  pagination: Pagination;
}
