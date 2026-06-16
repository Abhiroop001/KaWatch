import { NavLink } from "react-router-dom"
import {
  Map,
  Activity,
  TriangleAlert,
  Waves,
  FileChartColumnIncreasing,
  Cpu,
  Users,
  Brain,
  Image as ImageIcon, 
} from "lucide-react"

import { Separator } from "@/components/ui/separator"

const item = (to, Icon, label) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center gap-3 px-4 py-2 rounded-md mx-3 my-1 text-sm ${
        isActive
          ? "bg-blue-100 text-blue-800"
          : "text-gray-700 hover:bg-gray-100"
      }`
    }
  >
    <Icon className="h-4 w-4" />
    <span>{label}</span>
  </NavLink>
)

export default function Sidebar() {
  return (
    <aside className="h-full bg-white border-r">
      {/* Logo / Title */}
      <div className="px-4 py-4 text-lg font-bold text-blue-900">
        Rockfall AI
      </div>

      <Separator />

      {/* Navigation Menu */}
      <nav className="mt-2">
        {item("/overview", Map, "Overview Dashboard")}
        {item("/monitoring", Activity, "Real-time Monitoring")}
        {item("/risk", FileChartColumnIncreasing, "Risk Assessment")}
        {item("/alerts", TriangleAlert, "Alert Management")}
        {item("/system", Cpu, "System Health")}
        {item("/prediction", Brain, "Prediction")}
        {item("/image", ImageIcon, "3D Terrain View")} 
        {item("/cnn", ImageIcon, "model")}
        {/* Worker Tracker */}
        <li className="list-none">
          <NavLink
            to="/workers"
            className={({ isActive }) =>
              `flex items-center gap-2 px-4 py-2 rounded-md mx-3 my-1 text-sm ${
                isActive
                  ? "bg-blue-100 text-blue-800"
                  : "text-gray-700 hover:bg-gray-100"
              }`
            }
          >
            <Users className="w-4 h-4" />
            <span>Worker Tracker</span>
          </NavLink>
        </li>
      </nav>
    </aside>
  )
}
