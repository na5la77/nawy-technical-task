import { ListingItem } from "@/types/interfaces/ListingItem.interface";

export interface ListingsResponse {
  listings: ListingItem[];
  pagination: {
    limit: number;
    page: number;
    total: number;
    totalPages: number;
  };
}
