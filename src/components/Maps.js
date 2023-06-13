import React from "react";
import { Map, Marker, ZoomControl } from "pigeon-maps";
import { maptiler } from "pigeon-maps/providers";

const maptilerProvider = maptiler("bVdARK2aJsp6cpYlTv6n", "streets");

export function Maps({ locations, loggedInUser }) {
  console.log("all locations", locations);
  let filteredLocations = locations.filter((e) => e.latitude !== "");

  let index = 0;
  return (
    <Map
      zoom={4}
      center={[36.0902, -99.7129]}
      provider={maptilerProvider}
      dprs={[1, 2]}
      height={500}
    >
      <ZoomControl />
      {loggedInUser &&
        filteredLocations.map((e) => (
          <Marker
            key={index++}
            color="blue"
            width={50}
            anchor={[+e.latitude, +e.longitude]}
          />
        ))}
    </Map>
  );
}
