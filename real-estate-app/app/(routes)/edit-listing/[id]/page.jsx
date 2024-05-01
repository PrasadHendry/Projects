"use client";
import React, { useEffect } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Formik } from "formik";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { supabase } from "@/Utils/supabase/client";
import { toast } from "sonner";
import { useUser } from "@clerk/clerk-react";

function EditListing({ params }) {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    //console.log(params.split("/")[2]);
    user && verifyUserRecord();
  }, [user]);

  const verifyUserRecord = async () => {
    const { data, error } = await supabase
      .from("listing")
      .select("*")
      .eq("createdBy", user?.primaryEmailAddress.emailAddress)
      .eq("id", params.id);

    if (data?.length <= 0) {
      router.replace("/");
    }
  };
  const onSubmitHandler = async (formValue) => {
    const { data, error } = await supabase
      .from("listing")
      .update(formValue)
      .eq("id", params.id)
      .select();

    if (data) {
      console.log(data);
      toast("Listing Updated and Published");
    } else if (error) {
      console.error(error);
      toast("Error occurred while updating listing");
    }
  };

  return (
    <div className="px-10 md:px-36 my-10 ">
      <h2 className="font-bold text-2xl ">
        Add some more details about the Listing:
      </h2>
      <Formik
        initialValues={{
          type: "",
          propertyType: "",
        }}
        onSubmit={(values) => {
          console.log(values);
          onSubmitHandler(values);
        }}
      >
        {({ values, handleChange, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <div>
              <div className="p-5 border rounded-lg shadow-md grid gap-7 mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="flex flex-col gap-2">
                    <h2 className="text-lg text-slate-500">Rent OR Sell?</h2>
                    <RadioGroup
                      defaultValue="Sell"
                      onValueChange={(v) => (values.type = v)}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Rent" id="Rent" />
                        <Label htmlFor="Rent" className="text-lg">
                          Rent
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Sell" id="Sell" />
                        <Label htmlFor="Sell" className="text-lg">
                          Sell
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                  <div className="flex gap-2 flex-col">
                    <h2 className="text-lg text-slate-500">Property Type:</h2>
                    <Select
                      onValueChange={(e) => (values.propertyType = e)}
                      name="propertyType"
                    >
                      <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder="Select Property Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Single Family House">
                          Single Family House
                        </SelectItem>
                        <SelectItem value="Town House">Town House</SelectItem>
                        <SelectItem value="Condo">Condo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="flex gap-2 flex-col mb-4">
                    <h2 className="text-gray-500">Bedroom</h2>
                    <Input
                      type="number"
                      placeholder="Ex.2"
                      name="bedroom"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex gap-2 flex-col mb-4">
                    <h2 className="text-gray-500">Bathroom</h2>
                    <Input
                      type="number"
                      placeholder="Ex.2"
                      name="bathroom"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex gap-2 flex-col mb-4">
                    <h2 className="text-gray-500">Built In</h2>
                    <Input
                      type="number"
                      placeholder="Ex.1900 Sq.ft"
                      name="builtIn"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="flex gap-2 flex-col mb-4">
                    <h2 className="text-gray-500">Parking</h2>
                    <Input
                      type="number"
                      placeholder="Ex.2"
                      name="parking"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex gap-2 flex-col mb-4">
                    <h2 className="text-gray-500">Lot Size (Sq. Ft)</h2>
                    <Input
                      type="number"
                      placeholder="Ex.400"
                      name="lotSize"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex gap-2 flex-col mb-4">
                    <h2 className="text-gray-500">Area (Sq. Ft)</h2>
                    <Input
                      type="number"
                      placeholder="Ex.1900"
                      name="area"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="flex gap-2 flex-col mb-4">
                    <h2 className="text-gray-500">Selling Price (Rs.)</h2>
                    <Input
                      type="number"
                      placeholder="Ex.400000"
                      name="sellingPrice"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex gap-2 flex-col mb-4">
                    <h2 className="text-gray-500">HOA (Per Month) (Rs.)</h2>
                    <Input
                      type="number"
                      placeholder="Ex.100"
                      name="hoa"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-10">
                  <div className="flex gap-2 flex-col mb-4">
                    <h2 className="text-gray-500">Description</h2>
                    <Textarea
                      placeholder=""
                      name="description"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="flex gap-7 justify-end">
                  <Button
                    variant="outline"
                    className="text-primary border-primary"
                  >
                    Save
                  </Button>
                  <Button className="flex gap-2 items-center">
                    Save & Publish
                  </Button>
                </div>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default EditListing;
