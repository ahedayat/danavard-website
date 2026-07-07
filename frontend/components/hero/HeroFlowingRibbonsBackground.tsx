'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import useUIStore from '@/stores/ui-store';

const MAX_DPR = 1.5;

const vertexShader = /* glsl */ `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  precision highp float;

  uniform float uTime;
  uniform vec2 uResolution;
  uniform float uTheme;
  uniform float uOpacity;
  uniform float uReducedMotion;
  uniform float uRibbonCount;
  uniform float uLayerCount;
  uniform float uParallax;

  varying vec2 vUv;

  float hash(float n) {
    return fract(sin(n) * 43758.5453123);
  }

  vec2 aspectUv(vec2 uv) {
    float aspect = uResolution.x / max(uResolution.y, 1.0);
    vec2 outUv = uv;
    outUv.x = (uv.x - 0.5) * aspect + 0.5;
    return outUv;
  }

  vec3 ribbonPalette(float id) {
    float slot = hash(id * 3.71);

    vec3 cyan    = vec3(0.20, 0.88, 0.98);
    vec3 aqua    = vec3(0.18, 0.92, 0.86);
    vec3 blue    = vec3(0.32, 0.55, 0.98);
    vec3 indigo  = vec3(0.42, 0.38, 0.96);
    vec3 violet  = vec3(0.62, 0.36, 0.94);
    vec3 teal    = vec3(0.14, 0.78, 0.88);

    vec3 color;
    if (slot < 0.18)      color = cyan;
    else if (slot < 0.36) color = aqua;
    else if (slot < 0.54) color = blue;
    else if (slot < 0.72) color = indigo;
    else if (slot < 0.88) color = violet;
    else                  color = teal;

    float highlight = hash(id * 9.17);
    color = mix(color, vec3(0.94, 0.98, 1.0), smoothstep(0.82, 1.0, highlight) * 0.22);

    if (uTheme < 0.5) {
      color = mix(vec3(0.22, 0.38, 0.62), color, 0.62);
      color *= 0.78;
    }

    return color;
  }

  float logoBezierY(float t, float id, float layer) {
    float seed = id * 1.618 + layer * 3.141;
    float anchor = 0.14 + hash(seed) * 0.72;

    float c0 = anchor + (hash(seed + 1.0) - 0.5) * 0.12;
    float c1 = anchor + (hash(seed + 2.0) - 0.5) * 0.42;
    float c2 = anchor + (hash(seed + 3.0) - 0.5) * 0.38;
    float c3 = anchor + (hash(seed + 4.0) - 0.5) * 0.14;

    float u = 1.0 - t;
    float bezier = u * u * u * c0
                 + 3.0 * u * u * t * c1
                 + 3.0 * u * t * t * c2
                 + t * t * t * c3;

    float swoop = sin(t * 3.14159 + seed * 0.7) * 0.06 * (hash(seed + 5.0) - 0.3);
    float arc   = cos(t * 1.85 - seed * 1.1) * 0.035;

    return bezier + swoop + arc;
  }

  float fluidRipple(float t, float id, float layer) {
    float motion = 1.0 - uReducedMotion * 0.92;
    float w1 = sin(t * 11.0 + uTime * (0.55 + layer * 0.15) * motion + id * 2.1) * 0.007;
    float w2 = cos(t * 6.5  - uTime * 0.38 * motion + id * 1.4) * 0.005;
    float w3 = sin(t * 18.0 + uTime * 0.9  * motion + id) * 0.003;
    return (w1 + w2 + w3) * (1.0 - uReducedMotion * 0.8);
  }

  float ribbonMask(vec2 uv, float id, float layer) {
    float motion = 1.0 - uReducedMotion * 0.97;

    float layerSpeed = 1.0 - layer * 0.22;
    float layerScale = 1.0 + layer * 0.18;

    float speed = (0.038 + hash(id + layer * 6.3) * 0.028) * layerSpeed * motion;
    float ribbonLen = (0.32 + hash(id + 1.7) * 0.24) * layerScale;
    float gap = 0.18 + hash(id + 2.9) * 0.22;
    float cycle = ribbonLen + gap + 0.12;

    float phase = hash(id + 4.1) * cycle;
    float head = mod(uTime * speed + phase, cycle) - 0.08;
    float tail = head + ribbonLen;

    if (uv.x < head - 0.04 || uv.x > tail + 0.04) {
      return 0.0;
    }

    float t = clamp((uv.x - head) / ribbonLen, 0.0, 1.0);
    float pathY = logoBezierY(t, id, layer) + fluidRipple(t, id, layer);

    float distY = abs(uv.y - pathY);
    float thickness = (0.005 + hash(id + 6.2) * 0.009) * layerScale;
    thickness *= 1.0 + layer * 0.28;

    float core = exp(-distY * distY / (thickness * thickness * 0.45));
    float glow = exp(-distY * distY / (thickness * thickness * 10.0)) * (0.32 + layer * 0.14);
    float stroke = core + glow;

    float entryFade = smoothstep(0.0, 0.14, t);
    float exitFade  = smoothstep(1.0, 0.68, t);
    float tipBoost  = 1.0 + smoothstep(0.0, 0.06, t) * (1.0 - smoothstep(0.0, 0.2, t)) * 0.35;
    float alongFade = entryFade * exitFade * tipBoost;

    float breathe = 0.86 + 0.14 * sin(uTime * 0.42 * motion + id * 1.6 + layer);
    float depth   = 0.48 + hash(id + 8.3) * 0.52;
    float layerDim = 0.55 + layer * 0.45;

    return stroke * alongFade * breathe * depth * layerDim;
  }

  void main() {
    vec2 uv = aspectUv(vUv);

    vec3 colorAccum = vec3(0.0);
    float weightAccum = 0.0;

    float maxRibbons = min(uRibbonCount, 8.0);
    float maxLayers = min(uLayerCount, 2.0);

    for (float layer = 0.0; layer < 2.0; layer += 1.0) {
      if (layer >= maxLayers) break;

      float parallaxY = (layer - 0.5) * uParallax * 0.04;
      vec2 layerUv = uv;
      layerUv.y += parallaxY;

      for (float i = 0.0; i < 8.0; i += 1.0) {
        if (i >= maxRibbons) break;

        float weight = ribbonMask(layerUv, i, layer);
        if (weight < 0.0008) continue;

        vec3 ribbonCol = ribbonPalette(i + layer * 11.0);
        float layerBright = 1.0 - layer * 0.28;

        colorAccum += ribbonCol * weight * layerBright;
        weightAccum += weight * layerBright;
      }
    }

    float vignette = smoothstep(1.4, 0.15, length((vUv - vec2(0.5, 0.5)) * vec2(1.05, 1.15)));
    float leftReadability = smoothstep(0.0, 0.28, vUv.x);
    float rightGlow = smoothstep(0.35, 0.72, vUv.x) * smoothstep(1.0, 0.55, vUv.x);

    weightAccum *= vignette * (0.5 + leftReadability * 0.35 + rightGlow * 0.15);
    colorAccum *= vignette;

    vec3 ambient = mix(
      vec3(0.03, 0.07, 0.14),
      vec3(0.05, 0.11, 0.20),
      vUv.y
    );
    if (uTheme < 0.5) {
      ambient = mix(vec3(0.92, 0.95, 0.99), vec3(0.86, 0.91, 0.98), vUv.y);
    }

    float ambientMask = smoothstep(0.0, 0.4, vUv.x) * smoothstep(1.0, 0.5, vUv.x);
    ambientMask *= smoothstep(0.0, 0.3, vUv.y) * smoothstep(1.0, 0.7, vUv.y);
    colorAccum += ambient * ambientMask * 0.04 * uOpacity;
    weightAccum += ambientMask * 0.025 * uOpacity;

    vec3 finalColor = colorAccum / max(weightAccum, 0.0001);
    float alpha = clamp(weightAccum * uOpacity, 0.0, 1.0);

    if (uTheme < 0.5) {
      finalColor = mix(vec3(0.94, 0.96, 0.99), finalColor, 0.72);
      alpha *= 0.65;
    }

    if (uReducedMotion > 0.5) {
      alpha *= 0.45;
      finalColor *= 0.8;
    }

    gl_FragColor = vec4(finalColor * alpha, alpha);
  }
`;

type ResponsiveConfig = {
  opacity: number;
  ribbonCount: number;
  layerCount: number;
  parallax: number;
};

function getResponsiveConfig(width: number): ResponsiveConfig {
  if (width < 640) {
    return { opacity: 0.32, ribbonCount: 3, layerCount: 1, parallax: 0.4 };
  }
  if (width < 1024) {
    return { opacity: 0.44, ribbonCount: 5, layerCount: 2, parallax: 0.7 };
  }
  return { opacity: 0.58, ribbonCount: 6, layerCount: 2, parallax: 1.0 };
}

export default function HeroFlowingRibbonsBackground() {
  const canvasHostRef = useRef<HTMLDivElement>(null);
  const theme = useUIStore((s) => s.theme);

  useEffect(() => {
    const container = canvasHostRef.current;
    if (!container) return;

    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let reducedMotion = reducedMotionQuery.matches;
    let isVisible = true;
    let animationFrameId = 0;
    let elapsed = 0;
    let lastTimestamp = 0;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: false,
      powerPreference: 'low-power',
    });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, MAX_DPR));
    container.appendChild(renderer.domElement);

    const responsive = getResponsiveConfig(container.clientWidth);

    const uniforms = {
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(1, 1) },
      uTheme: { value: theme === 'dark' ? 1 : 0 },
      uOpacity: { value: responsive.opacity },
      uReducedMotion: { value: reducedMotion ? 1 : 0 },
      uRibbonCount: { value: responsive.ribbonCount },
      uLayerCount: { value: responsive.layerCount },
      uParallax: { value: responsive.parallax },
    };

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      transparent: true,
      depthWrite: false,
      blending: theme === 'dark' ? THREE.AdditiveBlending : THREE.NormalBlending,
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const updateSize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      renderer.setSize(width, height);
      uniforms.uResolution.value.set(width, height);

      const config = getResponsiveConfig(width);
      uniforms.uOpacity.value = config.opacity;
      uniforms.uRibbonCount.value = config.ribbonCount;
      uniforms.uLayerCount.value = config.layerCount;
      uniforms.uParallax.value = config.parallax;
    };

    updateSize();

    const handleReducedMotionChange = (event: MediaQueryListEvent) => {
      reducedMotion = event.matches;
      uniforms.uReducedMotion.value = reducedMotion ? 1 : 0;
    };

    const handleResize = () => {
      updateSize();
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 },
    );
    observer.observe(container);

    const animate = (timestamp: number) => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isVisible) return;

      if (lastTimestamp === 0) {
        lastTimestamp = timestamp;
      }
      const delta = Math.min((timestamp - lastTimestamp) / 1000, 0.05);
      lastTimestamp = timestamp;

      if (!reducedMotion) {
        elapsed += delta;
      }
      uniforms.uTime.value = elapsed;
      uniforms.uTheme.value = theme === 'dark' ? 1 : 0;
      material.blending = theme === 'dark' ? THREE.AdditiveBlending : THREE.NormalBlending;

      renderer.render(scene, camera);
    };

    reducedMotionQuery.addEventListener('change', handleReducedMotionChange);
    window.addEventListener('resize', handleResize);
    animationFrameId = requestAnimationFrame(animate);

    return () => {
      reducedMotionQuery.removeEventListener('change', handleReducedMotionChange);
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [theme]);

  return (
    <div
      className="absolute inset-0 -z-10 pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      <div
        ref={canvasHostRef}
        className="absolute inset-0 [&>canvas]:absolute [&>canvas]:inset-0 [&>canvas]:h-full [&>canvas]:w-full"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-white/55 via-white/10 to-transparent dark:from-navy-950/60 dark:via-navy-950/15 dark:to-transparent pointer-events-none" />
      <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_90%_80%_at_58%_50%,black_20%,transparent_75%)] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-white/25 via-transparent to-white/20 dark:from-navy-950/35 dark:via-transparent dark:to-navy-950/30 pointer-events-none" />
    </div>
  );
}
