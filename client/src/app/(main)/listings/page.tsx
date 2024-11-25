"use client";
import { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { ListingCard } from "@/components/ListingCard";
import { PaginationControls } from "@/components/PaginationControls";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { ListingsFilter } from "@/types/interfaces/ListingFilter.interface";
import { UnitType } from "@/types/enums/UnitTypes.enum";
import { getListings } from "@/services/Listings.service";

export default function ListingsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [listings, setListings] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
    total: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState<ListingsFilter>({
    unit_name: "",
    unit_number: "",
    project: "",
  });
  const [error, setError] = useState<string | null>(null);

  const limit = 8;
  const page = Number(searchParams.get("page")) || 1;

  useEffect(() => {
    setFilters({
      unit_name: searchParams.get("unit_name") || "",
      unit_number: searchParams.get("unit_number") || "",
      project: searchParams.get("project") || "",
      unit_type: searchParams.get("unit_type") as UnitType | undefined,
    });
  }, [searchParams]);

  const fetchListings = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const cleanFilters: ListingsFilter = Object.fromEntries(
        Object.entries(filters).filter(([, v]) => v !== "" && v !== undefined),
      ) as ListingsFilter;

      const response = await getListings(page, limit, cleanFilters);

      if (!response || !response.listings || !response.pagination) {
        throw new Error("Invalid API response structure");
      }

      const { listings, pagination } = response;
      setListings(listings);
      setPagination(pagination);
    } catch (error) {
      console.error(
        "Error fetching listings:",
        error?.message || error,
        error?.stack,
      );
      setError("Failed to load listings. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }, [filters, page]);

  useEffect(() => {
    fetchListings();
  }, [fetchListings]);

  const handleFilterChange = (name: keyof ListingsFilter, value: string) => {
    const newFilters = {
      ...filters,
      [name]: value === "All" ? undefined : value,
    };
    setFilters(newFilters);

    const params = new URLSearchParams(searchParams);
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });
    params.set("page", "1");
    router.push(`/listings?${params.toString()}`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        params.append(key, value);
      }
    });
    params.set("page", "1");
    router.push(`/listings?${params.toString()}`);
  };


  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-start mb-8 gap-5 ">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
          Real Estate Listings
        </h1>
        <div className="rounded-lg text-lg sm:text-xl font-bold text-foreground bg-muted px-4 py-2">
          {isLoading ? <Skeleton className="w-8 h-6" /> : pagination.total}
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mb-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4"
      >
        <Input
          name="unit_name"
          placeholder="Unit Name"
          value={filters.unit_name || ""}
          onChange={(e) => handleFilterChange("unit_name", e.target.value)}
        />
        <Input
          name="unit_number"
          placeholder="Unit Number"
          value={filters.unit_number || ""}
          onChange={(e) => handleFilterChange("unit_number", e.target.value)}
        />
        <Input
          name="project"
          placeholder="Project"
          value={filters.project || ""}
          onChange={(e) => handleFilterChange("project", e.target.value)}
        />
        <Select
          name="unit_type"
          value={filters.unit_type || "All"}
          onValueChange={(value) => handleFilterChange("unit_type", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Unit Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Types</SelectItem>
            <SelectItem value="Villa">Villa</SelectItem>
            <SelectItem value="Apartment">Apartment</SelectItem>
            <SelectItem value="Duplex">Duplex</SelectItem>
          </SelectContent>
        </Select>
      </form>

      {error && <p className="text-red-500 text-center">{error}</p>}

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(limit)].map((_, index) => (
            <Skeleton key={index} className="h-[300px] w-full" />
          ))}
        </div>
      ) : listings.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {listings.map((listing) => (
            <ListingCard key={listing._id} listing={listing} />
          ))}
        </div>
      ) : (
        <div className="items-center justify-center flex flex-col-reverse gap-5 text-center text-gray-500 mt-16 p-20">
          <p className="text-lg">No listings found.</p>
          <Image
            src="/images/no-result.png"
            alt="No results"
            width={200}
            height={200}
            className="bg-muted rounded-xl p-5 "
          />
        </div>
      )}

      {pagination.totalPages > 1 && (
        <div className="mt-8">
          <PaginationControls
            currentPage={pagination.page}
            totalPages={pagination.totalPages}
          />
        </div>
      )}
    </div>
  );
}
