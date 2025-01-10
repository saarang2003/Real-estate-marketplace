import React, { useState, useEffect } from "react";
import FilterSection from "./FilterSection";
import { MapPinIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";


function Listing({ listing }) {
  const [data, setData] = useState(listing);
  const [filteredData, setFilteredData] = useState(listing);
  const [filters, setFilters] = useState({
    priceRange: [0, 1000000],
    bedrooms: 'all',
    bathrooms: 'all',
    parking: 'all',
    propertyType: 'all',
  });

  useEffect(() => {
    // Debug log to check initial data
    console.log('Initial data length:', listing?.length);
    console.log('Initial data:', listing);
    setData(listing);
  }, [listing]);

  useEffect(() => {
    const filtered = filterListings(data);
    console.log('Filtered data length:', filtered?.length);
    setFilteredData(filtered);
  }, [filters, data]);

  const handleFilterChange = (newFilters) => {
    console.log('New filters:', newFilters);
    setFilters(newFilters);
  };

  const filterListings = (listings) => {
    if (!listings) return [];
    
    return listings.filter((listing) => {
      // Debug log for each listing being filtered
      console.log('Processing listing:', listing);

      const price = Number(listing.price);
      const bedroom = Number(listing.bedroom);
      const bathroom = Number(listing.bathroom);
      const parking = Number(listing.parking);
      const type = listing.propertyType?.toLowerCase();

      // Log the actual values being compared
      console.log(`Comparing - Price: ${price}, Bedrooms: ${bedroom}, Bathrooms: ${bathroom}, Parking: ${parking}, Type: ${type}`);
      console.log(`Against filters:`, filters);

      const priceValid = price >= filters.priceRange[0] && price <= filters.priceRange[1];
      const bedroomsValid = filters.bedrooms === 'all' || bedroom === Number(filters.bedrooms);
      const bathroomsValid = filters.bathrooms === 'all' || bathroom === Number(filters.bathrooms);
      const parkingValid = filters.parking === 'all' || parking === Number(filters.parking);
      const typeValid = filters.propertyType === 'all' || type === filters.propertyType.toLowerCase();

      // Log which conditions passed/failed
      console.log('Filter results:', {
        priceValid,
        bedroomsValid,
        bathroomsValid,
        parkingValid,
        typeValid
      });

      return priceValid && bedroomsValid && bathroomsValid && parkingValid && typeValid;
    });
  };

  
  

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Listing Component</h1>

      {/* Filter Section */}
      <FilterSection onFilterChange={handleFilterChange} />

      <h2 className="text-xl font-semibold mt-3">Found {filteredData.length} results</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-4">
        {filteredData.length === 0 ? (
          <div>No listings found</div> // Show message if no listings match filters
        ) : (
          filteredData.map((item, index) => (
            <div key={index} className="bg-white w-full m-3 shadow-lg rounded-lg">
              {item.listingImages && item.listingImages.length > 0 ? (
                <Link href={'/view-listing/' + item.id}>
                  <Image
                    src={item.listingImages[0].url}
                    alt={`Listing Image ${index + 1}`}
                    width={800}
                    height={150}
                    className="object-cover rounded-t-lg w-full h-[200px]"
                  />
                  <div className="flex flex-col gap-2 p-4">
                    <h2 className="text-xl font-semibold">${item.price}</h2>
                    <h2 className="flex gap-2 text-slate-500">
                      <MapPinIcon className="h-4 w-4" />
                      {item.address}
                    </h2>
                    <div className="flex gap-2 mt-2">
                      <h2 className="flex gap-2 text-sm w-1/3 bg-slate-200 justify-center rounded-md items-center p-2">
                        {item.bedroom} Bed
                      </h2>
                      <h2 className="flex gap-2 text-sm w-1/3 bg-slate-200 justify-center rounded-md items-center p-2">
                        {item.bathroom} Bath
                      </h2>
                      <h2 className="flex gap-2 text-sm w-1/3 bg-slate-200 justify-center rounded-md items-center p-2">
                        {item.parking} Parking
                      </h2>
                    </div>
                  </div>
                </Link>
              ) : (
                <div key={index}>
                  <p>No image available for this listing.</p>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Listing;
