import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Inner 3D Globe with rotating wireframe, surface gradient particles, floating nodes, and network connections
const GlobeScene = ({ inView }) => {
  const groupRef = useRef();
  const innerSphereRef = useRef();

  // Generate surface points, floating nodes, and connecting lines with vibrant gradient colors
  const {
    surfacePositions,
    surfaceColors,
    floatingPositions,
    floatingColors,
    linePositions,
    lineColors,
  } = useMemo(() => {
    const RADIUS = 1.35;
    const SURFACE_COUNT = typeof window !== 'undefined' && window.innerWidth < 768 ? Math.floor(620 * 0.35) : 620;
    const FLOATING_COUNT = typeof window !== 'undefined' && window.innerWidth < 768 ? Math.floor(90 * 0.35) : 90;
    const MAX_CONNECTION_DISTANCE = 0.8;

    // Gradient Palette: Electric Cyan -> Primary Purple -> Cosmic Pink
    const colorCyan = new THREE.Color('#38bdf8');
    const colorPrimary = new THREE.Color('#8b5cf6');
    const colorPink = new THREE.Color('#ec4899');

    const getGradientColor = (y, maxR) => {
      const normY = THREE.MathUtils.clamp((y / maxR + 1) / 2, 0, 1);
      const color = new THREE.Color();
      if (normY < 0.5) {
        color.lerpColors(colorCyan, colorPrimary, normY * 2);
      } else {
        color.lerpColors(colorPrimary, colorPink, (normY - 0.5) * 2);
      }
      return color;
    };

    // 1. Surface points using spherical Fibonacci distribution
    const surface = new Float32Array(SURFACE_COUNT * 3);
    const surfaceCol = new Float32Array(SURFACE_COUNT * 3);
    const goldenRatio = (1 + Math.sqrt(5)) / 2;

    for (let i = 0; i < SURFACE_COUNT; i++) {
      const theta = (2 * Math.PI * i) / goldenRatio;
      const phi = Math.acos(1 - (2 * (i + 0.5)) / SURFACE_COUNT);

      const x = RADIUS * Math.sin(phi) * Math.cos(theta);
      const y = RADIUS * Math.sin(phi) * Math.sin(theta);
      const z = RADIUS * Math.cos(phi);

      surface[i * 3] = x;
      surface[i * 3 + 1] = y;
      surface[i * 3 + 2] = z;

      const col = getGradientColor(y, RADIUS);
      surfaceCol[i * 3] = col.r;
      surfaceCol[i * 3 + 1] = col.g;
      surfaceCol[i * 3 + 2] = col.b;
    }

    // 2. Floating nodes around and slightly outside the sphere
    const floating = [];
    const floatingFlat = new Float32Array(FLOATING_COUNT * 3);
    const floatingCol = new Float32Array(FLOATING_COUNT * 3);

    for (let i = 0; i < FLOATING_COUNT; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = 2 * Math.PI * u;
      const phi = Math.acos(2 * v - 1);
      const r = RADIUS * (1.08 + Math.random() * 0.36);

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      floating.push(new THREE.Vector3(x, y, z));
      floatingFlat[i * 3] = x;
      floatingFlat[i * 3 + 1] = y;
      floatingFlat[i * 3 + 2] = z;

      const col = getGradientColor(y, RADIUS * 1.4);
      floatingCol[i * 3] = col.r;
      floatingCol[i * 3 + 1] = col.g;
      floatingCol[i * 3 + 2] = col.b;
    }

    // 3. Connect close floating nodes with gradient lines
    const lineCoords = [];
    const lineCols = [];
    for (let i = 0; i < floating.length; i++) {
      for (let j = i + 1; j < floating.length; j++) {
        const dist = floating[i].distanceTo(floating[j]);
        if (dist < MAX_CONNECTION_DISTANCE) {
          lineCoords.push(
            floating[i].x, floating[i].y, floating[i].z,
            floating[j].x, floating[j].y, floating[j].z
          );

          const col1 = getGradientColor(floating[i].y, RADIUS * 1.4);
          const col2 = getGradientColor(floating[j].y, RADIUS * 1.4);
          lineCols.push(col1.r, col1.g, col1.b, col2.r, col2.g, col2.b);
        }
      }
    }

    return {
      surfacePositions: surface,
      surfaceColors: surfaceCol,
      floatingPositions: floatingFlat,
      floatingColors: floatingCol,
      linePositions: new Float32Array(lineCoords),
      lineColors: new Float32Array(lineCols),
    };
  }, []);

  // Continuous auto-rotation on Y and X axes
  useFrame((_, delta) => {
    if (!inView) return; // double ensure
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.18;
      groupRef.current.rotation.x += delta * 0.05;
    }
    if (innerSphereRef.current) {
      innerSphereRef.current.rotation.y -= delta * 0.09;
    }
  });

  return (
    <group ref={groupRef}>
      {/* 0. Soft inner luminous core */}
      <mesh>
        <sphereGeometry args={[0.95, 16, 16]} />
        <meshBasicMaterial
          color="#8b5cf6"
          transparent
          opacity={0.04}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* 1. Subtle tech wireframe sphere */}
      <mesh ref={innerSphereRef}>
        <sphereGeometry args={[1.35, 20, 20]} />
        <meshBasicMaterial
          wireframe
          color="#a855f7"
          transparent
          opacity={0.07}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* 2. Surface particle nodes with multi-color gradient */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={surfacePositions.length / 3}
            array={surfacePositions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={surfaceColors.length / 3}
            array={surfaceColors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.038}
          vertexColors={true}
          transparent
          opacity={0.58}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* 3. Floating outer nodes with gradient colors */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={floatingPositions.length / 3}
            array={floatingPositions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={floatingColors.length / 3}
            array={floatingColors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.054}
          vertexColors={true}
          transparent
          opacity={0.75}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* 4. Network connecting lines with vertex gradient colors */}
      {linePositions.length > 0 && (
        <lineSegments>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={linePositions.length / 3}
              array={linePositions}
              itemSize={3}
            />
            <bufferAttribute
              attach="attributes-color"
              count={lineColors.length / 3}
              array={lineColors}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial
            vertexColors={true}
            transparent
            opacity={0.24}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </lineSegments>
      )}
    </group>
  );
};

/**
 * ParticleGlobe Component
 * Fully responsive 3D tech globe with transparent Canvas background.
 * Multi-color gradient particles (Cyan -> Primary Purple -> Cosmic Pink).
 */
const ParticleGlobe = ({ className = 'w-full h-full' }) => {
  const containerRef = useRef(null);
  const [inView, setInView] = useState(true);

  useEffect(() => {
    // Intersection Observer to pause rendering when out of view
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold: 0 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={containerRef} className={`relative ${className} pointer-events-none transform-gpu`} style={{ transform: 'translateZ(0)' }}>
      <Canvas
        frameloop={inView ? 'always' : 'never'}
        dpr={Math.min(window.devicePixelRatio || 1, 1.5)}
        camera={{ position: [0, 0, 5.6], fov: 48 }}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
        style={{
          width: '100%',
          height: '100%',
          background: 'transparent',
          pointerEvents: 'none',
        }}
      >
        <ambientLight intensity={0.5} />
        <GlobeScene inView={inView} />
      </Canvas>
    </div>
  );
};

export default ParticleGlobe;
