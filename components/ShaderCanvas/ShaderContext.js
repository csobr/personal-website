'use client';

import { createContext, useContext } from 'react';

export const ShaderCanvasContext = createContext(null);

export const useShaderCanvas = () => useContext(ShaderCanvasContext);
