import React, { useState, useEffect } from "react";
import axios from "axios";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { PLYLoader } from "three/examples/jsm/loaders/PLYLoader";
import * as THREE from "three";

function PlyModel({ url }) {
  const [geometry, setGeometry] = useState(null);

  useEffect(() => {
    if (!url) return;
    const loader = new PLYLoader();

    loader.load(url, (geo) => {
      geo.computeVertexNormals();
      geo.center();

      // Rotate to make it stand vertically
      geo.rotateX(-Math.PI / 2);

      // Auto scale to fit
      const box = new THREE.Box3().setFromBufferAttribute(
        geo.getAttribute("position")
      );
      const size = box.getSize(new THREE.Vector3()).length();
      const scale = 5 / size;
      geo.scale(scale, scale, scale);
      const positions = geo.getAttribute("position");
      const colors = [];
      const color = new THREE.Color();

      let minY = Infinity, maxY = -Infinity;
      for (let i = 0; i < positions.count; i++) {
        const y = positions.getY(i);
        minY = Math.min(minY, y);
        maxY = Math.max(maxY, y);
      }

      for (let i = 0; i < positions.count; i++) {
        const y = positions.getY(i);
        const t = (y - minY) / (maxY - minY);
        color.setHSL(0.3 * (1 - t), 1.0, 0.5); 
        colors.push(color.r, color.g, color.b);
      }

      geo.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));

      setGeometry(geo);
    });
  }, [url]);

  if (!geometry) return null;

  return (
    <mesh geometry={geometry}>
      <meshStandardMaterial
        vertexColors={true}
        roughness={0.6}
        metalness={0.1}
      />
    </mesh>
  );
}

export default function Image() {
  const [file, setFile] = useState(null);
  const [plyUrl, setPlyUrl] = useState(null);

  const handleUpload = async () => {
    if (!file) return alert("Please select a .ply file");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("http://localhost:8000/upload/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setPlyUrl(`http://localhost:8000${res.data.file_url}`);
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Upload failed, check console");
    }
  };

  return (
    <div className="flex flex-col items-center p-8 space-y-4">
      <h1 className="text-2xl font-bold">3D Image Viewer</h1>

      <input
        type="file"
        accept=".ply"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button
        type="button"
        onClick={handleUpload}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Upload & View
      </button>

      <div className="mt-6 w-full h-[500px] border rounded-lg">
        {plyUrl && (
          <Canvas
            camera={{ position: [0, 2, 8], fov: 60 }}
            gl={{ preserveDrawingBuffer: true }}
          >
            {/* Lights */}
            <ambientLight intensity={0.6} />
            <directionalLight position={[5, 5, 5]} intensity={1.2} />

            {/* Grid (acts as floor) */}
            <gridHelper args={[10, 10, "#444", "#888"]} />
            <axesHelper args={[2]} />

            {/* Model */}
            <PlyModel url={plyUrl} />

            {/* Orbit Controls */}
            <OrbitControls
              enablePan={true}
              enableZoom={true}
              minDistance={2}
              maxDistance={20}
              maxPolarAngle={Math.PI / 2}
            />
          </Canvas>
        )}
      </div>
    </div>
  );
}
