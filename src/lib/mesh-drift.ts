import { MESH_FRAGMENT } from "./mesh-drift-shader";
import { MESH_PALETTE, MESH_SPEED, type meshResolution } from "./mesh-drift-settings";

const VERTEX = `attribute vec2 a_position;
void main() { gl_Position = vec4(a_position, 0.0, 1.0); }`;

export function createMeshRenderer(canvas: HTMLCanvasElement) {
  const gl = canvas.getContext("webgl", {
    alpha: false, antialias: false, depth: false, stencil: false,
    preserveDrawingBuffer: true,
    powerPreference: "low-power", failIfMajorPerformanceCaveat: true,
  });
  if (!gl) return null;
  const context = gl;
  const vertex = context.createShader(context.VERTEX_SHADER);
  const fragment = context.createShader(context.FRAGMENT_SHADER);
  const program = context.createProgram();
  const buffer = context.createBuffer();
  function dispose() {
    if (buffer) context.deleteBuffer(buffer);
    if (program) context.deleteProgram(program);
    if (vertex) context.deleteShader(vertex);
    if (fragment) context.deleteShader(fragment);
  }
  if (!vertex || !fragment || !program || !buffer) { dispose(); return null; }

  context.shaderSource(vertex, VERTEX);
  context.compileShader(vertex);
  context.shaderSource(fragment, MESH_FRAGMENT);
  context.compileShader(fragment);
  if (!context.getShaderParameter(vertex, context.COMPILE_STATUS) ||
      !context.getShaderParameter(fragment, context.COMPILE_STATUS)) {
    dispose();
    return null;
  }
  context.attachShader(program, vertex);
  context.attachShader(program, fragment);
  context.linkProgram(program);
  if (!context.getProgramParameter(program, context.LINK_STATUS)) { dispose(); return null; }
  context.useProgram(program);
  context.bindBuffer(context.ARRAY_BUFFER, buffer);
  context.bufferData(context.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), context.STATIC_DRAW);
  const position = context.getAttribLocation(program, "a_position");
  if (position < 0) { dispose(); return null; }
  context.enableVertexAttribArray(position);
  context.vertexAttribPointer(position, 2, context.FLOAT, false, 0, 0);

  const colors = new Float32Array(24);
  MESH_PALETTE.forEach((hex, i) => {
    for (let channel = 0; channel < 3; channel++) {
      colors[i * 3 + channel] = parseInt(hex.slice(1 + channel * 2, 3 + channel * 2), 16) / 255;
    }
  });
  context.uniform3fv(context.getUniformLocation(program, "u_colors[0]"), colors);
  const uniform = (name: string, values: [number, number, number, number]) =>
    context.uniform4f(context.getUniformLocation(program, name), ...values);
  uniform("u_shape", [0.95, 0.48, 0.50, 0]);
  uniform("u_surface", [2.40, 1.22, 0, 0.92]);
  uniform("u_finish", [0, 0, 0, 0.055]);
  uniform("u_transform", [1453, 0, 0.20, 0]);
  uniform("u_space", [0, 0, 0, 0]);
  uniform("u_cursor", [0, 2, 0.65, 0.46]);
  const scene = context.getUniformLocation(program, "u_scene");
  if (!scene) { dispose(); return null; }

  return {
    draw(seconds: number, dimensions: NonNullable<ReturnType<typeof meshResolution>>, edgePixels: number) {
      if (canvas.width !== dimensions.width) canvas.width = dimensions.width;
      if (canvas.height !== dimensions.height) canvas.height = dimensions.height;
      context.viewport(0, 0, canvas.width, canvas.height);
      context.uniform4f(scene, canvas.width, canvas.height, seconds * MESH_SPEED, 4);
      // Keep the full viewport and original fragment coordinates. Skip only
      // pixels hidden by the CSS mask; the safety margin covers edge sampling.
      context.enable(context.SCISSOR_TEST);
      if (edgePixels > 0 && edgePixels * 2 < canvas.width) {
        context.scissor(0, 0, edgePixels, canvas.height);
        context.drawArrays(context.TRIANGLES, 0, 3);
        context.scissor(canvas.width - edgePixels, 0, edgePixels, canvas.height);
        context.drawArrays(context.TRIANGLES, 0, 3);
      } else {
        context.scissor(0, 0, canvas.width, canvas.height);
        context.drawArrays(context.TRIANGLES, 0, 3);
      }
    },
    dispose,
  };
}
