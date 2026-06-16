import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const AlertCard = ({severity="high", count=0})=>{
  const map = { critical:"bg-red-600", high:"bg-orange-500", medium:"bg-yellow-400" };
  return (
    <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 border">
      <div className="flex items-center gap-2">
        <span className={`h-3 w-3 rounded-full ${map[severity]}`}/>
        <span className="capitalize">{severity}</span>
      </div>
      <b>{count}</b>
    </div>
  );
}

export default function AlertsPanel(){
  return (
    <Card className="col-span-8">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Safety Alert Center</CardTitle>
        <div className="space-x-2">
          <Button variant="destructive">Evacuate Zone</Button>
          <Button variant="outline">Pause Operations</Button>
          <Button>Contact Emergency</Button>
        </div>
      </CardHeader>
      <CardContent className="grid grid-cols-3 gap-3">
        <AlertCard severity="critical" count={3}/>
        <AlertCard severity="high" count={7}/>
        <AlertCard severity="medium" count={12}/>
      </CardContent>
    </Card>
  );
}
