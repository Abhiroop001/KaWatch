import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table,TableHeader,TableRow,TableHead,TableBody,TableCell } from "@/components/ui/table";

export default function SensorGrid({ rows }){
  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <CardTitle>Live Sensor Data</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Sensor ID</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Update</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map(r=>(
                <TableRow key={r.id}>
                  <TableCell>{r.id}</TableCell>
                  <TableCell>{r.type}</TableCell>
                  <TableCell className="font-mono">{r.value}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded text-xs ${
                      r.status==="online"?"bg-green-100 text-green-700":
                      r.status==="warning"?"bg-yellow-100 text-yellow-700":
                      "bg-gray-200 text-gray-600"
                    }`}>{r.status}</span>
                  </TableCell>
                  <TableCell>{r.updated}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
