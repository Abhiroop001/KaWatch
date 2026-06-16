export const riskPoints = [
  { id: "A-7", lat: 23.814, lng: 86.441, risk: 0.73 },
  { id: "B-3", lat: 23.812, lng: 86.438, risk: 0.45 },
  { id: "E-1", lat: 23.810, lng: 86.445, risk: 0.20 },
];

export const sensorRows = Array.from({length: 20}).map((_,i)=>({
  id: "SNS-"+(1000+i),
  type: ["Displacement","Strain","Pore Pressure","Accel","Weather"][i%5],
  value: (Math.random()*3+0.2).toFixed(2),
  status: ["online","online","online","warning","offline"][i%5],
  updated: "00:"+(i<10?"0"+i:i)
}));

export const trendData = [
  {t:"00:00", val:12},{t:"01:00",val:18},{t:"02:00",val:15},{t:"03:00",val:24},{t:"04:00",val:26},{t:"05:00",val:31},{t:"06:00",val:34}
];
