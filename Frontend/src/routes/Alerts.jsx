import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Alerts(){
  return (
    <div className="grid grid-cols-12 gap-4">
      <Card className="col-span-6">
        <CardHeader><CardTitle>Alert Configuration</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between"><span>SMS</span><Switch defaultChecked/></div>
          <div className="flex items-center justify-between"><span>Email</span><Switch defaultChecked/></div>
          <div className="flex items-center justify-between"><span>Push</span><Switch/></div>
          <div className="grid grid-cols-3 gap-2">
            <Input placeholder="Displacement thres (mm/day)"/>
            <Input placeholder="Rainfall thres (mm)"/>
            <Input placeholder="Vibration thres"/>
          </div>
          <Button>Save</Button>
        </CardContent>
      </Card>

      <Card className="col-span-6">
        <CardHeader><CardTitle>Alert History</CardTitle></CardHeader>
        <CardContent className="space-y-2 text-sm">
          {Array.from({length:8}).map((_,i)=>(
            <div key={i} className="flex justify-between border rounded p-2 bg-white">
              <span>Critical • Zone A-7 • Pore pressure spike</span>
              <span className="text-xs text-gray-500">00:0{i}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
