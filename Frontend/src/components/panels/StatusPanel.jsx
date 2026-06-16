import { Card, CardContent } from "@/components/ui/card";
import MetricTile from "../common/MetricTile";

export default function StatusPanel(){
  return (
    <Card className="col-span-4">
      <CardContent className="grid grid-cols-2 gap-3 pt-4">
        <MetricTile label="Risk Level" value="Medium" accent="warning"/>
        <MetricTile label="Active Sensors" value="47 / 52"/>
        <MetricTile label="Temperature" value="15°C"/>
        <MetricTile label="Rainfall" value="2.3 mm"/>
      </CardContent>
    </Card>
  );
}
