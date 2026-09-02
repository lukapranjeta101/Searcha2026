import { useMemo } from "react";
import * as THREE from "three";

export function BackgroundGrid() {
  const geometry = useMemo(() => {
    const radius = 13.2;
    const height = 24;
    const columns = 40;
    const rows = 16;
    const vertices = [];

    for (let column = 0; column < columns; column += 1) {
      const angle = (column / columns) * Math.PI * 2;
      const x = Math.sin(angle) * radius;
      const z = Math.cos(angle) * radius;

      for (let row = 0; row < rows; row += 1) {
        const y1 = -height / 2 + (row / rows) * height;
        const y2 = -height / 2 + ((row + 1) / rows) * height;
        vertices.push(x, y1, z, x, y2, z);
      }
    }

    for (let row = 0; row <= rows; row += 1) {
      const y = -height / 2 + (row / rows) * height;
      for (let column = 0; column < columns; column += 1) {
        const angle1 = (column / columns) * Math.PI * 2;
        const angle2 = ((column + 1) / columns) * Math.PI * 2;
        vertices.push(
          Math.sin(angle1) * radius,
          y,
          Math.cos(angle1) * radius,
          Math.sin(angle2) * radius,
          y,
          Math.cos(angle2) * radius,
        );
      }
    }

    const gridGeometry = new THREE.BufferGeometry();
    gridGeometry.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));
    return gridGeometry;
  }, []);

  return (
    <lineSegments geometry={geometry} renderOrder={-10}>
      <lineBasicMaterial
        color="#767c72"
        transparent
        opacity={0.42}
        depthTest={false}
        depthWrite={false}
        fog={false}
      />
    </lineSegments>
  );
}
