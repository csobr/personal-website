'use client';

import { useEffect, useRef, useCallback, useState } from 'react';
import * as THREE from 'three';
import { ScrollVelocity } from './ScrollVelocity';
import { vertexShader, fragmentShader } from './shaders';
import { ShaderCanvasContext } from './ShaderContext';

export const ShaderCanvas = ({ children }) => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const scrollVelocityRef = useRef(null);
  const meshesRef = useRef(new Map());
  const animationRef = useRef(null);
  const observerRef = useRef(null);
  const [isWebGLSupported, setIsWebGLSupported] = useState(true);

  // Initialize Three.js scene
  useEffect(() => {
    // Check for WebGL support
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) {
      setIsWebGLSupported(false);
      document.body.classList.add('no-webgl');
      return;
    }

    // Create renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
      preserveDrawingBuffer: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    rendererRef.current = renderer;

    // Handle WebGL context loss
    canvasRef.current.addEventListener('webglcontextlost', (e) => {
      e.preventDefault();
      console.log('WebGL context lost');
    });

    canvasRef.current.addEventListener('webglcontextrestored', () => {
      console.log('WebGL context restored');
    });

    // Create scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Create orthographic camera
    const frustumSize = window.innerHeight;
    const aspect = window.innerWidth / window.innerHeight;
    const camera = new THREE.OrthographicCamera(
      (frustumSize * aspect) / -2,
      (frustumSize * aspect) / 2,
      frustumSize / 2,
      frustumSize / -2,
      -1000,
      1000
    );
    camera.position.z = 1;
    cameraRef.current = camera;

    // Initialize scroll velocity tracker
    scrollVelocityRef.current = new ScrollVelocity({ damping: 0.92 });

    // Create IntersectionObserver for visibility optimization
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.dataset.shaderId;
          const meshData = meshesRef.current.get(id);
          if (meshData) {
            meshData.visible = entry.isIntersecting;
          }
        });
      },
      { rootMargin: '100px' }
    );

    // Resize handler
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      renderer.setSize(width, height);

      const frustumSize = height;
      const aspect = width / height;
      camera.left = (frustumSize * aspect) / -2;
      camera.right = (frustumSize * aspect) / 2;
      camera.top = frustumSize / 2;
      camera.bottom = frustumSize / -2;
      camera.updateProjectionMatrix();

      // Update all mesh positions
      meshesRef.current.forEach((meshData) => {
        if (meshData.element) {
          updateMeshPosition(meshData);
        }
      });
    };

    window.addEventListener('resize', handleResize);

    // Animation loop
    const clock = new THREE.Clock();
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);

      const time = clock.getElapsedTime();
      const scrollVelocity = scrollVelocityRef.current?.update() || 0;

      // Update all meshes
      meshesRef.current.forEach((meshData) => {
        if (!meshData.mesh) return;

        // Update position based on DOM element
        updateMeshPosition(meshData);

        // Update uniforms only if mesh is visible
        if (meshData.mesh.visible) {
          meshData.mesh.material.uniforms.uTime.value = time;
          meshData.mesh.material.uniforms.uScrollVelocity.value = scrollVelocity;
        }
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', handleResize);
      scrollVelocityRef.current?.destroy();
      observerRef.current?.disconnect();
      renderer.dispose();
    };
  }, []);

  // Update mesh position based on DOM element
  const updateMeshPosition = useCallback((meshData) => {
    if (!meshData.element || !meshData.mesh) return;

    const rect = meshData.element.getBoundingClientRect();

    // Skip if element is not visible or has no size
    if (rect.width === 0 || rect.height === 0) {
      meshData.mesh.visible = false;
      return;
    }

    meshData.mesh.visible = true;

    const width = window.innerWidth;
    const height = window.innerHeight;

    // Convert DOM coordinates to Three.js coordinates
    const x = rect.left - width / 2 + rect.width / 2;
    const y = -rect.top + height / 2 - rect.height / 2;

    meshData.mesh.position.set(x, y, 0);

    // Update quad size if changed
    if (
      meshData.mesh.material.uniforms.uQuadSize.value.x !== rect.width ||
      meshData.mesh.material.uniforms.uQuadSize.value.y !== rect.height
    ) {
      meshData.mesh.material.uniforms.uQuadSize.value.set(rect.width, rect.height);
      meshData.mesh.scale.set(rect.width, rect.height, 1);
    }
  }, []);

  // Register an image with the shader canvas
  const registerImage = useCallback((id, element, imageSrc, textureSize) => {
    if (!sceneRef.current || !isWebGLSupported) return;

    // Create texture from image src
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(imageSrc, (texture) => {
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.wrapS = THREE.ClampToEdgeWrapping;
      texture.wrapT = THREE.ClampToEdgeWrapping;

      const rect = element.getBoundingClientRect();

      // Create shader material
      const material = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
          uTexture: { value: texture },
          uTextureSize: { value: new THREE.Vector2(textureSize.width, textureSize.height) },
          uQuadSize: { value: new THREE.Vector2(rect.width, rect.height) },
          uScrollVelocity: { value: 0 },
          uMouseEnter: { value: 0 },
          uMouseOverPos: { value: new THREE.Vector2(0.5, 0.5) },
          uTime: { value: 0 },
        },
        transparent: true,
      });

      // Create mesh with plane geometry
      const geometry = new THREE.PlaneGeometry(1, 1);
      const mesh = new THREE.Mesh(geometry, material);
      mesh.scale.set(rect.width, rect.height, 1);

      sceneRef.current.add(mesh);

      // Store mesh data
      meshesRef.current.set(id, {
        mesh,
        element,
        visible: true,
        texture,
      });

      // Observe element for visibility
      element.dataset.shaderId = id;
      observerRef.current?.observe(element);

      // Initial position update
      updateMeshPosition(meshesRef.current.get(id));
    });
  }, [isWebGLSupported, updateMeshPosition]);

  // Unregister an image
  const unregisterImage = useCallback((id) => {
    const meshData = meshesRef.current.get(id);
    if (meshData) {
      if (meshData.element) {
        observerRef.current?.unobserve(meshData.element);
      }
      if (meshData.mesh) {
        sceneRef.current?.remove(meshData.mesh);
        meshData.mesh.geometry.dispose();
        meshData.mesh.material.dispose();
      }
      if (meshData.texture) {
        meshData.texture.dispose();
      }
      meshesRef.current.delete(id);
    }
  }, []);

  // Update hover state for an image
  const updateHover = useCallback((id, isHovering, mousePos = { x: 0.5, y: 0.5 }) => {
    const meshData = meshesRef.current.get(id);
    if (meshData?.mesh) {
      meshData.mesh.material.uniforms.uMouseEnter.value = isHovering ? 1 : 0;
      meshData.mesh.material.uniforms.uMouseOverPos.value.set(mousePos.x, mousePos.y);
    }
  }, []);

  // Reset all hover states (useful when modal opens and mouseLeave doesn't fire)
  const resetAllHover = useCallback(() => {
    meshesRef.current.forEach((meshData) => {
      if (meshData?.mesh) {
        meshData.mesh.material.uniforms.uMouseEnter.value = 0;
      }
    });
  }, []);

  // Force update all mesh positions (useful after modal close)
  const forceUpdate = useCallback(() => {
    meshesRef.current.forEach((meshData) => {
      if (meshData.element && meshData.mesh) {
        updateMeshPosition(meshData);
      }
    });
  }, [updateMeshPosition]);

  // Update positions when window focus changes (handles modal scenarios)
  useEffect(() => {
    const handleFocus = () => {
      setTimeout(forceUpdate, 100);
    };
    window.addEventListener('focus', handleFocus);
    document.addEventListener('visibilitychange', handleFocus);
    return () => {
      window.removeEventListener('focus', handleFocus);
      document.removeEventListener('visibilitychange', handleFocus);
    };
  }, [forceUpdate]);

  const contextValue = {
    registerImage,
    unregisterImage,
    updateHover,
    resetAllHover,
    forceUpdate,
    isWebGLSupported,
  };

  return (
    <ShaderCanvasContext.Provider value={contextValue}>
      <div ref={containerRef}>
        {isWebGLSupported && (
          <canvas ref={canvasRef} className="shader-canvas" />
        )}
        {children}
      </div>
    </ShaderCanvasContext.Provider>
  );
};
