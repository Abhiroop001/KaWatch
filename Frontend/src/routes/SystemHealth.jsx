import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import MetricTile from "@/components/common/MetricTile";

export default function SystemHealth(){
  return (
    <div className="grid grid-cols-12 gap-4">
      <Card className="col-span-12">
        <CardHeader><CardTitle>System Health & Diagnostics</CardTitle></CardHeader>
        <CardContent className="grid grid-cols-4 gap-3">
          <MetricTile label="API Latency" value="112 ms"/>
          <MetricTile label="DB Status" value="OK"/>
          <MetricTile label="Queue Depth" value="7"/>
          <MetricTile label="Uptime" value="99.97%"/>
        </CardContent>
      </Card>
      <Card className="col-span-12">
        <CardHeader><CardTitle>Integration Status</CardTitle></CardHeader>
        <CardContent className="text-sm">
          Twilio: Connected • SendGrid: Connected • OpenWeather: Connected
        </CardContent>
      </Card>
    </div>
  );
}
