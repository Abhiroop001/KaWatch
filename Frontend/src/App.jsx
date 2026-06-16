import { Routes, Route, Navigate } from "react-router-dom"
import Header from "./components/layout/Header"
import Sidebar from "./components/layout/Sidebar"
import Overview from "./routes/Overview"
import Monitoring from "./routes/Monitoring"
import RiskAssessment from "./routes/RiskAssessment"
import Terrain3D from "./routes/Terrain3D"
import Alerts from "./routes/Alerts"
import SystemHealth from "./routes/SystemHealth"
import WorkerTracker from "./routes/WorkerTracker"
import Prediction from "./routes/Prediction"
import Image from "./routes/Image"
import DeployModel from "./routes/DeployModel"

export default function App() {
  return (
    <div
      className="h-screen w-screen grid"
      style={{ gridTemplateColumns: "280px 1fr", gridTemplateRows: "70px 1fr" }}
    >
      {/* Sidebar */}
      <div className="row-span-2">
        <Sidebar />
      </div>

      {/* Header */}
      <div>
        <Header />
      </div>

      {/* Main Content */}
      <main className="overflow-auto bg-gray-50 p-4">
        <Routes>
          <Route path="/" element={<Navigate to="/overview" replace />} />
          <Route path="/overview" element={<Overview />} />
          <Route path="/monitoring" element={<Monitoring />} />
          <Route path="/risk" element={<RiskAssessment />} />
          <Route path="/terrain" element={<Terrain3D />} />
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/system" element={<SystemHealth />} />
          <Route path="/workers" element={<WorkerTracker />} />
          <Route path="/prediction" element={<Prediction />} />
          <Route path="/image" element={<Image />} /> 
          <Route path="/cnn" element={<DeployModel />} />
        </Routes>
      </main>
    </div>
  )
}
