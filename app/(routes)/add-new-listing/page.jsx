'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';  // Import dynamic from Next.js
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { supabase } from '@/utils/supabase/client'; 
import { useUser } from '@clerk/nextjs';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';


const MapSearch = dynamic(() => import('@/components/MapSearch'), { ssr: false });


// Fix marker icon issue with React-Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const AddNewListing = () => {
  const { user } = useUser();
  const [position, setPosition] = useState({ lat: 51.505, lng: -0.09 });

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
    <div>
      <h1>Add New Listing</h1>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="address">Address:</label>
          <input type="text" id="address" name="address" placeholder="Enter address" required />
        </div>

        {/* Dynamically loaded map component */}
        <MapSearch setPosition={setPosition} position={position} />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddNewListing;
