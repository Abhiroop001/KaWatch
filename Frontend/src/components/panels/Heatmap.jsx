import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function Heatmap({ points }){
  return (
    <div className="h-80 rounded-lg overflow-hidden">
      <MapContainer center={[23.813,86.441]} zoom={15} className="h-full w-full">
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OpenStreetMap"/>
        {points.map(p=>(
          <CircleMarker key={p.id} center={[p.lat,p.lng]} radius={10}
            pathOptions={{ color: p.risk>=0.6?"#ef4444":p.risk>=0.3?"#f59e0b":"#10b981", fillOpacity:0.6 }}>
            <Popup><b>Zone {p.id}</b><br/>Risk {(p.risk*100).toFixed(0)}%</Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
}
