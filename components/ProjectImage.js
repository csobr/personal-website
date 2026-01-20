'use client';

import { useEffect, useRef, useCallback, useId } from 'react';
import Image from 'next/image';
import { useShaderCanvas } from './ShaderCanvas/ShaderContext';

export const ProjectImage = ({ src, alt, width, height, ...props }) => {
  const uniqueId = useId();
  const imgRef = useRef(null);
  const containerRef = useRef(null);
  const registeredRef = useRef(false);
  const shaderContext = useShaderCanvas();

  // Handle image load - extract optimized src and register with ShaderCanvas
  const handleImageLoad = useCallback((event) => {
    if (!shaderContext?.registerImage || registeredRef.current) return;

    const img = event.target;
    const currentSrc = img.currentSrc || img.src;

    // Get natural image dimensions
    const textureSize = {
      width: img.naturalWidth,
      height: img.naturalHeight,
    };

    shaderContext.registerImage(uniqueId, containerRef.current, currentSrc, textureSize);
    registeredRef.current = true;
  }, [shaderContext, uniqueId]);

  // Handle mouse enter
  const handleMouseEnter = useCallback(() => {
    shaderContext?.updateHover(uniqueId, true);
  }, [shaderContext, uniqueId]);

  // Handle mouse leave
  const handleMouseLeave = useCallback(() => {
    shaderContext?.updateHover(uniqueId, false);
  }, [shaderContext, uniqueId]);

  // Handle mouse move - calculate normalized position on image
  const handleMouseMove = useCallback((event) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = 1 - (event.clientY - rect.top) / rect.height; // Flip Y for WebGL

    shaderContext?.updateHover(uniqueId, true, { x, y });
  }, [shaderContext, uniqueId]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (registeredRef.current) {
        shaderContext?.unregisterImage(uniqueId);
      }
    };
  }, [shaderContext, uniqueId]);

  return (
    <div
      ref={containerRef}
      className="project-image-container"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      <Image
        ref={imgRef}
        src={src}
        alt={alt}
        width={width}
        height={height}
        onLoad={handleImageLoad}
        {...props}
      />
    </div>
  );
};
