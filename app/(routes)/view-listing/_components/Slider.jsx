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
    console.log(imageList);
  return (
    imageList && imageList.length > 0 ? (
      <Carousel>
        <CarouselContent>
          {imageList.map((item, index) => {
            return (
              <CarouselItem key={index}>
                <Image 
                  src={item.url} 
                  width={800} 
                  height={300} 
                  alt={`Image ${index + 1}`} 
                  className='rounded-xl object-cover h-[300px]'
                />
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    ) : (
      <div className='w-full h-[200px] bg-slate-200'>
        No images available
      </div>
    )
  );
}

export default Slider;
