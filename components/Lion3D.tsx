"use client";
import { useEffect, useRef } from 'react';

interface Lion3DProps {
  className?: string;
}

export default function Lion3D({ className = "w-full h-[200px]" }: Lion3DProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl');
    if (!gl) {
      console.error('WebGL not supported');
      return;
    }

    // Vertex shader - handles 3D transformation
    const vertexShaderSource = `
      attribute vec3 aPosition;
      attribute vec3 aColor;
      uniform mat4 uModelViewMatrix;
      uniform mat4 uProjectionMatrix;
      varying vec3 vColor;
      
      void main() {
        gl_Position = uProjectionMatrix * uModelViewMatrix * vec4(aPosition, 1.0);
        vColor = aColor;
      }
    `;

    // Fragment shader - handles coloring
    const fragmentShaderSource = `
      precision mediump float;
      varying vec3 vColor;
      
      void main() {
        gl_FragColor = vec4(vColor, 1.0);
      }
    `;

    // Compile shader helper
    function compileShader(gl: WebGLRenderingContext, source: string, type: number): WebGLShader | null {
      const shader = gl.createShader(type);
      if (!shader) return null;
      
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compilation error:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      
      return shader;
    }

    // Create shader program
    const vertexShader = compileShader(gl, vertexShaderSource, gl.VERTEX_SHADER);
    const fragmentShader = compileShader(gl, fragmentShaderSource, gl.FRAGMENT_SHADER);
    
    if (!vertexShader || !fragmentShader) {
      console.error('Failed to compile shaders');
      return;
    }

    const program = gl.createProgram();
    if (!program) {
      console.error('Failed to create program');
      return;
    }

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program linking error:', gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    // Simple lion mesh - inspired by the logo
    // Creating a stylized lion head with body
    const vertices = new Float32Array([
      // Head (golden/yellow - front face)
      0.0, 0.6, 0.2,    // top
      -0.3, 0.3, 0.2,   // left
      0.3, 0.3, 0.2,    // right
      
      // Muzzle (lighter yellow - front)
      0.0, 0.2, 0.3,    // nose tip
      -0.15, 0.3, 0.25, // left muzzle
      0.15, 0.3, 0.25,  // right muzzle
      
      // Body (blue - torso)
      -0.2, 0.3, 0.0,   // left shoulder
      0.2, 0.3, 0.0,    // right shoulder
      -0.25, -0.3, 0.0, // left hip
      0.25, -0.3, 0.0,  // right hip
      
      // Mane spikes (golden - back)
      -0.4, 0.5, -0.1,  // left mane
      0.4, 0.5, -0.1,   // right mane
      0.0, 0.7, -0.1,   // top mane
      
      // Ears
      -0.25, 0.65, 0.15, // left ear
      0.25, 0.65, 0.15,  // right ear
      
      // Tail
      0.0, -0.4, -0.3,   // tail tip
    ]);

    // Colors for each vertex (RGB)
    const gold = [1.0, 0.84, 0.29]; // #FFD54A
    const blue = [0.04, 0.24, 0.57]; // #0B3D91
    const lightGold = [1.0, 0.92, 0.6];
    
    const colors = new Float32Array([
      // Head vertices (gold)
      ...gold, ...gold, ...gold,
      // Muzzle (light gold)
      ...lightGold, ...lightGold, ...lightGold,
      // Body (blue)
      ...blue, ...blue, ...blue, ...blue,
      // Mane (gold)
      ...gold, ...gold, ...gold,
      // Ears (gold)
      ...gold, ...gold,
      // Tail (gold)
      ...gold,
    ]);

    // Indices defining triangles
    const indices = new Uint16Array([
      // Head triangle
      0, 1, 2,
      // Muzzle
      3, 4, 5,
      // Connect head to muzzle
      1, 4, 3,
      2, 3, 5,
      // Body front
      6, 7, 8,
      7, 8, 9,
      // Connect head to body
      1, 6, 7,
      1, 7, 2,
      // Mane triangles
      0, 10, 1,
      0, 2, 11,
      0, 12, 10,
      0, 11, 12,
      // Ears
      0, 1, 13,
      0, 14, 2,
      // Body back
      6, 8, 15,
      7, 9, 15,
    ]);

    // Create buffers
    const vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, colors, gl.STATIC_DRAW);

    const indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);

    // Get attribute and uniform locations
    const positionLocation = gl.getAttribLocation(program, 'aPosition');
    const colorLocation = gl.getAttribLocation(program, 'aColor');
    const modelViewMatrixLocation = gl.getUniformLocation(program, 'uModelViewMatrix');
    const projectionMatrixLocation = gl.getUniformLocation(program, 'uProjectionMatrix');

    // Enable attributes
    gl.enableVertexAttribArray(positionLocation);
    gl.enableVertexAttribArray(colorLocation);

    // Set up projection matrix (perspective)
    function createPerspectiveMatrix(fov: number, aspect: number, near: number, far: number): Float32Array {
      const f = 1.0 / Math.tan(fov / 2);
      const rangeInv = 1.0 / (near - far);

      return new Float32Array([
        f / aspect, 0, 0, 0,
        0, f, 0, 0,
        0, 0, (near + far) * rangeInv, -1,
        0, 0, near * far * rangeInv * 2, 0
      ]);
    }

    // Create rotation matrix around Y axis
    function createRotationMatrixY(angle: number): Float32Array {
      const c = Math.cos(angle);
      const s = Math.sin(angle);
      
      return new Float32Array([
        c, 0, s, 0,
        0, 1, 0, 0,
        -s, 0, c, 0,
        0, 0, -2, 1  // Translate back on Z axis
      ]);
    }

    // Set canvas size
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Enable depth testing
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);

    // Animation loop
    let rotation = 0;
    let animationFrameId: number;

    function render() {
      if (!gl || !canvas) return;
      
      // Clear canvas
      gl.clearColor(0.0, 0.0, 0.0, 0.0); // Transparent background
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

      // Update rotation (360 degrees over time)
      rotation += 0.01; // Rotation speed

      // Set up matrices
      const aspect = canvas.width / canvas.height;
      const projectionMatrix = createPerspectiveMatrix(Math.PI / 4, aspect, 0.1, 100.0);
      const modelViewMatrix = createRotationMatrixY(rotation);

      gl.uniformMatrix4fv(projectionMatrixLocation, false, projectionMatrix);
      gl.uniformMatrix4fv(modelViewMatrixLocation, false, modelViewMatrix);

      // Bind vertex buffer
      gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
      gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 0, 0);

      // Bind color buffer
      gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
      gl.vertexAttribPointer(colorLocation, 3, gl.FLOAT, false, 0, 0);

      // Bind index buffer and draw
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
      gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);

      animationFrameId = requestAnimationFrame(render);
    }

    render();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      gl.deleteBuffer(vertexBuffer);
      gl.deleteBuffer(colorBuffer);
      gl.deleteBuffer(indexBuffer);
    };
  }, []);

  return (
    <div className={className}>
      <canvas 
        ref={canvasRef} 
        className="w-full h-full"
        aria-label="3D animated lion logo"
      />
    </div>
  );
}
