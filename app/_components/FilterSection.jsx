import React, { useState } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Bath, BedDouble, CarFront, Home, Ruler } from 'lucide-react'
import { Slider } from '@/components/ui/slider';
  



function FilterSection( ) {

    const [filters, setFilters] = useState({
        priceRange: [0, 10000],
        bedrooms: 'all',
        bathrooms: 'all',
        parking : 'all',
        propertyType: 'all',
      });

      const handlePriceChange = (value) => {
        setFilters(prev => ({
          ...prev,
          priceRange: value
        }));
        onFilterChange({ ...filters, priceRange: value });
      };

      const handleSelectChange = (value, field) => {
        setFilters(prev => ({
          ...prev,
          [field]: value
        }));
        onFilterChange({ ...filters, [field]: value });
      };
    

    const handleFilterChange = (key, value) => {
        setFilters(prevFilters => ({
          ...prevFilters,
          [key]: value,
        }));
      };


  return (
    <div>

    <div className='grid grid-cols-1 md:grid-cols-4 gap-2'>
    <div>
            <h3 className="text-sm font-medium mb-2">Bedrooms</h3>
            <Select
              value={filters.bedrooms}
              onValueChange={(value) => handleSelectChange(value, 'bedrooms')}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select bedrooms" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any</SelectItem>
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="2">2</SelectItem>
                <SelectItem value="3">3</SelectItem>
                <SelectItem value="4">4+</SelectItem>
              </SelectContent>
            </Select>
          </div>


          <div>
            <h3 className="text-sm font-medium mb-2">Bathrooms</h3>
            <Select
              value={filters.bathrooms}
              onValueChange={(value) => handleSelectChange(value, 'bathrooms')}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select bathrooms" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any</SelectItem>
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="2">2</SelectItem>
                <SelectItem value="3">3</SelectItem>
                <SelectItem value="4">4+</SelectItem>
              </SelectContent>
            </Select>
          </div>


          <div>
            <h3 className="text-sm font-medium mb-2">Parking</h3>
            <Select
              value={filters.parking}
              onValueChange={(value) => handleSelectChange(value, 'parking')}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select parking" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any</SelectItem>
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="2">2</SelectItem>
                <SelectItem value="3">3</SelectItem>
                <SelectItem value="4">4+</SelectItem>
              </SelectContent>
            </Select>
          </div>

<div>
          <h3 className="text-sm font-medium mb-2">Property Type</h3>
          <Select
            value={filters.propertyType}
            onValueChange={(value) => handleSelectChange(value, 'propertyType')}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select property type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Any</SelectItem>
              <SelectItem value="house">House</SelectItem>
              <SelectItem value="apartment">Apartment</SelectItem>
              <SelectItem value="condo">Condo</SelectItem>
              <SelectItem value="townhouse">Townhouse</SelectItem>
            </SelectContent>
          </Select>
        </div>


    </div>

    <div className='m-3'>
          <h3 className="text-sm font-medium mb-2">Price Range</h3>
          <Slider
            defaultValue={[0, 10000]}
            max={10000}
            step={100}
            value={filters.priceRange}
            onValueChange={handlePriceChange}
            className="w-full"
          />
          <div className="flex justify-between mt-2 text-sm text-gray-500">
            <span>${filters.priceRange[0]}</span>
            <span>${filters.priceRange[1]}</span>
          </div>
        </div>
    </div>
  )
}

export default FilterSection