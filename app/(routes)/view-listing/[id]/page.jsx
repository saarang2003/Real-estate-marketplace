'use client'
import { supabase } from '@/utils/supabase/client'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';
import Slider from '../_components/Slider';
import Details from '../_components/Details';
import AgentDetails from '../_components/AgentDetails';
import { usePathname } from 'next/navigation';

function ViewListing() {
    const params = usePathname();
    const [listingDetail, setListingDetail] = useState({});
    useEffect(() => {
        getListingDetail();
    }, []);

    const getListingDetail = async() =>{
        const listingId = params.split("/")[2]; // Extract the ID from the URL

        const { data, error } = await supabase
            .from('listing')
            .select('* , listingImages(url , listing_id)')
            .eq('id', listingId)
            .eq('active', true);

            if (error) {
                setError(error.message);
                setLoading(false);
                toast.error('Error: ' + error.message);
            } else if (data && data.length > 0) {
                setListingDetail(data[0]); // Assuming the first entry contains the relevant details
                setLoading(false);
                console.log("dtasjnskjvnjsv" , data);
            } else {
                setError('No data found for this listing.');
                setLoading(false);
            }
    }
    
  return (
    <div>

        <div className='px-4 md:px-32'>
            <Slider imageList = {listingDetail?.listingImages} />
        </div>
    
        <Details  listing={listingDetail}/>

        <AgentDetails listingDetail={listingDetail}/>
    </div>
  )
}

export default ViewListing