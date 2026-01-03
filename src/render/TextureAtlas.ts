// Bu modül, dinamik olarak bir Font Atlası (Sprite Sheet) üretir.
// Dışarıdan PNG yüklemek yerine, tarayıcının font motorunu kullanıyoruz.

export const createFontAtlas = (ctx: WebGL2RenderingContext): WebGLTexture | null => {
  // 1. Sanal bir Canvas oluştur
  const atlasCanvas = document.createElement('canvas');
  const size = 512; // 512x512 piksellik bir alan
  atlasCanvas.width = size;
  atlasCanvas.height = size;
  
  const ctx2D = atlasCanvas.getContext('2d');
  if (!ctx2D) return null;

  // 2. Arka planı şeffaf yap
  ctx2D.clearRect(0, 0, size, size);

  // 3. Font ayarları (Terminal havası için Monospace)
  const fontSize = 32;
  const cols = 16; // Her satırda 16 karakter
  ctx2D.font = `bold ${fontSize}px "Courier New", monospace`;
  ctx2D.textAlign = 'center';
  ctx2D.textBaseline = 'middle';
  ctx2D.fillStyle = 'white'; // Karakterler beyaz (Shader'da renklendireceğiz)

  // 4. ASCII Karakterlerini Çiz (32'den 126'ya kadar)
  const charSize = size / cols; // Her hücrenin boyutu (32px)
  
  for (let i = 0; i < 256; i++) {
    const char = String.fromCharCode(i);
    const x = (i % cols) * charSize;
    const y = Math.floor(i / cols) * charSize;

    // Hücrenin tam ortasına harfi koy
    ctx2D.fillText(char, x + charSize / 2, y + charSize / 2);
  }

  // (Opsiyonel) Atlası görmek istersen bunu açabilirsin:
  // document.body.appendChild(atlasCanvas); 
  // atlasCanvas.style.position = 'absolute';
  // atlasCanvas.style.top = '0';
  // atlasCanvas.style.zIndex = '999';

  // 5. WebGL Texture Oluştur
  const texture = ctx.createTexture();
  ctx.bindTexture(ctx.TEXTURE_2D, texture);

  // Resmi GPU'ya gönder
  ctx.texImage2D(ctx.TEXTURE_2D, 0, ctx.RGBA, ctx.RGBA, ctx.UNSIGNED_BYTE, atlasCanvas);

  // Piksel Art Ayarları (Bulanıklaşmayı önler)
  ctx.texParameteri(ctx.TEXTURE_2D, ctx.TEXTURE_MIN_FILTER, ctx.NEAREST);
  ctx.texParameteri(ctx.TEXTURE_2D, ctx.TEXTURE_MAG_FILTER, ctx.NEAREST);
  ctx.texParameteri(ctx.TEXTURE_2D, ctx.TEXTURE_WRAP_S, ctx.CLAMP_TO_EDGE);
  ctx.texParameteri(ctx.TEXTURE_2D, ctx.TEXTURE_WRAP_T, ctx.CLAMP_TO_EDGE);

  return texture;
};