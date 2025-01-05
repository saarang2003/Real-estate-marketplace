import { MapPin } from 'lucide-react'
import React from 'react'

function AddNewListing() {
  return (
    <div className=' p-10 flex flex-col gap-5 justify-center items-center'>
      <h2 className='font-bold text-3xl'>Add New Listing </h2>
      <div>
        <h2 className='text-gray-500'>Enter Address which you want to List</h2>
      </div>
      <div className='flex justify-between gap-4 border-2 border-red-400'>
        <form action="post">
          <label htmlFor="">
          <MapPin />
          </label>
          <input type="text" placeholder='enter your location ' />
        </form>
      </div>
    </div>
  )
}

export default AddNewListing