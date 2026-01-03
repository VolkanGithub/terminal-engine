// Bu dosya, insan dilindeki Shader kodlarını GPU diline çevirir.

export const createShader = (
  gl: WebGL2RenderingContext,
  type: number,
  source: string
): WebGLShader | null => {
  const shader = gl.createShader(type);
  if (!shader) return null;

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  // Derleme hatası var mı kontrol et (Syntax hatası vb.)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error("Tunnel Vision Alert: Shader derlenemedi!", gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }

  return shader;
};

export const createProgram = (
  gl: WebGL2RenderingContext,
  vertexShader: WebGLShader,
  fragmentShader: WebGLShader
): WebGLProgram | null => {
  const program = gl.createProgram();
  if (!program) return null;

  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  // Link hatası kontrolü
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error("Tunnel Vision Alert: Program bağlanamadı!", gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return null;
  }

  return program;
};