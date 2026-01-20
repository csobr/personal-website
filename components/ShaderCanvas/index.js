'use client';

import dynamic from 'next/dynamic';

// Dynamic import wrapper for SSR-safe Three.js components
export const ShaderCanvas = dynamic(
  () => import('./ShaderCanvas').then((mod) => mod.ShaderCanvas),
  {
    ssr: false,
    loading: () => null
  }
);

// Re-export the context hook from separate file (avoids loading Three.js on server)
export { useShaderCanvas } from './ShaderContext';
