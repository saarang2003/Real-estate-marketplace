"use client";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import React, { useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Formik } from "formik";
import { usePathname } from "next/navigation";
import { toast } from "sonner";
import { supabase } from "@/utils/supabase/client";

function page() {
  const initialState = {
    type: "", // Default value for type
    bedroom: "", // Default value for bedroom
    bathroom: "", // Default value for bathroom
    builtin: "", // Default value for built-in
    parking: "", // Default value for parking
    plotSize: "", // Default value for plot size
    area: "", // Default value for area
    sellingPrice: "", // Default value for selling price
    hoa: "", // Default value for HOA
    additionalNotes: "", // Default value for additional notes
  };

  const params = usePathname();

  useEffect(() =>{
    console.log(params.split('/')[2])
  } , []);

  
  const onSubmitHandler = async(formValue) =>{
    
const { data, error } = await supabase
.from('listing')
.update({
  type: formValue.type,
  propertyType: formValue.propertyType,
  bedroom: formValue.bedroom,
  bathroom: formValue.bathroom,
  builtIn: formValue.builtin,
  parking: formValue.parking,
  plotSize: formValue.plotSize,
  area: formValue.area,
  price: formValue.sellingPrice,
  hoa: formValue.hoa,
  description: formValue.additionalNotes,
})
.eq('id',params.split('/')[2])
.select()

    if( data){
      console.log("data updated " , data);
      toast('Data Updated Successfully');
    }else{
      console.log("data not updated" , error);
      toast('Data Not Updated ');
    }
  }
 

  return (
    <div className="w-full mx-auto">
      <div className="border-2 rounded-lg shadow-lg">
        <h2 className="font-bold text-4xl text-center my-4">
          Enter more details about the listing
        </h2>
        <Formik
          initialValues={initialState}
          onSubmit={(values) =>{
            console.log(values);
            onSubmitHandler(values);
          }}
        >
          {({ values, handleChange, handleBlur, handleSubmit, setFieldValue }) => (
            <form
              onSubmit={handleSubmit}
              className="p-8 max-w-screen-xl border-2 border-slate-100 mx-auto rounded-lg shadow-md"
            >
              <div className="p-8 max-w-screen-xl border-2 border-slate-100 mx-auto rounded-lg shadow-md">
                {/* First Row: Rent or Sell, Property Type */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="flex flex-col gap-2">
                    <h2 className="text-lg text-slate-500">Rent or Sell?</h2>
                    <RadioGroup
                      value={values.type}
                      onValueChange={(value) => setFieldValue("type", value)}
                      className="flex flex-col gap-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Rent" id="Rent" />
                        <Label htmlFor="Rent">Rent</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Sell" id="Sell" />
                        <Label htmlFor="Sell">Sell</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="flex flex-col gap-2">
                    <h2 className="text-lg text-slate-500">Property Type</h2>
                    <Select
                      onValueChange={(value) => setFieldValue("propertyType", value)}
                      value={values.propertyType}
                    >
                      <SelectTrigger className="w-full md:w-[180px]">
                        <SelectValue placeholder="Select property type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="single">Single</SelectItem>
                        <SelectItem value="townhouse">Town house</SelectItem>
                        <SelectItem value="condo">Condo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Second Row: Bedroom, Bathroom, Builtin */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="bedroom" className="text-lg text-slate-500">
                      Bedroom
                    </Label>
                    <Input
                      id="bedroom"
                      type="number"
                      name="bedroom"
                      value={values.bedroom}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Ex-1"
                      className="w-full"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <Label htmlFor="bathroom" className="text-lg text-slate-500">
                      Bathroom
                    </Label>
                    <Input
                      id="bathroom"
                      type="number"
                      name="bathroom"
                      value={values.bathroom}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Ex-1"
                      className="w-full"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <Label htmlFor="builtin" className="text-lg text-slate-500">
                      Built-in (sq.ft)
                    </Label>
                    <Input
                      id="builtin"
                      type="number"
                      name="builtin"
                      value={values.builtin}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Ex-1"
                      className="w-full"
                    />
                  </div>
                </div>

                {/* Third Row: Parking, Plot Size, Area */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="parking" className="text-lg text-slate-500">
                      Parking
                    </Label>
                    <Input
                      type="number"
                      name="parking"
                      value={values.parking}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Ex-1"
                      className="w-full"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <Label htmlFor="plot-size" className="text-lg text-slate-500">
                      Plot Size (sq.ft)
                    </Label>
                    <Input
                      type="number"
                      name="plotSize"
                      value={values.plotSize}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Ex-1"
                      className="w-full"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <Label htmlFor="area" className="text-lg text-slate-500">
                      Area (sq.ft)
                    </Label>
                    <Input
                      type="number"
                      name="area"
                      value={values.area}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Ex-1"
                      className="w-full"
                    />
                  </div>
                </div>

                {/* Fourth Row: Selling Price, HOA */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="flex flex-col gap-2">
                    <Label
                      htmlFor="selling-price"
                      className="text-lg text-slate-500"
                    >
                      Selling Price ($)
                    </Label>
                    <Input
                      type="number"
                      name="sellingPrice"
                      value={values.sellingPrice}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Ex-1"
                      className="w-full"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <Label htmlFor="hoa" className="text-lg text-slate-500">
                      HOA (Per month) ($)
                    </Label>
                    <Input
                      type="number"
                      name="hoa"
                      value={values.hoa}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Ex-1"
                      className="w-full"
                    />
                  </div>
                </div>

                {/* Final Row: Additional Notes */}
                <div className="mb-6">
                  <div className="flex flex-col gap-2">
                    <Label
                      htmlFor="additional-notes"
                      className="text-lg text-slate-500"
                    >
                      Additional Notes
                    </Label>
                    <Textarea
                      placeholder="Type your message here."
                      className="w-full"
                      type="text"
                      name="additionalNotes"
                      value={values.additionalNotes}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <div className="flex gap-3 justify-end">
                    <Button
                      type="submit"
                      className="bg-blue-500 font-semibold text-white rounded-md shadow-md"
                    >
                      Publish
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      className="p-6 rounded-md shadow-md"
                    >
                      Save
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default page;
