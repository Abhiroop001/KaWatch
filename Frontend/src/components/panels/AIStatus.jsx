import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function AIStatus(){
  return (
    <Card>
      <CardHeader><CardTitle>AI Prediction Engine</CardTitle></CardHeader>
      <CardContent className="grid grid-cols-2 gap-3 text-sm">
        <div>Accuracy: <b>87.3%</b></div>
        <div>Precision: <b>0.84</b></div>
        <div>Recall: <b>0.91</b></div>
        <div>Queue: <b>23 processing / 7 pending</b></div>
        <div className="col-span-2 text-xs text-gray-500">Last update: 2025-09-05 18:05:32Z</div>
      </CardContent>
    </Card>
  );
}
