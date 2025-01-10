"use client";
import React, { useEffect, useState } from "react";
import Listing from "./Listing";
import { supabase } from "@/utils/supabase/client";
import { toast } from "sonner";
import Hero from '../../public/hero.webp';
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { PillIcon } from "lucide-react";
const ZillowLoanCard = () => {
  return (
    <div className="max-w-md mx-auto">
      {/* Main Card */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 mb-4">
        {/* Logo */}
        <div className="mb-6 flex gap-2 items-center">
          <PillIcon className="h-8"/><h2 className="font-semibold text-primary">Calculate Home Loans </h2>
        </div>

        {/* Top Row */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <div className="text-2xl font-bold mb-1">$ - -</div>
            <div className="text-sm text-gray-600">Suggested target price</div>
          </div>
          <div>
            <div className="text-2xl font-bold mb-1">$ - -</div>
            <div className="text-sm text-gray-600">BuyAbility℠</div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-3 gap-4">
          <div>
            <div className="text-2xl font-bold mb-1">$ - -</div>
            <div className="text-sm text-gray-600">Mo. payment</div>
          </div>
          <div>
            <div className="text-2xl font-bold mb-1">- - %</div>
            <div className="text-sm text-gray-600">Today's rate</div>
          </div>
          <div>
            <div className="text-2xl font-bold mb-1">- - %</div>
            <div className="text-sm text-gray-600">APR</div>
          </div>
        </div>
      </div>

      {/* Button */}
      <button className="w-full bg-primary text-white py-4 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
        Let's get started
      </button>
    </div>
  );
};



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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
      <div>
        <Listing
        listing={listing} 
        handleSearch={handleSearch} 
        setAddress={setAddress}
        handleFilterChange={handleFilterChange}
        />
      </div>
      <div className="flex flex-col gap-4 mt-10 items-center">
        <h2 className="text-2xl text-left font-extrabold">Get home recommendations</h2> {/* Placeholder for the Map */}
        <h2 className="text-xl text-left font-light text-gray-500">
  Sign in for a more personalized experience.
</h2>
<Button variant = 'outline' className='border-2 border-blue-500 text-blue-500 font-bold'> Sign in </Button>
        <Image
        src={Hero}
        alt="hero image"
        width={500}
        height={400}
        />

        <div className="mt-4 flex flex-col justify-center items-center">

          <h2 className="text-xl  text-left font-extrabold">Find homes you can afford with BuyAbility℠</h2>
          <h2 className="text-sm text-left mb-4 font-light text-gray-500" >Answer a few questions. We'll highlight homes you're likely to qualify for.</h2>
      <ZillowLoanCard/>
        </div>
      </div>
    </div>
  );
}

export default ListingMapView;
