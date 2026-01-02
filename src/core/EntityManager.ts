// Mühendislik Notu: Bu dosya projenin belleğini yönetir.
// Her entity (piksel/karakter) için 12 adet sayısal veri (Float) tutacağız.

export const STRIDE = 12; 
export const MAX_ENTITIES = 10000; // Kapasite: 10.000 Canlı Piksel

// Veri Şeması (Offset Map):
// [0-1] x, y       : Mevcut Konum
// [2-3] tx, ty     : Hedef Konum (Tween için)
// [4-6] r, g, b    : Renk
// [7]   glyph      : Karakter ID (Texture Atlas'tan)
// [8]   start      : Animasyon Başlangıç Zamanı
// [9]   dur        : Animasyon Süresi
// [10-11] vx, vy   : Hız (Fizik için)

export class EntityManager {
  public data: Float32Array;
  public count: number = 0;

  constructor() {
    // 10.000 x 12 = 120.000 slotluk tek parça bellek bloğu (Zero Garbage Collection)
    this.data = new Float32Array(MAX_ENTITIES * STRIDE);
  }

  // Yeni bir entity (piksel) yaratma
  addEntity(x: number, y: number, r: number, g: number, b: number, glyph: number): number {
    if (this.count >= MAX_ENTITIES) {
      console.warn("Tunnel Vision Alert: Maksimum entity sınırına ulaşıldı!");
      return -1;
    }

    const id = this.count;
    const offset = id * STRIDE;

    this.data[offset + 0] = x;
    this.data[offset + 1] = y;
    this.data[offset + 2] = x; // Hedef başlangıçta aynı
    this.data[offset + 3] = y;
    this.data[offset + 4] = r;
    this.data[offset + 5] = g;
    this.data[offset + 6] = b;
    this.data[offset + 7] = glyph;
    
    this.count++;
    return id;
  }
}

// Global Singleton (Tekil Örnek) - Tüm uygulama tek bir manager kullanacak.
export const entityManager = new EntityManager();