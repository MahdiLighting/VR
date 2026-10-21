import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Environment as DreiEnv, ContactShadows, Float } from "@react-three/drei";
import * as THREE from "three";
import { environments } from "@/data/vrContent";
import type { EnvironmentId } from "@/data/vrContent";

function PanoramicDome({ envId }: { envId: EnvironmentId }) {
  const env = environments.find((e) => e.id === envId) ?? environments[0];
  const tex = useLoader(THREE.TextureLoader, env.sky);

  useMemo(() => {
    tex.mapping = THREE.EquirectangularReflectionMapping;
    tex.colorSpace = THREE.SRGBColorSpace;
  }, [tex]);

  return (
    <mesh scale={[-1, 1, 1]} frustumCulled={false}>
      <sphereGeometry args={[60, 64, 32]} />
      <meshBasicMaterial map={tex} side={THREE.BackSide} toneMapped={false} />
    </mesh>
  );
}

function FloatingParticles() {
  const ref = useRef<THREE.Points>(null);
  const count = 120;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 18;
      arr[i * 3 + 1] = Math.random() * 6 + 0.5;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 12;
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.rotation.y = t * 0.008;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.04} color="#ffffff" transparent opacity={0.5} sizeAttenuation depthWrite={false} />
    </points>
  );
}

function FloorDisc({ color }: { color: string }) {
  return (
    <>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.4, 0]} receiveShadow>
        <circleGeometry args={[14, 64]} />
        <meshStandardMaterial color={color} roughness={0.4} metalness={0.5} />
      </mesh>
      <ContactShadows position={[0, -1.39, 0]} opacity={0.5} scale={20} blur={2.5} far={6} />
    </>
  );
}

function DockPlatform() {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.position.y = -1.35 + Math.sin(state.clock.elapsedTime * 0.4) * 0.02;
  });
  return (
    <group ref={ref}>
      <mesh position={[0, 0, -1.2]}>
        <cylinderGeometry args={[3.2, 3.4, 0.12, 48]} />
        <meshStandardMaterial
          color="#0f172a"
          emissive="#1e3a5f"
          emissiveIntensity={0.4}
          roughness={0.2}
          metalness={0.7}
          transparent
          opacity={0.85}
        />
      </mesh>
      <mesh position={[0, 0.06, -1.2]}>
        <torusGeometry args={[3.2, 0.02, 16, 80]} />
        <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={1.2} />
      </mesh>
    </group>
  );
}

function AmbientOrb({ position, color, speed = 1 }: { position: [number, number, number]; color: string; speed?: number }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime * speed;
    ref.current.position.y = position[1] + Math.sin(t) * 0.15;
  });
  return (
    <Float speed={2} rotationIntensity={0.4} floatIntensity={0.6}>
      <mesh ref={ref} position={position}>
        <icosahedronGeometry args={[0.12, 1]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.5} roughness={0.2} />
        <pointLight color={color} intensity={0.5} distance={3} />
      </mesh>
    </Float>
  );
}

function Rig() {
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    state.camera.position.x = Math.sin(t * 0.08) * 0.15;
    state.camera.position.y = 0.3 + Math.sin(t * 0.1) * 0.05;
    state.camera.lookAt(0, 0.5, -1.2);
  });
  return null;
}

interface SceneProps {
  environment: EnvironmentId;
}

export default function VRScene({ environment }: SceneProps) {
  const env = environments.find((e) => e.id === environment) ?? environments[0];
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ position: [0, 0.3, 2.5], fov: 72, near: 0.1, far: 100 }}
      gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
    >
      <color attach="background" args={[env.floor]} />
      <fog attach="fog" args={[env.floor, 8, 45]} />
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 8, 3]} intensity={1.2} castShadow color="#fff5e6" />
      <pointLight position={[-4, 3, 2]} intensity={0.5} color={env.accent} />

      <Suspense fallback={null}>
        <PanoramicDome envId={environment} />
        <DreiEnv preset="sunset" />
      </Suspense>

      <FloorDisc color={env.floor} />
      <DockPlatform />
      <FloatingParticles />

      <AmbientOrb position={[-3, 1.5, -2]} color={env.accent} speed={0.8} />
      <AmbientOrb position={[3, 1.8, -1.5]} color="#38bdf8" speed={1.1} />
      <AmbientOrb position={[-2, 2.4, -3]} color="#a78bfa" speed={0.6} />

      <Rig />
    </Canvas>
  );
}
