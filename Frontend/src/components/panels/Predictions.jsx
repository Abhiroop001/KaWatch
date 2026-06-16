import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function RecentPredictions() {
  const predictions = [
    { zone: "A-7", prob: 73, eta: "2h" },
    { zone: "B-3", prob: 45, eta: "6h" },
  ];

  return (
    <Card className="w-72 shadow-md rounded-xl">
      <CardHeader>
        <CardTitle className="text-base font-semibold">Recent Predictions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {predictions.map((p, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between border-b pb-2 last:border-0 last:pb-0"
          >
            <div className="text-sm font-medium">{p.zone}</div>
            <div className="text-sm">
              <span className="font-bold text-blue-600">{p.prob}%</span>
              <span className="ml-2 text-gray-500">ETA {p.eta}</span>
            </div>
          </div>
        ))}
        <div className="pt-2 text-xs text-gray-500">
          Model accuracy (last 24h): <span className="font-semibold">87.3%</span>
        </div>
      </CardContent>
    </Card>
  );
}
