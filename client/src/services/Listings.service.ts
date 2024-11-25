import { ListingsFilter } from "@/types/interfaces/ListingFilter.interface";
import { ListingDetailsResponse } from "@/types/response/ListingDetailsResponse.interface";
import { ListingsResponse } from "@/types/response/ListingsResponse.interface";

const API_URL =
  process.env.NEXT_PUBLIC_DOCKER === "TRUE"
    ? process.env.NEXT_PUBLIC_SERVER_URL_DOCKER
    : process.env.NEXT_PUBLIC_SERVER_URL;

export async function getListings(
  page: number = 1,
  limit: number = 8,
  filters: ListingsFilter = {},
): Promise<ListingsResponse> {
  const queryParams = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    ...Object.entries(filters).reduce(
      (acc, [key, value]) => {
        if (value) acc[key] = value.toString();
        return acc;
      },
      {} as Record<string, string>,
    ),
  });

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/listings?${queryParams}`,
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch listings: ${response.statusText}`);
  }

  return response.json();
}

export async function getListing(id: string): Promise<ListingDetailsResponse> {
  const response = await fetch(`${API_URL}/listings/${id}`);

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("Listing not found");
    }
    throw new Error(`Failed to fetch listing: ${response.statusText}`);
  }

  return response.json();
}
