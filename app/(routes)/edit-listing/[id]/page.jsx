"use client";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function page() {
  return (
    <div className="px-10 md:px-36 my-10">
      <h2 className="font-bold text-4xl">
        Enter some more details about listing{" "}
      </h2>
      <div className="p-8 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-3">
          <div className="flex flex-col gap-2 ">
            <h2 className="text-lg text-slate-500">Rent or Sell ?</h2>
            <RadioGroup defaultValue="Sell">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Rent" id="Rent" />
                <Label htmlFor="Rent">Rent</Label>
              </div>
              <div className="flex items-center  space-x-2">
                <RadioGroupItem value="Sell" id="Sell" />
                <Label htmlFor="Sell">Sell</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="flex flex-col gap-2">
            <h2 className="text-lg text-slate-500">Property Type</h2>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select property Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Single</SelectItem>
              <SelectItem value="dark">Town house</SelectItem>
              <SelectItem value="system">Condo</SelectItem>
            </SelectContent>
          </Select>
          </div>

        </div>
      </div>
    </div>
  );
}

export default page;
