import { useState, useEffect } from 'react';
import { supabase } from '@/utils/supabase/client'; // Assuming this is where your supabase instance is
import { toast } from 'sonner';
// Import useRouter to access pathname
import Link from 'next/link';
import Image from 'next/image';
import { Bath, BedDouble, Home, LandPlot, MapPinIcon, Ruler, Share } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';

function Details() {
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);

  // Use next/router's useRouter hook to get access to the pathname
 const params = usePathname();
  const id = params.split("/")[2]; // Extract id from the URL path
  
  useEffect(() => {
    if (id) {
      getListingData(id);  // Fetch data only if the id is available
    }
  }, [id]);

  const getListingData = async (listingId) => {
    setLoading(true);  // Start loading

    // Fetch a specific listing by ID from the 'listing' table, including related 'listingImages' table
    const { data, error } = await supabase
      .from("listing")
      .select(`
        *,
        listingImages (
          listing_id,
          url
        )
      `)
      .eq("id", listingId);  // Filter by the listing ID

    setLoading(false);  // End loading

    if (data && data.length > 0) {
      setListing(data[0]);  // Set the fetched listing data
    } else {
      console.log("No data found or error:", error);
      toast("Listing not found or server error");
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Show a loading message while fetching data
  }

  if (!listing) {
    return <div>No listing found</div>; // Show a message if the listing doesn't exist
  }

  return (
    <div className="flex flex-wrap justify-center">
      <div key={listing.id} className="bg-white w-full m-3 shadow-lg rounded-lg">
        {listing.listingImages && listing.listingImages.length > 0 ? (
              <div className="flex flex-col gap-2 p-4">
                <div className='flex justify-between items-center px-10 gap-3'>
                <div>
                <h2 className="text-4xl font-semibold">${listing.price}</h2>
                <h2 className="flex gap-2 text-xl text-slate-500">
                  <MapPinIcon className="h-4 w-4" />
                  {listing.address}
                </h2>
                </div>
                <div>
                  <Button> <Share />  Share</Button>
                </div>
                </div>

                <hr />
                <div className=' mt-3'>
                  <h2 className='text-2xl px-8 font-bold'>Key Features</h2>
                </div>
            
              
 

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 m-3">
                <div className='w-[1200px] h-[80px] p-4 '>
                  <h2 className="flex gap-4 text-xm w-1/3 bg-purple-500 text-white uppercase justify-center rounded-md items-center p-4">
                    <Home /> {listing?.propertyType}
                  </h2>
                  </div>

                  <div className='w-[1200px] h-[80px] p-4 '>
                  <h2 className="flex gap-4 text-xl w-1/3 bg-purple-500 text-white  justify-center rounded-md items-center p-4">
                    <BedDouble /> {listing.bedroom}
                  </h2>
                  </div>


                  <div className='w-[1200px] h-[80px] p-4 '>
                  <h2 className="flex gap-4 text-xl w-1/3 bg-purple-500 text-white  justify-center rounded-md items-center p-4">
                    <Bath /> {listing?.bathroom}
                  </h2>
                  </div>

                  <div className='w-[1200px] h-[80px] p-4 '>
                  <h2 className="flex gap-4 text-xl w-1/3 bg-purple-500 text-white  justify-center rounded-md items-center p-4">
                    <Ruler /> Built in {listing?.builtIn} 
                  </h2>
                  </div>

                  <div className='w-[1200px] h-[80px] p-4 '>
                  <h2 className="flex gap-4 text-xl w-1/3 bg-purple-500 text-white  justify-center rounded-md items-center p-4">
                    <LandPlot /> {listing?.area} sq.unit
                  </h2>
                  </div>
                  


                </div>

                <hr />

                <div className='flex flex-col justify-start '>
                <h2 className='text-2xl font-bold px-6 mt-2'>Property Description</h2>
                <h2 className='text-sm font-extralight text-slate-500  px-6 mt-2'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut, in hic voluptatum nesciunt maiores dolore nemo expedita ex distinctio. Explicabo impedit velit inventore magni enim perferendis itaque dicta nam molestiae.
                Dignissimos, aspernatur, quasi dolores molestiae dolorem accusamus tenetur nihil repellat libero laboriosam soluta blanditiis, quaerat nisi aliquid. Cupiditate dolores aperiam laboriosam tenetur deleniti nisi eum illo sapiente nobis, excepturi nostrum.
       </h2>
                </div>
              </div>

        ) : (
          <div>
            <p>No image available for this listing.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Details;
