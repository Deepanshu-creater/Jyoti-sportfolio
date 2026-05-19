import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshTransmissionMaterial, Float, Trail, Sparkles } from "@react-three/drei";
import * as THREE from "three";

// Glowing edge light strip
function RGBStrip({ position, rotation, color = "#00ffff", length = 1.2 }) {
  const meshRef = useRef();
  useFrame(({ clock }) => {
    if (meshRef.current) {
      const t = clock.getElapsedTime();
      meshRef.current.material.emissiveIntensity = 1.5 + Math.sin(t * 2) * 0.5;
    }
  });
  return (
    <mesh ref={meshRef} position={position} rotation={rotation}>
      <boxGeometry args={[length, 0.025, 0.025]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={1.5}
        toneMapped={false}
      />
    </mesh>
  );
}

// Single fan blade group
function Fan({ position, size = 0.18 }) {
  const fanRef = useRef();
  useFrame(() => {
    if (fanRef.current) fanRef.current.rotation.z += 0.04;
  });
  return (
    <group position={position}>
      {/* Fan ring */}
      <mesh>
        <torusGeometry args={[size, 0.015, 8, 32]} />
        <meshStandardMaterial color="#1a1a2e" metalness={0.8} roughness={0.3} />
      </mesh>
      {/* Fan blades */}
      <group ref={fanRef}>
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <mesh
            key={i}
            rotation={[0, 0, (i / 6) * Math.PI * 2]}
            position={[0, size * 0.45, 0]}
          >
            <boxGeometry args={[0.04, size * 0.5, 0.01]} />
            <meshStandardMaterial color="#222244" metalness={0.9} roughness={0.2} />
          </mesh>
        ))}
      </group>
      {/* Center hub */}
      <mesh>
        <cylinderGeometry args={[0.03, 0.03, 0.02, 16]} rotation={[Math.PI / 2, 0, 0]} />
        <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={2} toneMapped={false} />
      </mesh>
    </group>
  );
}

// Monitor
function Monitor({ position }) {
  const screenRef = useRef();
  useFrame(({ clock }) => {
    if (screenRef.current) {
      const t = clock.getElapsedTime();
      screenRef.current.material.emissiveIntensity = 0.8 + Math.sin(t * 0.5) * 0.1;
    }
  });

  return (
    <group position={position}>
      {/* Monitor bezel */}
      <mesh>
        <boxGeometry args={[2.2, 1.35, 0.08]} />
        <meshStandardMaterial color="#111122" metalness={0.7} roughness={0.3} />
      </mesh>
      {/* Screen */}
      <mesh ref={screenRef} position={[0, 0, 0.045]}>
        <boxGeometry args={[2.05, 1.2, 0.01]} />
        <meshStandardMaterial
          color="#050520"
          emissive="#1a00ff"
          emissiveIntensity={0.8}
          toneMapped={false}
        />
      </mesh>
      {/* Screen glow lines (fake scanlines effect) */}
      {[-0.35, 0, 0.35].map((y, i) => (
        <mesh key={i} position={[0, y, 0.052]}>
          <boxGeometry args={[1.8, 0.002, 0.001]} />
          <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={3} toneMapped={false} />
        </mesh>
      ))}
      {/* RGB bottom strip */}
      <RGBStrip position={[0, -0.65, 0.05]} rotation={[0, 0, 0]} color="#ff00ff" length={2.2} />
      {/* Stand neck */}
      <mesh position={[0, -0.85, 0]}>
        <boxGeometry args={[0.1, 0.3, 0.08]} />
        <meshStandardMaterial color="#111122" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Stand base */}
      <mesh position={[0, -1.0, 0]}>
        <boxGeometry args={[0.7, 0.04, 0.4]} />
        <meshStandardMaterial color="#111122" metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  );
}

// PC Tower
function PCTower({ position }) {
  return (
    <group position={position}>
      {/* Main chassis */}
      <mesh>
        <boxGeometry args={[0.7, 1.6, 1.1]} />
        <meshStandardMaterial color="#0d0d1a" metalness={0.6} roughness={0.4} />
      </mesh>
      {/* Glass side panel */}
      <mesh position={[0.36, 0, 0]}>
        <boxGeometry args={[0.01, 1.55, 1.05]} />
        <meshStandardMaterial
          color="#88aaff"
          transparent
          opacity={0.12}
          metalness={0.1}
          roughness={0}
        />
      </mesh>
      {/* RGB strips on chassis */}
      <RGBStrip position={[0.36, 0.55, 0]} rotation={[0, 0, 0]} color="#00ffff" length={1.0} />
      <RGBStrip position={[0.36, -0.55, 0]} rotation={[0, 0, 0]} color="#00ffff" length={1.0} />
      {/* Fans visible through glass */}
      <Fan position={[0.3, 0.3, 0.1]} size={0.2} />
      <Fan position={[0.3, -0.2, 0.1]} size={0.2} />
      {/* Front panel buttons */}
      <mesh position={[0, 0.72, 0.3]}>
        <cylinderGeometry args={[0.025, 0.025, 0.02, 16]} />
        <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={2} toneMapped={false} />
      </mesh>
      {/* Ventilation slits */}
      {[-0.2, 0, 0.2].map((z, i) => (
        <mesh key={i} position={[-0.352, 0.4, z]}>
          <boxGeometry args={[0.01, 0.04, 0.08]} />
          <meshStandardMaterial color="#222244" metalness={0.9} roughness={0.1} />
        </mesh>
      ))}
      {/* Bottom RGB */}
      <RGBStrip position={[0, -0.81, 0]} rotation={[0, 0, 0]} color="#ff00aa" length={0.7} />
    </group>
  );
}

// Keyboard
function Keyboard({ position }) {
  const keys = useMemo(() => {
    const k = [];
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 14; col++) {
        k.push({ x: col * 0.072 - 0.48, z: row * 0.072 - 0.14, row, col });
      }
    }
    return k;
  }, []);

  return (
    <group position={position} rotation={[-0.1, 0, 0]}>
      {/* Base plate */}
      <mesh>
        <boxGeometry args={[1.1, 0.025, 0.38]} />
        <meshStandardMaterial color="#0d0d1a" metalness={0.7} roughness={0.3} />
      </mesh>
      {/* Keys */}
      {keys.map(({ x, z, row, col }, i) => {
        const hue = (col / 14) * 360;
        const color = `hsl(${hue}, 100%, 60%)`;
        return (
          <mesh key={i} position={[x, 0.022, z]}>
            <boxGeometry args={[0.06, 0.018, 0.06]} />
            <meshStandardMaterial
              color="#111133"
              emissive={color}
              emissiveIntensity={0.6}
              metalness={0.5}
              roughness={0.5}
              toneMapped={false}
            />
          </mesh>
        );
      })}
    </group>
  );
}

// Mouse
function Mouse({ position }) {
  return (
    <group position={position}>
      <mesh>
        <boxGeometry args={[0.14, 0.04, 0.22]} />
        <meshStandardMaterial color="#0d0d1a" metalness={0.6} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0.03, -0.06]}>
        <sphereGeometry args={[0.07, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#111122" metalness={0.5} roughness={0.4} />
      </mesh>
      {/* RGB bottom glow */}
      <mesh position={[0, -0.022, 0]}>
        <boxGeometry args={[0.12, 0.002, 0.2]} />
        <meshStandardMaterial color="#ff00ff" emissive="#ff00ff" emissiveIntensity={2} toneMapped={false} />
      </mesh>
    </group>
  );
}

// Desk surface
function Desk({ position }) {
  return (
    <group position={position}>
      {/* Desktop */}
      <mesh receiveShadow>
        <boxGeometry args={[4.5, 0.06, 1.8]} />
        <meshStandardMaterial color="#1a0a05" metalness={0.1} roughness={0.8} />
      </mesh>
      {/* Desk legs */}
      {[[-2.1, -1.2], [2.1, -1.2], [-2.1, 0.6], [2.1, 0.6]].map(([x, z], i) => (
        <mesh key={i} position={[x, -0.65, z]}>
          <boxGeometry args={[0.08, 1.3, 0.08]} />
          <meshStandardMaterial color="#0d0705" metalness={0.3} roughness={0.7} />
        </mesh>
      ))}
      {/* Desk edge RGB underglow */}
      <mesh position={[0, -0.04, 0.92]}>
        <boxGeometry args={[4.5, 0.01, 0.01]} />
        <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={3} toneMapped={false} />
      </mesh>
    </group>
  );
}

// Floating particle orb
function ParticleOrb({ position }) {
  const ref = useRef();
  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.y = clock.getElapsedTime() * 0.3;
  });
  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <group position={position} ref={ref}>
        <Sparkles count={40} scale={0.6} size={2} speed={0.4} color="#00ffff" />
        <mesh>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={3} toneMapped={false} />
        </mesh>
      </group>
    </Float>
  );
}

// --- Assuming this is the main component where the setup is assembled ---

// 1. Enhanced Desk Surface (For better grounding)
const DeskSurface = () => (
  <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, -0.1, 0]}>
    <boxGeometry args={[6, 0.2, 4]} />
    <meshStandardMaterial color="#333333" roughness={0.7} metalness={0.1} />
    {/* Optional: Add a subtle wood grain texture map here for maximum realism */}
  </mesh>
);

// 2. Enhanced Monitor Component (The core change)
const Monitor = () => {
  return (
    <group position={[0, 0.5, 0]}>
      {/* Monitor Bezel/Housing */}
      <mesh rotation={[0, 0, 0]}>
        <boxGeometry args={[2.5, 2.5, 0.3]} />
        <meshStandardMaterial color="#111111" roughness={0.4} metalness={0.8} />
      </mesh>
      
      {/* The Screen Surface (Where the portfolio content goes) */}
      <mesh position={[0, 0, 0.05]}>
        <planeGeometry args={[2.4, 2.4]} />
        <meshBasicMaterial color="#000000" side={THREE.DoubleSide} />
        {/* We will overlay the simulated content onto this plane */}
        <div style={{ 
            position: 'absolute', 
            top: '10%', 
            left: '5%', 
            width: '90%', 
            height: '80%', 
            backgroundColor: '#1a1a1a', 
            color: '#e0e0e0', 
            padding: '20px', 
            boxShadow: '0 0 30px rgba(0, 255, 100, 0.3)',
            fontFamily: 'Arial, sans-serif',
            border: '1px solid #00ff64'
        }}>
          {/* Simulated Portfolio Dashboard Content */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #333', paddingBottom: '15px', marginBottom: '20px' }}>
            <h1 style={{ margin: 0, fontSize: '2em', color: '#00ff64' }}>John Doe</h1>
            <div style={{ textAlign: 'right' }}>
                <p style={{ margin: 0, fontSize: '1.1em' }}>Senior Full Stack Developer</p>
                <button style={{ background: 'none', border: '1px solid #00ff64', color: '#00ff64', padding: '8px 15px', cursor: 'pointer' }}>View Portfolio</button>
            </div>
          </div>

          {/* Navigation Tabs (The main structure) */}
          <div style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>
            <button style={{ background: 'none', border: 'none', color: '#aaa', cursor: 'pointer', fontSize: '1.1em' }}>About</button>
            <button style={{ background: 'none', border: 'none', color: '#00ff64', cursor: 'pointer', fontSize: '1.1em', borderBottom: '2px solid #00ff64' }}>Projects</button>
            <button style={{ background: 'none', border: 'none', color: '#aaa', cursor: 'pointer', fontSize: '1.1em' }}>Skills</button>
            <button style={{ background: 'none', border: 'none', color: '#aaa', cursor: 'pointer', fontSize: '1.1em' }}>Contact</button>
          </div>

          {/* Content Area (Simulating the active 'Projects' tab) */}
          <div style={{ padding: '20px', backgroundColor: '#222', borderRadius: '5px' }}>
            <h2 style={{ color: '#00ff64', borderBottom: '1px dashed #333', paddingBottom: '10px' }}>Featured Projects</h2>
            <div style={{ display: 'flex', gap: '20px', marginTop: '15px' }}>
                {/* Project Card 1 */}
                <div style={{ flex: 1, background: '#2a2a2a', padding: '15px', borderRadius: '5px', borderLeft: '3px solid #00ff64' }}>
                    <h3 style={{ margin: '0 0 5px', color: '#fff' }}>E-commerce Platform</h3>
                    <p style={{ fontSize: '0.9em', color: '#aaa' }}>React, Node.js, Stripe API</p>
                    <p style={{ fontSize: '0.85em', color: '#ccc' }}>A full-stack solution for modern retail needs.</p>
                </div>
                {/* Project Card 2 */}
                <div style={{ flex: 1, background: '#2a2a2a', padding: '15px', borderRadius: '5px', borderLeft: '3px solid #00ff64' }}>
                    <h3 style={{ margin: '0 0 5px', color: '#fff' }}>Data Visualization Tool</h3>
                    <p style={{ fontSize: '0.9em', color: '#aaa' }}>D3.js, Python, Flask</p>
                    <p style={{ fontSize: '0.85em', color: '#ccc' }}>Interactive dashboard for large datasets.</p>
                </div>
            </div>
          </div>
        </div>
      </mesh>
    </group>
  );
};

// 3. Updated Main Scene Assembly (Conceptual)
const PortfolioSetup = () => {
    return (
        <div style={{ width: '100%', height: '100vh', background: '#111' }}>
            {/* Background elements */}
            <DeskSurface />
            
            {/* The main focus: The Monitor */}
            <Monitor />
            
            {/* Other elements (Keyboard, Mouse, etc.) would go here */}
        </div>
    );
}

export default PortfolioSetup;