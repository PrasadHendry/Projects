import { Button } from "@/components/ui/button";
import { BathIcon, BedDouble, MapPin, Ruler, X } from "lucide-react";
import Image from "next/image";
import React from "react";

function MarkerListingItem({ item, closeHandler }) {
  return (
    <div>
      <div className=" cursor-pointer rounded-lg w-[150px]">
        <X onClick={() => closeHandler()} />
        <Image
          src={item.listingImages[0].url} // Assuming item has listingImages array and the first image is being used
          width={800}
          height={150}
          className="rounded-lg  w-[180px] object-cover h-[120px]"
        />
        <div className="flex mt-2 flex-col gap-2 p-2 bg-white">
          <h2 className="font-bold text-xl">${item.price}</h2>

          <h2 className="flex gap-2 text-sm text-gray-400">
            <MapPin className="h-10 w-10 text-primary" />
            {item.address}
          </h2>
          <div className="flex gap-2 mt-2 justify-between">
            <h2 className="flex gap-2 w-full text-sm bg-slate-200 rounded-md p-2 text-grey-500 justify-center item-center">
              <BedDouble className="h-4 w-4 " /> {item.bedroom}
            </h2>
            <h2 className="flex gap-2  w-full text-sm bg-slate-200 rounded-md p-2 text-grey-500 justify-center item-center">
              <BathIcon className="h-4 w-4" /> {item.bathroom}
            </h2>
          </div>
          <Button size="sm">View Details</Button>
        </div>
      </div>
    </div>
  );
}

export default MarkerListingItem;
