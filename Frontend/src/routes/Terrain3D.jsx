import { Canvas } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

function DemoTerrain(){
  return (
    <mesh rotation-x={-0.6}>
      <boxGeometry args={[5,0.4,5]}/>
      <meshStandardMaterial />
    </mesh>
  );
}

export default function Terrain3D(){
  return (
    <Card>
      <CardHeader><CardTitle>Interactive 3D Terrain (placeholder)</CardTitle></CardHeader>
      <CardContent className="h-[500px]">
        <Canvas camera={{ position:[6,6,6] }}>
          <ambientLight />
          <directionalLight position={[5,10,5]} />
          <DemoTerrain />
          <OrbitControls />
          <Html position={[0,0.3,0]}><div className="text-xs bg-white/80 px-2 py-1 rounded">Risk overlay coming soon</div></Html>
        </Canvas>
      </CardContent>
    </Card>
  );
}
