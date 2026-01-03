// src/core/EntityManager.ts

// Maksimum parçacık sayısını azaltıyoruz, imleç efekti için 5000 yeterli.
export const MAX_ENTITY_COUNT = 5000;

// Veri Yapısı Genişletildi:
// 0: x, 1: y (Konum)
// 2: targetX, 3: targetY (HEDEF - Şimdilik boş)
// 4: r, 5: g, 6: b (Renk)
// 7: glyph (Boş)
// 8: scale (Boyut - Ömre bağlı değişecek)
// 9: alpha (Görünürlük - Ömre bağlı değişecek)
// 10: vx, 11: vy (Hız)
// 12: life (Ömür - Yeni eklendi, 0 ile 1 arası)
export const STRIDE = 13;

export class EntityManager {
  data: Float32Array;
  count: number = 0;

  constructor() {
    this.data = new Float32Array(MAX_ENTITY_COUNT * STRIDE);
  }

  addEntity(x: number, y: number, r: number, g: number, b: number): number {
    if (this.count >= MAX_ENTITY_COUNT) return -1;

    const offset = this.count * STRIDE;
    this.data[offset + 0] = x;
    this.data[offset + 1] = y;
    this.data[offset + 4] = r;
    this.data[offset + 5] = g;
    this.data[offset + 6] = b;
    this.data[offset + 8] = 1.0; // Başlangıç boyutu
    this.data[offset + 9] = 1.0; // Başlangıç görünürlüğü
    this.data[offset + 12] = 1.0; // Tam ömürle başla

    // Rastgele başlangıç hızı (Patlama efekti için)
    this.data[offset + 10] = (Math.random() - 0.5) * 0.05;
    this.data[offset + 11] = (Math.random() - 0.5) * 0.05;

    const id = this.count;
    this.count++;
    return id;
  }
}

export const entityManager = new EntityManager();