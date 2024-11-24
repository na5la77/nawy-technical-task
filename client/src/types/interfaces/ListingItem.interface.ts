import { UnitType } from "@/types/enums/UnitTypes.enum";

export interface ListingItem {
  _id: string;
  unit_name: string;
  unit_number: string;
  unit_type: UnitType;
  bedrooms: number;
  bathrooms: number;
  price: number;
  project: string;
  size?: number;
  location: {
    address: string;
    city: string;
    state: string;
  };
  images: string[];
}
