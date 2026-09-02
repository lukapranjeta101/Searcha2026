import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import { websites } from "../data/websites";
import { WebsiteCard } from "./WebsiteCard";

function GalleryMotion({ gallery, visible }) {
  const { camera, gl } = useThree();
  const motion = useRef({
    current: 0.18,
    target: 0.18,
    velocity: 0,
    dragging: false,
    lastX: 0,
    lastY: 0,
    lastTime: 0,
    pointerX: 0,
    pointerY: 0,
    transition: visible ? 0 : 1,
  });

  useEffect(() => {
    const element = gl.domElement;
    if (!visible) motion.current.dragging = false;

    const updatePointer = (event) => {
      const bounds = element.getBoundingClientRect();
      motion.current.pointerX = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
      motion.current.pointerY = -((event.clientY - bounds.top) / bounds.height) * 2 + 1;
    };

    const handlePointerDown = (event) => {
      if (!visible) return;
      motion.current.dragging = true;
      motion.current.lastX = event.clientX;
      motion.current.lastY = event.clientY;
      motion.current.lastTime = performance.now();
      motion.current.velocity = 0;
      element.setPointerCapture?.(event.pointerId);
    };

    const handlePointerMove = (event) => {
      updatePointer(event);
      if (!visible || !motion.current.dragging) return;

      const now = performance.now();
      const distanceX = event.clientX - motion.current.lastX;
      const distanceY = event.clientY - motion.current.lastY;
      const elapsed = Math.max(now - motion.current.lastTime, 8) / 1000;
      const rotationDelta = (distanceX - distanceY * 0.35) * 0.0042;

      motion.current.target += rotationDelta;
      motion.current.velocity = THREE.MathUtils.clamp(rotationDelta / elapsed, -2.6, 2.6);
      motion.current.lastX = event.clientX;
      motion.current.lastY = event.clientY;
      motion.current.lastTime = now;
    };

    const handlePointerUp = (event) => {
      motion.current.dragging = false;
      if (element.hasPointerCapture?.(event.pointerId)) {
        element.releasePointerCapture(event.pointerId);
      }
    };

    const handleWheel = (event) => {
      if (!visible) return;
      event.preventDefault();
      motion.current.velocity = THREE.MathUtils.clamp(
        motion.current.velocity + event.deltaY * 0.0018,
        -2.8,
        2.8,
      );
    };

    element.addEventListener("pointerdown", handlePointerDown);
    element.addEventListener("pointermove", handlePointerMove);
    element.addEventListener("pointerup", handlePointerUp);
    element.addEventListener("pointercancel", handlePointerUp);
    element.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      motion.current.dragging = false;
      element.removeEventListener("pointerdown", handlePointerDown);
      element.removeEventListener("pointermove", handlePointerMove);
      element.removeEventListener("pointerup", handlePointerUp);
      element.removeEventListener("pointercancel", handlePointerUp);
      element.removeEventListener("wheel", handleWheel);
    };
  }, [gl, visible]);

  useFrame((_, delta) => {
    if (!gallery.current) return;

    const state = motion.current;
    const safeDelta = Math.min(delta, 0.05);
    if (!state.dragging) {
      state.target += (0.038 + state.velocity) * safeDelta;
      state.velocity = THREE.MathUtils.damp(state.velocity, 0, 2.35, safeDelta);
    }

    state.current = THREE.MathUtils.damp(
      state.current,
      state.target,
      state.dragging ? 14 : 7,
      safeDelta,
    );
    gallery.current.rotation.y = state.current;
    const transitionDirection = visible ? -1 : 1;
    state.transition = THREE.MathUtils.clamp(
      state.transition + transitionDirection * (safeDelta / 0.85),
      0,
      1,
    );
    const transitionProgress = state.transition * state.transition * (3 - 2 * state.transition);
    gallery.current.rotation.z = THREE.MathUtils.lerp(0, -0.08, transitionProgress);
    gallery.current.position.y = THREE.MathUtils.lerp(0, 10.5, transitionProgress);
    const galleryScale = THREE.MathUtils.lerp(1, 0.86, transitionProgress);
    gallery.current.scale.setScalar(galleryScale);

    const pointerX = visible ? state.pointerX : 0;
    const pointerY = visible ? state.pointerY : 0;
    camera.position.x = THREE.MathUtils.damp(camera.position.x, pointerX * 0.2, 4, safeDelta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, pointerY * 0.14, 4, safeDelta);
    camera.rotation.y = THREE.MathUtils.damp(camera.rotation.y, -pointerX * 0.018, 4, safeDelta);
    camera.rotation.x = THREE.MathUtils.damp(camera.rotation.x, pointerY * 0.014, 4, safeDelta);
  });

  return null;
}

export function SpiralGallery({ visible = true }) {
  const gallery = useRef();
  const { size, gl } = useThree();
  const isMobile = size.width < 720;
  const count = 10;
  const textures = useTexture(websites.map((website) => website.image));

  const roundedMask = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 320;
    const context = canvas.getContext("2d");
    context.fillStyle = "#000000";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "#ffffff";
    context.beginPath();
    context.roundRect(2, 2, canvas.width - 4, canvas.height - 4, 22);
    context.fill();
    const mask = new THREE.CanvasTexture(canvas);
    mask.minFilter = THREE.LinearFilter;
    mask.magFilter = THREE.LinearFilter;
    return mask;
  }, []);

  useEffect(() => {
    textures.forEach((texture) => {
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.anisotropy = gl.capabilities.getMaxAnisotropy();
      texture.minFilter = THREE.LinearMipmapLinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.needsUpdate = true;
    });
  }, [gl, textures]);

  const geometry = useMemo(() => {
    const width = isMobile ? 3.48 : 5.35;
    const height = width / 1.6;
    const plane = new THREE.PlaneGeometry(width, height, 24, 4);
    const positions = plane.attributes.position;

    for (let index = 0; index < positions.count; index += 1) {
      const x = positions.getX(index);
      const normalizedX = x / (width / 2);
      positions.setZ(index, -0.11 * normalizedX * normalizedX);
    }

    plane.computeVertexNormals();
    return plane;
  }, [isMobile]);

  const cards = useMemo(() => {
    const radius = isMobile ? 7.4 : 9.8;
    const angleSpacing = (Math.PI * 2) / count;
    const featuredIndex = 4;
    const baseAngle = Math.PI - featuredIndex * angleSpacing - 0.18;

    return Array.from({ length: count }, (_, index) => {
      const angle = baseAngle + index * angleSpacing;
      const x = Math.sin(angle) * radius;
      const z = Math.cos(angle) * radius;
      const y = 0;

      return {
        id: index,
        websiteIndex: index % websites.length,
        position: [x, y, z],
        rotation: [
          Math.sin(index * 1.73) * 0.055,
          angle + Math.PI,
          Math.sin(index * 1.31) * 0.055,
        ],
      };
    });
  }, [count, isMobile]);

  useEffect(
    () => () => {
      geometry.dispose();
      roundedMask.dispose();
    },
    [geometry, roundedMask],
  );

  return (
    <>
      <group ref={gallery}>
        {cards.map((card) => (
          <WebsiteCard
            key={card.id}
            geometry={geometry}
            position={card.position}
            rotation={card.rotation}
            texture={textures[card.websiteIndex]}
            roundedMask={roundedMask}
            url={websites[card.websiteIndex].url}
          />
        ))}
      </group>
      <GalleryMotion gallery={gallery} visible={visible} />
    </>
  );
}
