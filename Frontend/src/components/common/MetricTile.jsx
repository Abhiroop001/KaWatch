export default function MetricTile({label,value,accent}){
  const tone = accent==="warning"?"text-amber-600":accent==="danger"?"text-red-600":"text-blue-700";
  return (
    <div className="rounded-lg border bg-white p-3">
      <div className="text-xs text-gray-500">{label}</div>
      <div className={`text-xl font-semibold ${tone}`}>{value}</div>
    </div>
  );
}
