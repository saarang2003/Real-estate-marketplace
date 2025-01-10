'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';  // Import dynamic from Next.js
import { useUser } from '@clerk/nextjs';
import { supabase } from '@/utils/supabase/client'; 
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

// Dynamically import MapSearch component to avoid SSR issues
const MapSearch = dynamic(() => import('../../_components/MapSearch'), { ssr: false });

const AddNewListing = () => {
  const { user } = useUser();
  const [position, setPosition] = useState({ lat: 51.505, lng: -0.09 });

  // Fix marker icon issue only on the client side (inside useEffect)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Fix Leaflet marker icon issue on the client side
      import('leaflet').then(L => {
        delete L.Icon.Default.prototype._getIconUrl;
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
          iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
          shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
        });
      });
    }
  }, []);  // Empty array to run only once when the component mounts

  // Handle form submission to create a new listing
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase
      .from('listing')
      .insert([
        {
          address: e.target.address.value,
          coordinates: position,  // Using the position selected on the map
          createdBy: user?.primaryEmailAddress?.emailAddress,
        },
      ])
      .select();

    if (data) {
      toast("Successfully added new location");
    } else {
      toast("Error: " + error.message);
    }
  };

  return (


    <div className=' p-10 flex flex-col gap-5 justify-center items-center'>
    <h2 className='font-bold text-3xl'>Add New Listing </h2>
    <div>
      <h2 className='text-gray-500'>Enter Address which you want to List</h2>
    </div>

    <div className='w-[1100px] border-2 rounded-lg shadow-lg'>


        {/* Dynamically loaded map component */}
        <MapSearch setPosition={setPosition} position={position} />
    </div>
    </div>

  );
};

export default AddNewListing;
