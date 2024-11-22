import { UnitType } from "../enums/unit-type.enum";

export class ListingsFilter {
  unit_name?: RegExp;
  unit_number?: string;
  project?: string;
  unit_type?: UnitType;
}
