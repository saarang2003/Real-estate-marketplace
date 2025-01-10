import { Button } from '@/components/ui/button';
import { useClerk } from '@clerk/nextjs'
import { CircleUser } from 'lucide-react'

import React from 'react'

function AgentDetails({ listingDetail }) {
  const { user } = useClerk();  // Get the authenticated user from Clerk

  // Log for debugging purposes
  // console.log('Clerk User:', user);
  // console.log('Agent Listing Details:', listingDetail);

  // Check if user is authenticated and if their profile has fullName and profileImage
  const userFullName = user?.fullName || 'Unknown Agent';
  const userProfileImage = user?.profileImageUrl || '/default-profile.png'; // Fallback image if profile image is not set

  // Use listingDetail's fullName and profileImage if available, else fall back to the user data
  const agentFullName = listingDetail?.fullName || userFullName;
  const agentProfileImage = listingDetail?.profileImage || userProfileImage;

  return (
    <div className='flex gap-5 items-center justify-between px-20 py-5 rounded-lg shadow-md border my-6'>
       
      <div className='flex items-center gap-6'>
        {/* Render the user's profile image */}
        <div>
        <CircleUser  className='h-10 w-10'/> 
        </div>
        <div>
          {/* Render the user's name */}
          <h2 className='text-lg font-bold'>{agentFullName}</h2>
          <h2 className='text-gray-500'>{listingDetail?.createdBy || 'Unknown Creator'}</h2>
        </div>
      </div>

      <div>
            <Button variant = 'ghost' className = "text-white bg-primary p-3 rounded-md shadow-lg"> Contact Agent </Button> 
            </div>
    </div>
  );
}

export default AgentDetails;
