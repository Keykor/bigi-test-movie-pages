import React, { useEffect } from "react";
import { Marker, Popup } from "react-leaflet";

const CustomMarker = ({ position, name, distance, onSelect, iconUrl }) => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const L = require("leaflet");

      L.Icon.Default.mergeOptions({
        iconUrl: iconUrl || "/images/marker-icon-2x.png",
        shadowUrl: "/images/marker-shadow.png",
        iconSize: [24, 40],
        shadowSize: [40, 60],
        iconAnchor: [10, 40],
        shadowAnchor: [10, 60],
      });
    }
  }, [iconUrl]);

  return (
    <Marker position={position}>
      <Popup>
        <div>
          <h4>{name}</h4>
          <p>{distance}</p>
          {onSelect && (
            <button onClick={onSelect} style={{ marginTop: "5px" }}>
              Select
            </button>
          )}
        </div>
      </Popup>
    </Marker>
  );
};

export default CustomMarker;
