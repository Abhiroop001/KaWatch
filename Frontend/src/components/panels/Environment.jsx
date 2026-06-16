import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function Environment(){
  return (
    <Card>
      <CardHeader><CardTitle>Environmental Factors</CardTitle></CardHeader>
      <CardContent className="grid grid-cols-2 gap-3 text-sm">
        <div>Seismic Activity: <b>Low</b> (last event 2h)</div>
        <div>Ground Vibration: <b>2.1</b> (th: 5.0)</div>
        <div>Piezometer: <b>Normal</b></div>
        <div>Trend: <b>Stable</b></div>
      </CardContent>
    </Card>
  );
}
