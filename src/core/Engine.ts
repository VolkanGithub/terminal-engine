// Şimdilik EntityManager'ı kullanmıyoruz, o yüzden import etmiyoruz.
// import { entityManager } from './EntityManager';

class TerminalEngine {
  private isRunning: boolean = false;
  private canvas: HTMLCanvasElement | null = null;
  private gl: WebGL2RenderingContext | null = null;
  private animationId: number = 0;

  // Başlatma (React burayı çağıracak)
  init(canvasRef: HTMLCanvasElement) {
    this.canvas = canvasRef;
    // WebGL 2.0 Context alıyoruz
    this.gl = this.canvas.getContext('webgl2');

    if (!this.gl) {
      console.error("Tunnel Vision Alert: WebGL 2.0 desteklenmiyor!");
      return;
    }

    this.resize();
    window.addEventListener('resize', () => this.resize());

    console.log("Terminal Engine: Sistemler Aktif. GPU Bağlantısı Kuruldu.");
    this.start();
  }

  // Ana Döngü (The Game Loop)
  // Not: '_timestamp' yaptık, böylece TypeScript "kullanmıyorsun" diye kızmayacak.
  private loop = () => {
    if (!this.isRunning) return;

    // 1. UPDATE: İleride buraya fizik motoru gelecek.
    
    // 2. RENDER: Ekranı temizle
    if (this.gl) {
        this.gl.viewport(0, 0, this.canvas!.width, this.canvas!.height);
        // Rengi "Koyu Gri/Siyah" yapıyoruz (R, G, B, Alpha)
        this.gl.clearColor(0.05, 0.05, 0.05, 1.0); 
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    }

    // Bir sonraki kareyi iste
    this.animationId = requestAnimationFrame(this.loop);
  }

  start() {
    if (this.isRunning) return;
    this.isRunning = true;
    // Döngüyü başlat
    this.loop();
  }

  stop() {
    this.isRunning = false;
    cancelAnimationFrame(this.animationId);
    // Event listener'ı temizle (Memory Leak önlemi)
    window.removeEventListener('resize', () => this.resize());
  }

  private resize() {
    if (!this.canvas) return;
    const dpr = window.devicePixelRatio || 1;
    this.canvas.width = window.innerWidth * dpr;
    this.canvas.height = window.innerHeight * dpr;
    
    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';
  }
}

export const engine = new TerminalEngine();