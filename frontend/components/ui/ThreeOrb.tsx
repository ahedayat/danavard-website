'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import useUIStore from '@/stores/ui-store';
import styles from './ThreeOrb.module.css';

const EARTH_RADIUS = 5;
const NODE_RADIUS_MIN = EARTH_RADIUS * 1.02;
const NODE_RADIUS_RANGE = EARTH_RADIUS * 0.04;
const EARTH_TEXTURE_PATH = '/textures/earth/earth_day_4k.png';

const AUTO_ROTATE_Y = 0.002;
const AUTO_ROTATE_X = 0.001;
const DRAG_SENSITIVITY = 0.004;
const MAX_PITCH = Math.PI * 0.45;
const INERTIA_DAMPING = 0.92;
const INERTIA_MIN_VELOCITY = 0.00005;
const DRAG_START_THRESHOLD = 5;
const INERTIA_THROW_FACTOR = 0.35;

const POINTER_MOVE_OPTIONS: AddEventListenerOptions = { passive: false };

function clampPitch(value: number): number {
  return Math.max(-MAX_PITCH, Math.min(MAX_PITCH, value));
}

type InteractionState = {
  isDragging: boolean;
  pointerDown: boolean;
  pointerId: number;
  startX: number;
  startY: number;
  lastX: number;
  lastY: number;
  lastMoveTime: number;
  velocityX: number;
  velocityY: number;
};

export default function ThreeOrb() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasHostRef = useRef<HTMLDivElement>(null);
  const interactionRef = useRef<HTMLDivElement>(null);
  const theme = useUIStore((s) => s.theme);

  useEffect(() => {
    const container = containerRef.current;
    const canvasHost = canvasHostRef.current;
    const interactionLayer = interactionRef.current;
    if (!container || !canvasHost || !interactionLayer) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);

    const updateCameraDistance = () => {
      camera.position.z = window.innerWidth < 768 ? 20.5 : 15;
    };
    updateCameraDistance();

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    const updateSize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      if (width === 0 || height === 0) return;

      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      updateCameraDistance();
      camera.updateProjectionMatrix();
    };

    updateSize();
    canvasHost.appendChild(renderer.domElement);

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

    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let reducedMotion = reducedMotionQuery.matches;

    const interaction: InteractionState = {
      isDragging: false,
      pointerDown: false,
      pointerId: -1,
      startX: 0,
      startY: 0,
      lastX: 0,
      lastY: 0,
      lastMoveTime: 0,
      velocityX: 0,
      velocityY: 0,
    };

    const setDraggingVisualState = (dragging: boolean) => {
      interactionLayer.classList.toggle(styles.interactionLayerDragging, dragging);
    };

    const applyDragRotation = (deltaX: number, deltaY: number, deltaTime: number) => {
      const rotationDeltaY = deltaX * DRAG_SENSITIVITY;
      const rotationDeltaX = deltaY * DRAG_SENSITIVITY;

      group.rotation.y += rotationDeltaY;
      group.rotation.x = clampPitch(group.rotation.x + rotationDeltaX);

      const frameScale = 16.67 / Math.max(deltaTime, 1);
      interaction.velocityY = rotationDeltaY * frameScale * INERTIA_THROW_FACTOR;
      interaction.velocityX = rotationDeltaX * frameScale * INERTIA_THROW_FACTOR;
    };

    const startDragging = (target: HTMLElement, pointerId: number) => {
      interaction.isDragging = true;
      interaction.pointerId = pointerId;
      setDraggingVisualState(true);
      target.setPointerCapture(pointerId);
    };

    const stopDragging = (target: HTMLElement, pointerId: number) => {
      interaction.isDragging = false;
      interaction.pointerDown = false;
      interaction.pointerId = -1;
      setDraggingVisualState(false);

      if (target.hasPointerCapture(pointerId)) {
        target.releasePointerCapture(pointerId);
      }
    };

    const handlePointerDown = (event: PointerEvent) => {
      if (event.button !== 0) return;

      const target = event.currentTarget as HTMLElement;

      interaction.pointerDown = true;
      interaction.isDragging = false;
      interaction.pointerId = event.pointerId;
      interaction.startX = event.clientX;
      interaction.startY = event.clientY;
      interaction.lastX = event.clientX;
      interaction.lastY = event.clientY;
      interaction.lastMoveTime = performance.now();
      interaction.velocityX = 0;
      interaction.velocityY = 0;

      if (event.pointerType === 'mouse') {
        startDragging(target, event.pointerId);
      }
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (!interaction.pointerDown || event.pointerId !== interaction.pointerId) {
        return;
      }

      const target = event.currentTarget as HTMLElement;
      const deltaFromStartX = event.clientX - interaction.startX;
      const deltaFromStartY = event.clientY - interaction.startY;

      if (!interaction.isDragging) {
        if (
          Math.abs(deltaFromStartX) < DRAG_START_THRESHOLD &&
          Math.abs(deltaFromStartY) < DRAG_START_THRESHOLD
        ) {
          return;
        }

        if (
          event.pointerType === 'touch' &&
          Math.abs(deltaFromStartY) > Math.abs(deltaFromStartX) * 1.4
        ) {
          interaction.pointerDown = false;
          interaction.pointerId = -1;
          return;
        }

        startDragging(target, event.pointerId);
      }

      event.preventDefault();

      const deltaX = event.clientX - interaction.lastX;
      const deltaY = event.clientY - interaction.lastY;
      const now = performance.now();
      const deltaTime = now - interaction.lastMoveTime;

      applyDragRotation(deltaX, deltaY, deltaTime);

      interaction.lastX = event.clientX;
      interaction.lastY = event.clientY;
      interaction.lastMoveTime = now;
    };

    const handlePointerUp = (event: PointerEvent) => {
      if (!interaction.pointerDown || event.pointerId !== interaction.pointerId) {
        return;
      }

      stopDragging(event.currentTarget as HTMLElement, event.pointerId);
    };

    const handlePointerCancel = (event: PointerEvent) => {
      if (!interaction.pointerDown || event.pointerId !== interaction.pointerId) {
        return;
      }

      interaction.velocityX = 0;
      interaction.velocityY = 0;
      stopDragging(event.currentTarget as HTMLElement, event.pointerId);
    };

    const handleLostPointerCapture = (event: PointerEvent) => {
      if (interaction.pointerId !== event.pointerId) return;

      interaction.isDragging = false;
      interaction.pointerDown = false;
      interaction.pointerId = -1;
      setDraggingVisualState(false);
    };

    const handleReducedMotionChange = (event: MediaQueryListEvent) => {
      reducedMotion = event.matches;
      if (reducedMotion) {
        interaction.velocityX = 0;
        interaction.velocityY = 0;
      }
    };

    interactionLayer.addEventListener('pointerdown', handlePointerDown);
    interactionLayer.addEventListener('pointermove', handlePointerMove, POINTER_MOVE_OPTIONS);
    interactionLayer.addEventListener('pointerup', handlePointerUp);
    interactionLayer.addEventListener('pointercancel', handlePointerCancel);
    interactionLayer.addEventListener('lostpointercapture', handleLostPointerCapture);
    reducedMotionQuery.addEventListener('change', handleReducedMotionChange);

    let animationFrameId = 0;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!interaction.isDragging && !reducedMotion) {
        if (Math.abs(interaction.velocityY) > INERTIA_MIN_VELOCITY) {
          group.rotation.y += interaction.velocityY;
          interaction.velocityY *= INERTIA_DAMPING;
        } else {
          interaction.velocityY = 0;
        }

        if (Math.abs(interaction.velocityX) > INERTIA_MIN_VELOCITY) {
          group.rotation.x = clampPitch(group.rotation.x + interaction.velocityX);
          interaction.velocityX *= INERTIA_DAMPING;
        } else {
          interaction.velocityX = 0;
        }

        group.rotation.y += AUTO_ROTATE_Y;
        group.rotation.x = clampPitch(group.rotation.x + AUTO_ROTATE_X);
      }

      group.position.y = Math.sin(Date.now() * 0.001) * 0.3;
      renderer.render(scene, camera);
    };
    animate();

    window.addEventListener('resize', updateSize);

    return () => {
      window.removeEventListener('resize', updateSize);
      interactionLayer.removeEventListener('pointerdown', handlePointerDown);
      interactionLayer.removeEventListener('pointermove', handlePointerMove, POINTER_MOVE_OPTIONS);
      interactionLayer.removeEventListener('pointerup', handlePointerUp);
      interactionLayer.removeEventListener('pointercancel', handlePointerCancel);
      interactionLayer.removeEventListener('lostpointercapture', handleLostPointerCapture);
      reducedMotionQuery.removeEventListener('change', handleReducedMotionChange);
      cancelAnimationFrame(animationFrameId);
      if (canvasHost.contains(renderer.domElement)) {
        canvasHost.removeChild(renderer.domElement);
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
      <div ref={canvasHostRef} className={styles.canvasHost} aria-hidden="true" />
      <div ref={interactionRef} className={styles.interactionLayer} aria-hidden="true" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 md:w-64 md:h-64 bg-electric-500/20 dark:bg-electric-500/30 rounded-full blur-[60px] md:blur-[80px] pointer-events-none z-0" />
    </div>
  );
}
