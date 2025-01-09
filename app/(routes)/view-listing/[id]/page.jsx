'use client'
import { supabase } from '@/utils/supabase/client'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';
import Slider from '../_components/Slider';

function ViewListing({params}) {

    const [listingDetail , setListingDetail] = useState([]);

    useEffect(() =>{
        getListingDetail();
    } , []);

    const getListingDetail = async() =>{
        const {data , error} = await supabase
        .from('listing')
        .select('* , listingImages(url , listing_id)')
        .eq('id' , params.split("/")[2])
        .eq('active' , true)

        if( data){
            console.log('data err' ,data[1]);
            setListingDetail(data[1]);
        }else{
            console.log(error.message);
            toast('Error: ' + error.message);
        }

    }
    
  return (
    <div className='px-4 md:px-32'>
        <Slider imageList = {listingDetail?.listingImages} />
    </div>
  )
}

export default ViewListing