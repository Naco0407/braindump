import { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { globeMarkers, type GlobeMarker } from '../data/sampleData';

function latLngToVector3(lat: number, lng: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -(radius * Math.sin(phi) * Math.cos(theta)),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

const typeColors: Record<string, string> = {
  person: '#a78bfa',
  company: '#4de1f2',
  place: '#f2a94d',
};

function GlobeSphere() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.05;
    }
  });

  const wireframeMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          color1: { value: new THREE.Color('#1a1c28') },
          color2: { value: new THREE.Color('#2a3040') },
          glowColor: { value: new THREE.Color('#4de1f2') },
        },
        vertexShader: `
          varying vec3 vNormal;
          varying vec3 vPosition;
          void main() {
            vNormal = normalize(normalMatrix * normal);
            vPosition = position;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          varying vec3 vNormal;
          varying vec3 vPosition;
          uniform vec3 color1;
          uniform vec3 color2;
          uniform vec3 glowColor;
          void main() {
            float fresnel = pow(1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0))), 2.5);
            vec3 base = mix(color1, color2, fresnel * 0.5);
            vec3 glow = glowColor * fresnel * 0.3;
            gl_FragColor = vec4(base + glow, 0.85);
          }
        `,
        transparent: true,
        side: THREE.FrontSide,
      }),
    []
  );

  return (
    <group ref={meshRef}>
      <mesh material={wireframeMaterial}>
        <sphereGeometry args={[2, 48, 48]} />
      </mesh>
      <mesh>
        <sphereGeometry args={[2.005, 32, 32]} />
        <meshBasicMaterial color="#1a1c28" wireframe opacity={0.4} transparent />
      </mesh>
    </group>
  );
}

function Marker({ marker }: { marker: GlobeMarker }) {
  const pos = latLngToVector3(marker.lat, marker.lng, 2.05);
  const color = typeColors[marker.type];
  const [hovered, setHovered] = useState(false);

  return (
    <group position={pos}>
      <mesh
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
      >
        <sphereGeometry args={[hovered ? 0.05 : 0.035, 12, 12]} />
        <meshBasicMaterial color={color} />
      </mesh>
      <pointLight color={color} intensity={hovered ? 2 : 0.5} distance={0.5} />
      {hovered && (
        <sprite position={[0, 0.12, 0]} scale={[1.2, 0.3, 1]}>
          <spriteMaterial opacity={0} transparent />
        </sprite>
      )}
    </group>
  );
}

function Markers() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {globeMarkers.map((m) => (
        <Marker key={m.id} marker={m} />
      ))}
    </group>
  );
}

function Atmosphere() {
  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          glowColor: { value: new THREE.Color('#4de1f2') },
        },
        vertexShader: `
          varying vec3 vNormal;
          void main() {
            vNormal = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          varying vec3 vNormal;
          uniform vec3 glowColor;
          void main() {
            float intensity = pow(0.6 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 3.0);
            gl_FragColor = vec4(glowColor, intensity * 0.4);
          }
        `,
        transparent: true,
        side: THREE.BackSide,
      }),
    []
  );

  return (
    <mesh material={material}>
      <sphereGeometry args={[2.3, 48, 48]} />
    </mesh>
  );
}

function GlobeTooltip({ markers }: { markers: GlobeMarker[] }) {
  return (
    <div className="globe-legend">
      {Object.entries(typeColors).map(([type, color]) => (
        <span key={type} className="globe-legend-item">
          <span className="globe-legend-dot" style={{ background: color }} />
          {type === 'person' ? '人物' : type === 'company' ? '企業' : '地域'}
          <span className="globe-legend-count">
            {markers.filter(m => m.type === type).length}
          </span>
        </span>
      ))}
    </div>
  );
}

export default function Globe() {
  return (
    <div className="card globe-card">
      <div className="card-header">
        <div className="card-icon" style={{ color: 'var(--accent-cyan)' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <path d="M2 12h20"/>
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
          </svg>
        </div>
        <h3 className="card-title">World Map</h3>
      </div>
      <div className="globe-canvas-wrapper" style={{ position: 'relative', flex: 1, minHeight: 0 }}>
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }} style={{ position: 'absolute', inset: 0 }}>
          <ambientLight intensity={0.1} />
          <GlobeSphere />
          <Markers />
          <Atmosphere />
          <OrbitControls
            enableZoom={true}
            enablePan={false}
            minDistance={3}
            maxDistance={8}
            autoRotate={false}
            rotateSpeed={0.5}
          />
        </Canvas>
      </div>
      <GlobeTooltip markers={globeMarkers} />
    </div>
  );
}
