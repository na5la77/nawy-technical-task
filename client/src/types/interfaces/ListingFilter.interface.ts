import { UnitType } from "@/types/enums/UnitTypes.enum";

export interface ListingsFilter {
  unit_name?: string;
  unit_number?: string;
  project?: string;
  unit_type?: UnitType;
}
