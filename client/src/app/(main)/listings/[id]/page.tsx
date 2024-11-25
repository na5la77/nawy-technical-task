import { notFound } from "next/navigation";
import { Bath, Bed, Check, MapPin, Proportions } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getListing } from "@/services/Listings.service";
import { ListingDetailsResponse } from "@/types/response/ListingDetailsResponse.interface";
import { ImageNavigation } from "@/components/ImageNavigation";

export const revalidate = 3600;

async function fetchListing(id: string): Promise<ListingDetailsResponse> {
  try {
    return await getListing(id);
  } catch (err) {
    console.error("Error fetching listing:", err);
    notFound();
  }
}

export default async function ListingPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;

  const listing = await fetchListing(id);

  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-foreground capitalize">
        {listing.unit_name}
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <ImageNavigation images={listing.images} />
        </div>
        <div>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
            <p className="text-xl sm:text-2xl font-bold mb-2 sm:mb-0 text-foreground">
              ${listing.price.toLocaleString()}
            </p>
            <Badge variant="secondary" className="text-base sm:text-lg">
              {listing.unit_type}
            </Badge>
          </div>
          <p className="text-muted-foreground mb-4">{`Unit Number: ${listing.unit_number}`}</p>
          <p className="text-muted-foreground mb-4">{`Project: ${listing.project}`}</p>

          <div className="flex items-center space-x-4 mb-4">
            <div className="flex items-center">
              <Bed className="w-5 h-5 mr-2 text-muted-foreground" />
              <span className="text-foreground">
                {listing.bedrooms} Bedrooms
              </span>
            </div>
            <div className="flex items-center">
              <Bath className="w-5 h-5 mr-2 text-muted-foreground" />
              <span className="text-foreground">
                {listing.bathrooms} Bathrooms
              </span>
            </div>
            <div className="flex items-center">
              <Proportions className="w-5 h-5 mr-2 text-muted-foreground" />
              <span className="text-foreground">
                {" "}
                {listing.size ?? 25}m&sup2;
              </span>
            </div>
          </div>
          <div className="flex items-start mb-6">
            <MapPin className="w-5 h-5 mr-2 mt-1 flex-shrink-0 text-muted-foreground" />
            <p className="text-foreground">{`${listing.location.address}, ${listing.location.city}, ${listing.location.state}`}</p>
          </div>
          <p className="text-foreground mb-6">{listing.description}</p>
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Features</h2>
            <div className="grid grid-cols-2 gap-2">
              {listing.features.map((feature) => (
                <div key={feature._id} className="flex items-center gap-3">
                  <Check />
                  <span>{feature.name}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-muted p-4 rounded-lg mb-6">
            <h2 className="text-lg font-semibold mb-2">Contacts</h2>
            <p>
              <strong>Name:</strong> {listing.user.name}
            </p>
            <p>
              <strong>Email:</strong> {listing.user.email}
            </p>
            <p>
              <strong>Phone:</strong> {listing.user.phoneNumber}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
