'use client';

import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { supabase } from '@/utils/supabase/client'; // Ensure your supabase client is properly set up
import { useUser } from '@clerk/nextjs';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

// Fix marker icon issue with React-Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Search component that will update map position
const Search = ({ setPosition }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const map = useMap();
  const provider = new OpenStreetMapProvider();
  const { user } = useUser();
  const router = useRouter();

  const flyToLocation = (position, zoom) => {
    return new Promise(resolve => {
      map.once('moveend', () => {
        resolve();
      });
      map.flyTo(position, zoom);
    });
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      // Search for the location using the query
      const results = await provider.search({ query: searchQuery });
      if (results.length > 0) {
        const { x: lng, y: lat } = results[0];
        const newPosition = { lat, lng }; // Use the result coordinates
        console.log('Location coordinates:', newPosition);

        // Update the position on the map
        setPosition(newPosition);


        // Insert the listing into Supabase with the search data
        const { data, error } = await supabase
          .from('listing')
          .insert([
            {
              address: searchQuery,
              coordinates: newPosition,  // Using the correct position
              createdBy: user?.primaryEmailAddress?.emailAddress, // Ensure `user` exists
            },
          ])
          .select();

        if (data) {
          console.log('New data added:', data);
          console.log(data);
          await flyToLocation(newPosition, 13);
          router.replace('/edit-listing/' +data[0].id)
          toast("Successfully added new location");
        } else {
          console.log('Error:', error);
          toast("Server side error: " + error.message);
        }
      } else {
        toast("No results found for the given location.");
      }
    } catch (error) {
      console.error('Error searching location:', error);
      toast("Error searching location: " + error.message);
    }
  };

  return (
    <div className="absolute top-4 left-4 z-[1000] bg-white p-2 rounded-lg shadow-lg">
      <form onSubmit={handleSearch} className="flex gap-2">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search location..."
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button 
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
         Next
        </button>
      </form>
    </div>
  );
};

const MapSearch = () => {
  const [position, setPosition] = useState({ lat: 51.505, lng: -0.09 }); // Default position

  return (
    <div className="w-full h-[600px] relative">
      <MapContainer
        center={position}
        zoom={13}
        scrollWheelZoom={true}
        className="w-full h-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Search setPosition={setPosition} />

        <Marker position={position}>
          <Popup>
            Selected location<br />
            Lat: {position.lat.toFixed(4)}<br />
            Lng: {position.lng.toFixed(4)}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapSearch;
