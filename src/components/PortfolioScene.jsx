import { Canvas } from "@react-three/fiber";
import { Preload } from "@react-three/drei";
import { BackgroundGrid } from "./BackgroundGrid";
import { SpiralGallery } from "./SpiralGallery";

export function PortfolioScene({ galleryVisible = true }) {
  return (
    <div className="scene" aria-hidden="true">
      <Canvas
        dpr={[1, 1.75]}
        camera={{ position: [0, 0, 2.8], fov: 62, near: 0.1, far: 34 }}
        gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
        onCreated={({ gl }) => {
          gl.setClearColor("#050505");
        }}
      >
        <fog attach="fog" args={["#050505", 9, 19]} />
        <BackgroundGrid />
        <SpiralGallery visible={galleryVisible} />
        <Preload all />
      </Canvas>
    </div>
  );
}
