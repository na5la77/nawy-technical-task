"use client";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bath, Bed, MapPin, Proportions } from "lucide-react";
import { ListingItem } from "@/types/interfaces/ListingItem.interface";

interface ListingCardProps {
  listing: ListingItem;
}

export function ListingCard({ listing }: ListingCardProps) {
  return (
    <Link href={`/listings/${listing._id}`} className="block h-full">
      <Card className="w-full h-full overflow-hidden flex flex-col justify-between items-stretch transition-shadow duration-800 ease-in-out hover:shadow-lg dark:hover:shadow-primary/25">
        <div className="relative h-48">
          <Image
            src={listing.images[0]}
            alt={listing.unit_name}
            layout="fill"
            objectFit="cover"
          />
        </div>
        <CardContent className="p-4 flex flex-col flex-grow">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-foreground capitalize">
                {listing.unit_name}
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground">
                {listing.unit_number}
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground">
                {listing.project}
              </p>
            </div>
            <Badge variant="secondary" className="text-xs sm:text-sm">
              {listing.unit_type}
            </Badge>
          </div>
          <div className="flex items-center space-x-4 mb-2">
            <div className="flex items-center">
              <Bed className="w-4 h-4 mr-1 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {listing.bedrooms}
              </span>
            </div>
            <div className="flex items-center">
              <Bath className="w-4 h-4 mr-1 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {listing.bathrooms}
              </span>
            </div>
            <div className="flex items-center">
              <Proportions className="w-4 h-4 mr-1 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {" "}
                {listing.size ?? 25}m&sup2;
              </span>
            </div>
          </div>
          <div className="flex items-start mb-2 flex-grow">
            <MapPin className="w-4 h-4 mr-1 mt-1 flex-shrink-0 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">{`${listing.location.address}, ${listing.location.city}, ${listing.location.state}`}</p>
          </div>
        </CardContent>
        <CardFooter className="bg-muted p-4">
          <p className="text-lg sm:text-xl font-bold text-foreground">
            ${listing.price.toLocaleString()}
          </p>
        </CardFooter>
      </Card>
    </Link>
  );
}
