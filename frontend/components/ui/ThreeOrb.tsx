'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import useUIStore from '@/stores/ui-store';
import styles from './ThreeOrb.module.css';

const EARTH_RADIUS = 5;
const NODE_RADIUS_MIN = EARTH_RADIUS * 1.02;
const NODE_RADIUS_RANGE = EARTH_RADIUS * 0.04;
const EARTH_TEXTURE_PATH = '/textures/earth/earth_day_4k.png';

export default function ThreeOrb() {
  const containerRef = useRef<HTMLDivElement>(null);
  const theme = useUIStore((s) => s.theme);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
    camera.position.z = 15;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    const updateSize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    updateSize();
    container.appendChild(renderer.domElement);

    const sphereSegments = window.innerWidth < 768 ? 48 : 64;

    const textureLoader = new THREE.TextureLoader();
    const earthTexture = textureLoader.load(EARTH_TEXTURE_PATH);
    earthTexture.colorSpace = THREE.SRGBColorSpace;
    earthTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();

    const earthGeometry = new THREE.SphereGeometry(
      EARTH_RADIUS,
      sphereSegments,
      sphereSegments,
    );
    const earthMaterial = new THREE.MeshStandardMaterial({
      map: earthTexture,
      roughness: 0.82,
      metalness: 0.02,
      emissive: new THREE.Color(theme === 'dark' ? 0x0a1a33 : 0x081428),
      emissiveIntensity: theme === 'dark' ? 0.18 : 0.1,
    });
    const earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
    earthMesh.renderOrder = 0;

    const atmosphereGeometry = new THREE.SphereGeometry(
      EARTH_RADIUS * 1.035,
      Math.max(32, sphereSegments - 16),
      Math.max(32, sphereSegments - 16),
    );
    const atmosphereMaterial = new THREE.MeshBasicMaterial({
      color: theme === 'dark' ? 0x3d7dff : 0x5a9fff,
      transparent: true,
      opacity: theme === 'dark' ? 0.07 : 0.05,
      side: THREE.BackSide,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const atmosphereMesh = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    atmosphereMesh.renderOrder = 1;

    const ambientLight = new THREE.AmbientLight(0xffffff, theme === 'dark' ? 0.45 : 0.55);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xffffff, theme === 'dark' ? 1.35 : 1.1);
    sunLight.position.set(8, 4, 6);
    scene.add(sunLight);

    const rimLight = new THREE.DirectionalLight(
      theme === 'dark' ? 0x4488ff : 0x6699ff,
      0.25,
    );
    rimLight.position.set(-6, -2, -4);
    scene.add(rimLight);

    const particles = 400;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particles * 3);
    const colors = new Float32Array(particles * 3);
    const color1 = new THREE.Color(theme === 'dark' ? '#2563ff' : '#1a4de0');
    const color2 = new THREE.Color(theme === 'dark' ? '#22d3ee' : '#2563ff');
    const color3 = new THREE.Color('#8b5cf6');

    for (let i = 0; i < particles; i++) {
      const phi = Math.acos(-1 + (2 * i) / particles);
      const theta = Math.sqrt(particles * Math.PI) * phi;
      const r = NODE_RADIUS_MIN + Math.random() * NODE_RADIUS_RANGE;

      positions[i * 3] = r * Math.cos(theta) * Math.sin(phi);
      positions[i * 3 + 1] = r * Math.sin(theta) * Math.sin(phi);
      positions[i * 3 + 2] = r * Math.cos(phi);

      const mixedColor = color1
        .clone()
        .lerp(Math.random() > 0.5 ? color2 : color3, Math.random());
      colors[i * 3] = mixedColor.r;
      colors[i * 3 + 1] = mixedColor.g;
      colors[i * 3 + 2] = mixedColor.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const pointMaterial = new THREE.PointsMaterial({
      size: 0.15,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const points = new THREE.Points(geometry, pointMaterial);
    points.renderOrder = 2;

    const lineMaterial = new THREE.LineBasicMaterial({
      color: theme === 'dark' ? 0x2563ff : 0x1a4de0,
      transparent: true,
      opacity: theme === 'dark' ? 0.15 : 0.1,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const lineGeometry = new THREE.BufferGeometry();
    const linePositions: number[] = [];

    for (let i = 0; i < particles; i++) {
      for (let j = i + 1; j < particles; j++) {
        const dx = positions[i * 3] - positions[j * 3];
        const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
        const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < 2.5) {
          linePositions.push(
            positions[i * 3],
            positions[i * 3 + 1],
            positions[i * 3 + 2],
            positions[j * 3],
            positions[j * 3 + 1],
            positions[j * 3 + 2],
          );
        }
      }
    }

    lineGeometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(linePositions, 3),
    );
    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    lines.renderOrder = 2;

    const group = new THREE.Group();
    group.add(earthMesh);
    group.add(atmosphereMesh);
    group.add(points);
    group.add(lines);
    scene.add(group);

    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      group.rotation.y += 0.002;
      group.rotation.x += 0.001;
      group.position.y = Math.sin(Date.now() * 0.001) * 0.3;
      renderer.render(scene, camera);
    };
    animate();

    window.addEventListener('resize', updateSize);

    return () => {
      window.removeEventListener('resize', updateSize);
      cancelAnimationFrame(animationFrameId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      earthGeometry.dispose();
      earthMaterial.dispose();
      earthTexture.dispose();
      atmosphereGeometry.dispose();
      atmosphereMaterial.dispose();
      geometry.dispose();
      pointMaterial.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      renderer.dispose();
    };
  }, [theme]);

  return (
    <div ref={containerRef} className={styles.orbContainer}>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-electric-500/20 dark:bg-electric-500/30 rounded-full blur-[80px] pointer-events-none" />
    </div>
  );
}
