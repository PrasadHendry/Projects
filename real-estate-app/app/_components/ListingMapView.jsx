"use client";
import React, { useEffect, useState } from "react";
import Listing from "./Listing";
import { supabase } from "@/Utils/supabase/client";
import { toast } from "sonner";
import GoogleMapSection from "./GoogleMapSection";

function ListingMapView({ type }) {
  const [listing, setListing] = useState([]);
  const [searchAddress, setSearchAddress] = useState();
  const [bedCount, setBedCount] = useState(0);
  const [bathCount, setBathCount] = useState(0);
  const [parkingCount, setParkingCount] = useState(0);
  const [homeType, setHomeType] = useState(0);
  const [coordinates, setCoordinates] = useState(0);

  useEffect(() => {
    getLatestListing();
  }, []);

  const getLatestListing = async () => {
    const { data, error } = await supabase
      .from("listing")
      .select("*,listingImages(url,listing_id)")
      .eq("active", true)
      .eq("type", type)
      .order("id", { ascending: false });

    if (data) {
      setListing(data);
    }
    if (error) {
      toast("Server Side Error");
    }
  };

  const handleSearchClick = async () => {
    console.log(searchAddress);
    const searchTerm = searchAddress?.value?.structured_formatting.main_text;
    let query = supabase
      .from("listing")
      .select("*,listingImages(url,listing_id)")
      .eq("active", true)
      .eq("type", type)
      .gte("bedroom", bedCount)
      .gte("bathroom", bathCount)
      .gte("parking", parkingCount)
      .like("address", "%" + searchTerm + "%")
      .order("id", { ascending: false });

    if (homeType) {
      query = query.eq("propertyType", homeType);
    }

    const { data, error } = await query;
    if (data) {
      setListing(data);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <Listing
          listing={listing}
          handleSearchClick={handleSearchClick}
          searchAddress={(v) => setSearchAddress(v)}
          setBedCount={setBedCount}
          setBathCount={setBathCount}
          setParkingCount={setParkingCount}
          setHomeType={setHomeType}
          setCoordinates={setCoordinates}
        />
      </div>
      <div>
        <GoogleMapSection listing={listing} coordinates={coordinates} />
      </div>
    </div>
    //      <div className="fixed mt-10 right-1 h-full md:w-[350px] lg:w-[450px] xl:w-[650px]">
  );
}

export default ListingMapView;
