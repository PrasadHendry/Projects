"use client";
import { supabase } from "@/Utils/supabase/client";
import GoogleAddressSearch from "@/app/_components/GoogleAddressSearch";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/clerk-react";
import { Loader } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

function AddNewListing() {
  // State for selected address and coordinates
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [coordinates, setCoordinates] = useState(null);
  const { user } = useUser();
  const [loader, setLoader] = useState(false);
  // Handler function for the Next button
  const nextHandler = async () => {
    // Log selectedAddress and coordinates to console
    // console.log(selectedAddress, coordinates);

    setLoader(true);
    const { data, error } = await supabase
      .from("listing")
      .insert([
        {
          address: selectedAddress.label,
          coordinates: coordinates,
          createdBy: user?.primaryEmailAddress.emailAddress,
        },
      ])
      .select();

    if (data) {
      setLoader(false);
      console.log("New Data Added", data);
      toast("New Address Data Added for Listing");
    }
    if (error) {
      setLoader(false);
      console.log("Error");
      toast("Error: Server Side");
    }
  };

  return (
    <div className="mt-10 md:mx-56 lg:mx-80">
      <div className="p-10 flex flex-col gap-5 items-center justify-center">
        <h2 className="font-bold text-2xl">Add New Listing</h2>
        <div className="w-full max-w-lg p-5 rounded-lg border shadow-md flex flex-col gap-5">
          <h2 className="text-grey-500">Enter Address for Listing: </h2>
          {/* Pass setSelectedAddress and setCoordinates as props */}
          <GoogleAddressSearch
            selectedAddress={(value) => setSelectedAddress(value)}
            setCoordinates={(value) => setCoordinates(value)}
          />
          {/* Disable button if selectedAddress or coordinates are null */}
          <Button
            disabled={!selectedAddress || !coordinates}
            onClick={nextHandler}
          >
            {loader ? <Loader className="anime-spin" /> : "Next"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AddNewListing;
