"use client";
import React, { useEffect, useState } from "react";
import Listing from "./Listing";
import { supabase } from "@/utils/supabase/client";
import { toast } from "sonner";

function ListingMapView({ type }) {
  const [listing, setListing] = useState([]); // Holds the fetched listings
  const [loading, setLoading] = useState(true); // Track loading state
  const [setAddress, setSetAddress] = useState([]);

  const getListingData = async () => {
    setLoading(true); // Start loading

    console.log("Fetching listings for type:", type); // Log type prop

    const { data, error } = await supabase.from("listing").select(`
    *,
    listingImages (
      listing_id :listing_id,
      url : url
    )
  `);
    setLoading(false); // End loading

    console.log("Query Result:", data); // Log data to see what comes back
    console.log("Error:", error); // Log any error

    if (data && data.length > 0) {
      setListing(data);
      console.log("Fetched Listings:", data);
    } else {
      console.log("No data found or error:", error);
      toast("No listings found or server error");
    }
  };

  const handleSearch = async () => {
    const { data, error } = await supabase.from("listing").select(`
      *,
      listingImages (
        listing_id :listing_id,
        url : url
      )
    `);

    if (data && data.length > 0) {
      setListing(data);
      console.log("Fetched Listings:", data);
    } else {
      console.log("No data found or error:", error);
      toast("No listings found or server error");
    }
  };

  const handleFilterChange = async (filters) => {
    let query = supabase.from("listing").select(`
        *,
        listingImages (
          listing_id,
          url
        )
      `);

    // Add filter conditions
    if (filters.priceRange) {
      query = query
        .gte("price", filters.priceRange[0])
        .lte("price", filters.priceRange[1]);
    }

    if (filters.bedrooms && filters.bedrooms !== "all") {
      query = query.eq("bedroom", filters.bedrooms);
    }

    if (filters.bathrooms && filters.bathrooms !== "all") {
      query = query.eq("bathroom", filters.bathrooms);
    }

    if (filters.propertyType && filters.propertyType !== "all") {
      query = query.eq("propertyType", filters.propertyType);
    }

    const { data, error } = await query;

    if (data && data.length > 0) {
      setListing(data);
    } else {
      console.log("No data found or error:", error);
      toast("No listings found matching your filters");
    }
  };

  useEffect(() => {
    getListingData();
  }, [type]); // Re-fetch data when the type prop changes

  if (loading) {
    return <div>Loading...</div>; // Show loading state while fetching
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-2 border-red-500">
      <div>
        <Listing
        listing={listing} 
        handleSearch={handleSearch} 
        setAddress={setAddress}
        handleFilterChange={handleFilterChange}

        />
      </div>
      <div>
        <h2>Map</h2> {/* Placeholder for the Map */}
      </div>
    </div>
  );
}

export default ListingMapView;
