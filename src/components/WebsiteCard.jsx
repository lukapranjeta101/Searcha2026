import { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function WebsiteCard({ geometry, position, rotation, texture, roundedMask, url }) {
  const mesh = useRef();
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (!hovered) return undefined;
    document.body.style.cursor = url ? "pointer" : "grab";
    return () => {
      document.body.style.cursor = "default";
    };
  }, [hovered, url]);

  useFrame((_, delta) => {
    if (!mesh.current) return;
    const targetScale = hovered ? 1.11 : 1;
    const scale = THREE.MathUtils.damp(mesh.current.scale.x, targetScale, 9, delta);
    mesh.current.scale.setScalar(scale);
  });

  return (
    <mesh
      ref={mesh}
      geometry={geometry}
      position={position}
      rotation={rotation}
      onPointerOver={(event) => {
        event.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={() => setHovered(false)}
      onClick={(event) => {
        if (!url) return;
        event.stopPropagation();
        window.open(url, "_blank", "noopener,noreferrer");
      }}
    >
      <meshBasicMaterial
        map={texture}
        alphaMap={roundedMask}
        transparent
        alphaTest={0.03}
        side={THREE.FrontSide}
        toneMapped={false}
        fog={false}
      />
    </mesh>
  );
}
