import {ListingItem} from "@/types/interfaces/ListingItem.interface";
import {Feature} from "@/types/interfaces/feature.interface";
import {User} from "@/types/interfaces/User.interface";

export interface ListingDetailsResponse extends ListingItem {
    features:Feature[],
    description:string,
    user:User
}
