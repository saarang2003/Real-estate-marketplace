'use client'
import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from 'next/image';

function Slider({ imageList }) {
    console.log("Image listing page ", imageList);
  return (
    imageList && imageList.length > 0 ? (
      <Carousel>
        <CarouselContent>
          {imageList.map((item, index) => {
            return (
              <div className='mx-auto w-1200'>
              <CarouselItem key={index}>
                <Image 
                  src={item.url} 
                  width={800} 
                  height={300} 
                  alt={`Image ${index + 1}`} 
                  className='rounded-xl object-cover h-[300px]'
                />
              </CarouselItem>
              </div>
            );
          })}
        </CarouselContent>
        <CarouselPrevious  className = 'bg-primary text-white'/>
        <CarouselNext className = 'bg-primary text-white' />
      </Carousel>
    ) : (
      <div className='w-full h-[200px] bg-slate-200'>
        No images available
      </div>
    )
  );
}

export default Slider;
