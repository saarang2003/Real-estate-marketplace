'use client'

import MapSearch from '@/app/_components/MapSearch';
import { MapPin } from 'lucide-react';




function AddNewListing() {


  return (
    <div className='flex justify-center items-center mx-auto'>
    <div className="p-10 flex flex-col gap-5 justify-center items-center">
      <h2 className="font-bold text-3xl">Add New Listing</h2>
      <div>
        <h2 className="text-gray-500">Enter Address which you want to List</h2>
      </div>
      <div className='w-[1100px] border-2 rounded-lg shadow-lg'>
    <MapSearch />
      </div>
    </div>
    </div>
  );
}

export default AddNewListing;
