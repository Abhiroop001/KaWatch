import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import L from "leaflet";

// === Worker data (nearby coords) ===
const workersData = [
  { id: 1, name: "Arfa A", status: "no-risk", coords: [22.580, 88.360] },
  { id: 2, name: "Ankur B", status: "moderate-risk", coords: [22.581, 88.362] },
  { id: 3, name: "Siddhi J", status: "at-risk", coords: [22.579, 88.361] },
  { id: 4, name: "Abhiroop M", status: "at-risk", coords: [22.569, 88.369] } // ✅ Fixed duplicate ID
];

// === Custom colored icons ===
const getIcon = (status) => {
  const color =
    status === "at-risk" ? "red" :
    status === "moderate-risk" ? "yellow" :
    "green";

  return new L.Icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });
};

export default function WorkerTracker() {
  const [workers, setWorkers] = useState(workersData);

  const sendAlert = (id) => {
    alert(`Action plan sent to worker ID ${id}`);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-72 bg-white dark:bg-gray-900 p-4 border-r overflow-y-auto">
        <h2 className="text-lg font-semibold mb-4">Worker Details</h2>
        {workers.map((worker) => (
          <Card key={worker.id} className="mb-3 p-3 flex flex-col dark:bg-gray-800">
            <span className="font-medium">{worker.name}</span>
            <span
              className={`text-sm ${
                worker.status === "at-risk"
                  ? "text-red-500"
                  : worker.status === "moderate-risk"
                  ? "text-yellow-500"
                  : "text-green-500"
              }`}
            >
              {worker.status.replace("-", " ").toUpperCase()}
            </span>
            <Button
              variant="outline"
              size="sm"
              className="mt-2"
              onClick={() => sendAlert(worker.id)}
            >
              Send Alert
            </Button>
          </Card>
        ))}
      </div>

      {/* Map */}
      <div className="flex-1">
        <MapContainer
          center={[22.580, 88.361]}
          zoom={17}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {workers.map((worker) => (
            <Marker
              key={`marker-${worker.id}`} 
              position={worker.coords}
              icon={getIcon(worker.status)}
            >
              <Popup>
                <b>{worker.name}</b> <br />
                Status: {worker.status}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}