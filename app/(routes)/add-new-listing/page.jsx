'use client'
import Map from '@/app/_components/Map';
import MapSearch from '@/app/_components/MapSearch';
import { MapPin } from 'lucide-react';




function AddNewListing() {


  return (
    <div className="p-10 flex flex-col gap-5 justify-center items-center">
      <h2 className="font-bold text-3xl">Add New Listing</h2>
      <div>
        <h2 className="text-gray-500">Enter Address which you want to List</h2>
      </div>
      <div className="flex justify-between gap-4 border-2 rounded-lg shadow-md p-2">
        <form  className="flex justify-center items-center gap-2">
          <label htmlFor="address" className="flex items-center">
            <MapPin width={30} height={30} />
          </label>
         <input type="text"
         placeholder='enter your location ' 
         className='w-[500px] p-2 px-2 '/>
         <button type="submit" className='bg-blue-500 text-white rounded-md shadow-lg font-semibold p-2 '>Search</button>
      </form>
      </div>
      <div className='w-[1100px] border-2 rounded-lg shadow-lg'>
    <MapSearch />
      </div>
    </div>
  );
}

export default AddNewListing;
