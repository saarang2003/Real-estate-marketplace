'use client'

import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import 'leaflet/dist/leaflet.css';

// This is needed to fix the marker icon issue in react-leaflet
import L from 'leaflet';
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

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const results = await provider.search({ query: searchQuery });
      if (results.length > 0) {
        const { x: lng, y: lat } = results[0];
        const newPosition = { lat, lng };
        console.log('Location coordinates:', newPosition);
        setPosition(newPosition);
        map.flyTo(newPosition, 13);
      }
    } catch (error) {
      console.error('Error searching location:', error);
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
          Search
        </button>
      </form>
    </div>
  );
};

const MapSearch = () => {
  const [position, setPosition] = useState({ lat: 51.505, lng: -0.09 });
  console.log("location details " , position.lat , position.lng);

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