import GoogleAddressSearch from "@/app/_components/GoogleAddressSearch";
import React from "react";

function AddNewListing() {
  return (
    <div className="p-10 flex flex-col  gap-5 items-center justify-center">
      <h2 className="font-bold text-2xl">Add New Listing</h2>
      <div className="w-full max-w-lg">
        <h2 className="text-grey-500">Enter Address for Listing: </h2>
        <GoogleAddressSearch />
      </div>
    </div>
  );
}

export default AddNewListing;
