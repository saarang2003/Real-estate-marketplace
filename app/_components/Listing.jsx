import { Bath, BedDouble, MapPin, MapPinIcon, Ruler } from "lucide-react";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import FilterSection from "./FilterSection";
import Link from "next/link";

function Listing({ listing, handleSearch, setAddress , handleFilterChange }) {
  const [loading, setLoading] = useState(true); // State to manage loading
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // State to hold the search term

  // Simulate fetching data (replace with real API call)
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setData(listing); // Assuming listing is passed as a prop or fetched
      setLoading(false);
    }, 2000); // Simulating a 2-second delay to fetch data
  }, [listing]);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(searchTerm);
  };

  // Filter the listings based on the search term
  const filteredData = data.filter((item) =>
    item.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Listing Component</h1>
      <form
        className="flex px-2 items-center gap-2"
        onSubmit={handleSubmit}
      >
        <label htmlFor="address" className="flex items-center">
          <MapPin width={30} height={30} />
        </label>
        <input
          type="text"
          placeholder="Enter your location"
          className="w-[500px] border-2 border-gray-300 rounded-lg shadow-sm p-2 px-2"
          value={searchTerm}
          onChange={handleInputChange}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white rounded-lg shadow-lg font-semibold p-2"
        >
          Search
        </button>
      </form>

      <div className="mt-4 px-4">
      <FilterSection onFilterChange={handleFilterChange} />
      </div>

      <div>
        <h2 className="text-xl font-semibold px-4 mt-3">Found <span className="text-primary">{filteredData.length} results</span></h2>
      </div>


      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {loading ? (
          <div>Loading...</div>
        ) : (
          // Render real content once data is fetched
          filteredData.map((item, index) => (
            <div key={index} className="bg-white w-full m-3 shadow-lg rounded-lg">
              {item.listingImages && item.listingImages.length > 0 ? (
                <div>
                  <Link href={'view-listing/'+item.id}>
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
                        <BedDouble /> {item.bedroom}
                      </h2>
                      <h2 className="flex gap-2 text-sm w-1/3 bg-slate-200 justify-center rounded-md items-center p-2">
                        <Bath /> {item.bathroom}
                      </h2>
                      <h2 className="flex gap-2 text-sm w-1/3 bg-slate-200 justify-center rounded-md items-center p-2">
                        <Ruler /> {item.builtIn}
                      </h2>
                    </div>
                  </div>
                  </Link>
                </div>
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
