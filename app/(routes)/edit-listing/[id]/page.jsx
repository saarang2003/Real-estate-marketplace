"use client";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import React, { useEffect, useState } from "react";
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
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import { supabase } from "@/utils/supabase/client";
import { useUser } from "@clerk/nextjs";
import FileUpload from "../_components/FileUpload";





function Page() {
  const params = usePathname();
const { user } = useUser();
const router = useRouter();
  const [listing, setListing] = useState(null); // Start with null for listing
  const [initialValues, setInitialValues] = useState({
    profileImage: user?.imageUrl,
    fullName: user?.fullName,
    type: "",
    bedroom: 0,  // Default value is 0 instead of an empty string
    bathroom: 0, // Default value is 0
    builtin: 0,  // Default value is 0
    parking: 0,  // Default value is 0
    plotSize: 0, // Default value is 0
    area: 0,     // Default value is 0
    sellingPrice: 0,  // Default value is 0
    hoa: 0,           // Default value is 0
    additionalNotes: "",
  });

  const [images , setImages]  = useState([]);
 

  useEffect(() => {
    if (user) {
      verifyUser();
    }
  }, [user]);

  const verifyUser = async () => {
    const { data, error } = await supabase
      .from("listing")
      .select("* , listingImages(url , listing_id)")
      .eq("createdBy", user?.primaryEmailAddress?.emailAddress)
      .eq("id", params.split("/")[2]);

    if (data && data.length > 0) {
      console.log(data);
      setListing(data[0]);
      setInitialValues({
        type: data[0]?.type || "",
        bedroom: data[0]?.bedroom || "",
        bathroom: data[0]?.bathroom || "",
        builtin: data[0]?.builtin || "",
        parking: data[0]?.parking || "",
        plotSize: data[0]?.plotSize || "",
        area: data[0]?.area || "",
        sellingPrice: data[0]?.price || "",
        hoa: data[0]?.hoa || "",
        additionalNotes: data[0]?.description || "",
      });
    } else {
      router.replace("/");
    }
  };


  const onSubmitHandler = async (formValue) => {
    const { data, error } = await supabase
      .from("listing")
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
      .eq("id", params.split("/")[2])
      .select();

      if (error) {
        console.error("Error updating listing:", error.message);  // Log the error for more details
        toast("Data not updated: " + error.message);  // Display error message
      } else {
        console.log("Data updated:", data);
        toast("Data updated successfully!");
      }

    if (data) {
      console.log("data updated", data);
      toast("Data Updated Successfully");

      for( const image of images){
        const file = image ;
        const fileName = Date.now().toString();
        const fileExt = fileName.split('.').pop(); 


           // Ensure the file path is a string, if not convert it
      const filePath = `${fileName}`;  // Ensure it's a string


        const { data, error } = await supabase.storage
        .from('listingImage')
        .upload(filePath, file, {
          contentType: `image/${fileExt}`,
          upsert: false,
        });

        if (error) {
          console.log("Error uploading image:", error.message);
        } else {
          console.log("File uploaded successfully:", data);

          const { data: signedUrlData, error: signedUrlError } = await supabase.storage
          .from('listingImage')
          .createSignedUrl(filePath, 360000000000000); // Set the expiration time for the URL (in seconds)
    
        if (signedUrlError) {
          console.log("Error generating signed URL:", signedUrlError.message);
        } else {
          // Check the structure of signedUrlData
          console.log("Signed URL data:", signedUrlData);
    
          // Use the `signedUrlData.signedUrl` if it's present
          if (signedUrlData && signedUrlData.signedUrl) {
            const signedImageUrl = signedUrlData.signedUrl;
            console.log("Signed URL:", signedImageUrl);
          } else {
            console.log("Signed URL is undefined.");
          }
    
          // You can also construct the regular image URL using your environment variable (if needed)
          const imageUrl = signedUrlData.signedUrl;
          console.log(" image ulr ye ",imageUrl);
          console.log(" image url correction ",signedUrlData);
         
          const { data, error } = await supabase
          .from('listingImages')
          .insert([
            {url : imageUrl , listing_id : params.split("/")[2] }
          ])
          .select()

          if( data){
            console.log("data added" , data);
          }else{
            console.log('error' , error.message)
          }
        
        }
      }
      }
    }
    // } else {
    //   console.log("data not updated", error);
    //   toast("Data Not Updated");
    // }
  };

  if (!listing) {
    return <div>Loading...</div>; // Wait until listing data is fetched
  }

  return (
    <div className="w-full mx-auto">
      <div className="border-2 rounded-lg shadow-lg">
        <h2 className="font-bold text-4xl text-center my-4">
          Enter more details about the listing
        </h2>
        <Formik
          initialValues={initialValues}
          enableReinitialize={true} // Important for re-initializing values when listing is fetched
          onSubmit={(values) => {
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
                    <Label htmlFor="selling-price" className="text-lg text-slate-500">
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
                    <Label htmlFor="additional-notes" className="text-lg text-slate-500">
                      Additional Notes
                    </Label>
                    <Textarea
                      placeholder="Type your message here."
                      className="w-full"
                      name="additionalNotes"
                      value={values.additionalNotes}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </div>
                </div>

                <div>
                  <h2 className="text-lg font-bold text-gray-600 my-2">Upload Profile Images</h2>
                  <FileUpload 
                  setImages={(values) => setImages(values)}
                  imageList = {listing.listingImages} />
                </div>



                <div className="mb-3  ">
                  <div className="flex gap-3 justify-end items-center ">
                 

                    <Button
                      type="button"
                      variant="ghost"
                      className="p-5 rounded-md shadow-md"
                    >
                      Save
                    </Button>
               

                    <Button
                      type = "submit"
                      className="bg-blue-500 font-semibold text-white items-center rounded-md shadow-md"
                    >
                      Publish & Save
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

export default Page;
