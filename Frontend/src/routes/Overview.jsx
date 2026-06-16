import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Heatmap from "@/components/panels/Heatmap";
import StatusPanel from "@/components/panels/StatusPanel";
import AlertsPanel from "@/components/panels/AlertsPanel";
import Predictions from "@/components/panels/Predictions";
import { riskPoints, trendData } from "@/lib/mock";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

export default function Overview(){
  return (
    <div className="grid grid-cols-12 gap-4">
      <AlertsPanel/>
      <StatusPanel/>

      <Card className="col-span-8">
        <CardHeader><CardTitle>Live Slope Angle</CardTitle></CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3"/>
              <XAxis dataKey="t"/><YAxis/><Tooltip/>
              <Line type="monotone" dataKey="val" name="Slope (°)"/>
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="col-span-4">
        <CardHeader><CardTitle>Recent Slope Status Alerts</CardTitle></CardHeader>
        <CardContent className="space-y-3 text-sm">
          {["North Slope displacement","Rainfall threshold","Pore pressure spike","Vibration anomaly"].map((m,i)=>(
            <div key={i} className="flex items-center justify-between">
              <div className="flex items-center gap-2"><span className="h-3 w-6 rounded bg-gray-300"/></div>
              <div className="flex-1 ml-2 text-gray-700 truncate">{m}</div>
              <div className="ml-2 text-xs text-gray-500">00:0{i}</div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="col-span-12">
        <CardHeader><CardTitle>Risk Heatmap</CardTitle></CardHeader>
        <CardContent><Heatmap points={riskPoints}/></CardContent>
      </Card>

      <Predictions className="col-span-4"/>
    </div>
  );
}
