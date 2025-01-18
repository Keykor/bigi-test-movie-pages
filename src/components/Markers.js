import React from "react";
import { useMap } from "react-leaflet";
import CustomMarker from "./CustomMarker";

const Markers = ({ data, theatreSetter }) => {
  const map = useMap();

  const maxZoom = Math.min(...data.map((theatre) => theatre.zoom));
  map.setZoom(maxZoom);

  return (
    <>
      {data.map((theatre) => (
        <CustomMarker
          key={theatre.id}
          position={theatre.coordinates}
          name={theatre.name}
          distance={theatre.distance}
          onSelect={() => theatreSetter(theatre.id)}
        />
      ))}
    </>
  );
};

export default Markers;
