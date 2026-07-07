import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useApp } from '../contexts/AppContext';
export function ThreeOrb() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useApp();
  useEffect(() => {
    if (!containerRef.current) return;
    // Scene setup
    const scene = new THREE.Scene();
    // Camera setup
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
    camera.position.z = 15;
    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    const updateSize = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    updateSize();
    containerRef.current.appendChild(renderer.domElement);
    // Create Neural Network Sphere
    const particles = 400;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particles * 3);
    const colors = new Float32Array(particles * 3);
    const color1 = new THREE.Color(theme === 'dark' ? '#2563ff' : '#1a4de0');
    const color2 = new THREE.Color(theme === 'dark' ? '#22d3ee' : '#2563ff');
    const color3 = new THREE.Color(theme === 'dark' ? '#8b5cf6' : '#8b5cf6');
    for (let i = 0; i < particles; i++) {
      // Spherical distribution
      const phi = Math.acos(-1 + 2 * i / particles);
      const theta = Math.sqrt(particles * Math.PI) * phi;
      const r = 5 + Math.random() * 0.5; // Radius with slight variation
      positions[i * 3] = r * Math.cos(theta) * Math.sin(phi);
      positions[i * 3 + 1] = r * Math.sin(theta) * Math.sin(phi);
      positions[i * 3 + 2] = r * Math.cos(phi);
      // Mix colors
      const mixedColor = color1.
      clone().
      lerp(Math.random() > 0.5 ? color2 : color3, Math.random());
      colors[i * 3] = mixedColor.r;
      colors[i * 3 + 1] = mixedColor.g;
      colors[i * 3 + 2] = mixedColor.b;
    }
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    // Material for points
    const pointMaterial = new THREE.PointsMaterial({
      size: 0.15,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });
    const points = new THREE.Points(geometry, pointMaterial);
    scene.add(points);
    // Lines connecting close points
    const lineMaterial = new THREE.LineBasicMaterial({
      color: theme === 'dark' ? 0x2563ff : 0x1a4de0,
      transparent: true,
      opacity: theme === 'dark' ? 0.15 : 0.1,
      blending: THREE.AdditiveBlending
    });
    // We'll create lines dynamically in the render loop for a "breathing" effect,
    // but for performance, static lines that rotate with the sphere are better.
    const lineGeometry = new THREE.BufferGeometry();
    const linePositions = [];
    for (let i = 0; i < particles; i++) {
      for (let j = i + 1; j < particles; j++) {
        const dx = positions[i * 3] - positions[j * 3];
        const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
        const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < 2.5) {
          // Connect if close
          linePositions.push(
            positions[i * 3],
            positions[i * 3 + 1],
            positions[i * 3 + 2],
            positions[j * 3],
            positions[j * 3 + 1],
            positions[j * 3 + 2]
          );
        }
      }
    }
    lineGeometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(linePositions, 3)
    );
    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lines);
    // Group to rotate everything together
    const group = new THREE.Group();
    group.add(points);
    group.add(lines);
    scene.add(group);
    // Animation Loop
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      group.rotation.y += 0.002;
      group.rotation.x += 0.001;
      // Gentle floating
      group.position.y = Math.sin(Date.now() * 0.001) * 0.3;
      renderer.render(scene, camera);
    };
    animate();
    // Handle resize
    window.addEventListener('resize', updateSize);
    return () => {
      window.removeEventListener('resize', updateSize);
      cancelAnimationFrame(animationFrameId);
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      geometry.dispose();
      pointMaterial.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      renderer.dispose();
    };
  }, [theme]);
  return (
    <div
      ref={containerRef}
      className="w-full h-full min-h-[400px] md:min-h-[600px] flex items-center justify-center relative">
      
      {/* Glow behind the orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-electric-500/20 dark:bg-electric-500/30 rounded-full blur-[80px] pointer-events-none" />
    </div>);

}