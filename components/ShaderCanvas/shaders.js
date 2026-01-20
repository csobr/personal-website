/**
 * GLSL shaders for scroll distortion and grain effect
 * Based exactly on codrops tutorial implementation
 */

export const vertexShader = `
  #define PI 3.1415926535897932384626433832795

  varying vec2 vUv;

  uniform float uScrollVelocity;

  void main() {
    vUv = uv;

    vec3 pos = position;

    // Strong bow-shaped Y distortion based on scroll velocity
    // Creates the curved/bent effect when scrolling
    float velocity = clamp(uScrollVelocity, -20.0, 20.0);
    pos.y = pos.y - (sin(uv.x * PI) * velocity * 0.05);

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

export const fragmentShader = `
  precision highp float;

  varying vec2 vUv;

  uniform sampler2D uTexture;
  uniform vec2 uTextureSize;
  uniform vec2 uQuadSize;
  uniform float uScrollVelocity;
  uniform float uMouseEnter;
  uniform vec2 uMouseOverPos;
  uniform float uTime;

  // Simplex noise function
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }

  float snoise(vec2 v) {
    const vec4 C = vec4(
      0.211324865405187,
      0.366025403784439,
      -0.577350269189626,
      0.024390243902439
    );
    vec2 i = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
    m = m * m * m * m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
    vec3 g;
    g.x = a0.x * x0.x + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  void main() {
    // Aspect ratio correction for cover behavior
    vec2 ratio = vec2(
      min((uQuadSize.x / uQuadSize.y) / (uTextureSize.x / uTextureSize.y), 1.0),
      min((uQuadSize.y / uQuadSize.x) / (uTextureSize.y / uTextureSize.x), 1.0)
    );

    vec2 texCoords = vec2(
      vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
      vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
    );

    // Aspect ratio for circle calculation
    float aspectRatio = uQuadSize.y / uQuadSize.x;

    // Circle effect following mouse position
    // Larger multiplier = smaller circle, smaller = larger effect area
    float circle = 1.0 - distance(
      vec2(uMouseOverPos.x, (1.0 - uMouseOverPos.y) * aspectRatio),
      vec2(vUv.x, vUv.y * aspectRatio)
    ) * 6.0;

    // Generate noise based on screen coordinates
    float noise = snoise(gl_FragCoord.xy);

    // Circle around mouse position for localized reveal
    float ar = uQuadSize.y / uQuadSize.x;
    float dist = distance(
      vec2(uMouseOverPos.x, uMouseOverPos.y * ar),
      vec2(vUv.x, vUv.y * ar)
    );

    // Smooth circle falloff - reveals only around cursor
    float revealRadius = 0.3;
    float circleMask = smoothstep(revealRadius, 0.0, dist) * uMouseEnter;

    // Effect strength: 1.0 = fully blurred, 0.0 = clear
    // Only reduce blur inside the circle around cursor
    float effectStrength = max(0.0, 1.0 - circleMask);

    // Blur amount for frosted glass
    float blurAmount = 0.008 * effectStrength;

    // Multi-sample blur for frosted glass effect
    vec3 color = vec3(0.0);
    float samples = 0.0;

    for(float x = -2.0; x <= 2.0; x += 1.0) {
      for(float y = -2.0; y <= 2.0; y += 1.0) {
        vec2 offset = vec2(x, y) * blurAmount;
        offset += vec2(snoise(texCoords * 50.0 + vec2(x, y))) * blurAmount * 0.5;
        vec2 sampleCoord = clamp(texCoords + offset, 0.0, 1.0);
        color += texture2D(uTexture, sampleCoord).rgb;
        samples += 1.0;
      }
    }
    color /= samples;

    // Slight grain texture for frosted look (only in blurred areas)
    float grain = snoise(gl_FragCoord.xy * 0.8) * 0.5 + 0.5;
    color = mix(color, color * (0.95 + grain * 0.1), effectStrength * 0.3);

    gl_FragColor = vec4(color, 1.0);
  }
`;
