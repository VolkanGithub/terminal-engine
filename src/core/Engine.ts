import { createShader, createProgram } from '../render/GLUtils';
import { vertexShaderSource, fragmentShaderSource } from '../render/ShaderSource';
import { entityManager, STRIDE, MAX_ENTITY_COUNT } from './EntityManager';
import { movementSystem } from '../systems/MovementSystem';
import './InputManager'; // Sadece dosyayı çalıştır, değişkene atama

class TerminalEngine {
  private isRunning: boolean = false;
  private canvas: HTMLCanvasElement | null = null;
  private gl: WebGL2RenderingContext | null = null;
  private program: WebGLProgram | null = null;
  private buffer: WebGLBuffer | null = null;
  private animationId: number = 0;

  async init(canvasRef: HTMLCanvasElement) {
    this.canvas = canvasRef;
    this.gl = this.canvas.getContext('webgl2');
    if (!this.gl) return;

    this.resize();
    window.addEventListener('resize', () => this.resize());

    const vShader = createShader(this.gl, this.gl.VERTEX_SHADER, vertexShaderSource);
    const fShader = createShader(this.gl, this.gl.FRAGMENT_SHADER, fragmentShaderSource);
    
    if (vShader && fShader) {
        this.program = createProgram(this.gl, vShader, fShader);
    }
    
    if (!this.program) return;

    this.buffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, entityManager.data.byteLength, this.gl.DYNAMIC_DRAW);

    const bytesPerFloat = 4;
    const strideBytes = STRIDE * bytesPerFloat;

    this.gl.useProgram(this.program);

    const posLoc = this.gl.getAttribLocation(this.program, 'a_position');
    this.gl.enableVertexAttribArray(posLoc);
    this.gl.vertexAttribPointer(posLoc, 2, this.gl.FLOAT, false, strideBytes, 0);

    const colorLoc = this.gl.getAttribLocation(this.program, 'a_color');
    this.gl.enableVertexAttribArray(colorLoc);
    this.gl.vertexAttribPointer(colorLoc, 3, this.gl.FLOAT, false, strideBytes, 4 * bytesPerFloat);
    
    // YENİ: Life (Ömür) Attribute
    const lifeLoc = this.gl.getAttribLocation(this.program, 'a_life');
    if (lifeLoc !== -1) {
        this.gl.enableVertexAttribArray(lifeLoc);
        this.gl.vertexAttribPointer(lifeLoc, 1, this.gl.FLOAT, false, strideBytes, 12 * bytesPerFloat);
    }

    // BAŞLANGIÇ: Havuzu doldur (Görünmez olarak)
    if (entityManager.count === 0) {
        for (let i = 0; i < MAX_ENTITY_COUNT; i++) {
            entityManager.addEntity(0, 0, 0, 0, 0);
            // Başlangıçta hepsi ölü olsun ki hemen fareye ışınlansınlar
            entityManager.data[i * STRIDE + 12] = 0; 
        }
    }

    this.start();
  }

  private loop = () => {
    if (!this.isRunning || !this.gl || !this.program || !this.buffer) return;

    movementSystem.update();

    this.gl.viewport(0, 0, this.canvas!.width, this.canvas!.height);
    // Arka plan: Koyu Gri (Glitch renkleri patlasın diye)
    this.gl.clearColor(0.05, 0.05, 0.05, 1.0); 
    
    this.gl.enable(this.gl.BLEND);
    this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
    
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);

    this.gl.useProgram(this.program);
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffer);
    this.gl.bufferSubData(this.gl.ARRAY_BUFFER, 0, entityManager.data);

    this.gl.drawArrays(this.gl.POINTS, 0, entityManager.count);

    this.animationId = requestAnimationFrame(this.loop);
  }

  start() {
    if (this.isRunning) return;
    this.isRunning = true;
    this.loop();
  }

  stop() {
    this.isRunning = false;
    cancelAnimationFrame(this.animationId);
  }

  private resize() {
    if (!this.canvas) return;
    const dpr = window.devicePixelRatio || 1;
    this.canvas.width = window.innerWidth * dpr;
    this.canvas.height = window.innerHeight * dpr;
  }
}

export const engine = new TerminalEngine();