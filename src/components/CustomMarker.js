import React, { useEffect } from "react";
import { Marker, Popup } from "react-leaflet";
import { Button } from "@mui/material";

const CustomMarker = ({ position, name, distance, onSelect, iconUrl }) => {
  
  var localIcon = L.icon({
    iconUrl: '/images/marker-icon-2x.png',
    shadowUrl: '/images/marker-shadow.png',
    iconSize:     [24, 40],
    shadowSize:   [40, 60],
    iconAnchor:   [10, 40],
    shadowAnchor: [10, 60]
 });  

  return (
    <Marker position={position} icon={localIcon}>
      <Popup>
        <div>
          <h3 style={{ marginBottom: "5px" }}>{name}</h3>
          <p style={{ margin: "5px 0" }}>{distance}</p>
          {onSelect && (
            <Button onClick={onSelect} style={{ marginTop: "5px" }} variant="contained" size="small">
              Select
            </Button>
          )}
        </div>
      </Popup>
    </Marker>
  );
};

export default CustomMarker;
