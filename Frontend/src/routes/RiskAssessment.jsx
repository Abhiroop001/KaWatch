import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { trendData } from "@/lib/mock";
import Predictions from "@/components/panels/Predictions";

export default function RiskAssessment(){
  return (
    <div className="grid grid-cols-12 gap-4">
      <Card className="col-span-8">
        <CardHeader><CardTitle>Risk Probability Matrix (next 24h)</CardTitle></CardHeader>
        <CardContent className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trendData}>
              <defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopOpacity={0.4}/>
                <stop offset="95%" stopOpacity={0}/>
              </linearGradient></defs>
              <CartesianGrid strokeDasharray="3 3"/>
              <XAxis dataKey="t"/><YAxis/><Tooltip/>
              <Area type="monotone" dataKey="val" name="Risk %" fillOpacity={1} fill="url(#g)"/>
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <div className="col-span-4"><Predictions/></div>

      <Card className="col-span-12">
        <CardHeader><CardTitle>Action Recommendations</CardTitle></CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div>• Increase monitoring frequency in <b>Zone A-7</b></div>
          <div>• Deploy UAV scan at <b>West Pit</b></div>
          <div>• Inspect drainage near <b>East Ridge</b></div>
        </CardContent>
      </Card>
    </div>
  );
}
