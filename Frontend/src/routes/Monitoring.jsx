import SensorGrid from "@/components/panels/SensorGrid";
import AIStatus from "@/components/panels/AIStatus";
import Environment from "@/components/panels/Environment";
import { sensorRows } from "@/lib/mock";

export default function Monitoring(){
  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-12"><SensorGrid rows={sensorRows}/></div>
      <div className="col-span-6"><AIStatus/></div>
      <div className="col-span-6"><Environment/></div>
    </div>
  );
}
