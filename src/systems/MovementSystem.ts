import { entityManager, STRIDE } from '../core/EntityManager';
import { inputManager } from '../core/InputManager';

class MovementSystem {
  // REFERANS GÖRSELDEKİ RENKLER (Canlı CMYK Glitch Tonları)
  private colors = [
    { r: 0.0, g: 1.0, b: 1.0 }, // CYAN (Camgöbeği)
    { r: 1.0, g: 0.0, b: 1.0 }, // MAGENTA (Eflatun)
    { r: 1.0, g: 1.0, b: 0.0 }, // YELLOW (Sarı)
    { r: 0.0, g: 1.0, b: 0.5 }, // NEON GREEN
    { r: 0.5, g: 0.0, b: 1.0 }, // PURPLE
    { r: 0.9, g: 0.9, b: 0.9 }  // WHITE (Parıltı için)
  ];

  update() {
    const count = entityManager.count;
    const data = entityManager.data;
    const mx = inputManager.mouseX;
    const my = inputManager.mouseY;

    // Ömür tükenme hızı (Küçük sayı = Uzun kuyruk, Büyük sayı = Kısa patlama)
    const DECAY_RATE = 0.025; 

    for (let i = 0; i < count; i++) {
      const offset = i * STRIDE;
      
      let life = data[offset + 12];

      // --- 1. ÖMÜR DÖNGÜSÜ ---
      life -= DECAY_RATE;

      // Eğer parçacık öldüyse (life <= 0), fare konumunda YENİDEN DOĞSUN
      if (life <= 0) {
        life = 1.0; // Ömrü fulle

        // Konumu fareye getir
        data[offset + 0] = mx;
        data[offset + 1] = my;
        
        // Rastgele Hız Ver (Kare şeklinde yayılması için uniform random)
        // 0.05 hızı patlamanın genişliğini belirler
        data[offset + 10] = (Math.random() - 0.5) * 0.05;
        data[offset + 11] = (Math.random() - 0.5) * 0.05;

        // Rastgele Renk Seç
        const color = this.colors[Math.floor(Math.random() * this.colors.length)];
        data[offset + 4] = color.r;
        data[offset + 5] = color.g;
        data[offset + 6] = color.b;
      }

      // --- 2. HAREKET (SABİT HIZ) ---
      let x = data[offset + 0];
      let y = data[offset + 1];
      
      // HATA DÜZELTME: Artık 'const' kullanıyoruz çünkü bu döngüde değerleri değişmiyor
      const vx = data[offset + 10];
      const vy = data[offset + 11];

      x += vx;
      y += vy;

      // Verileri kaydet
      data[offset + 0] = x;
      data[offset + 1] = y;
      data[offset + 12] = life;
    }
  }
}

export const movementSystem = new MovementSystem();