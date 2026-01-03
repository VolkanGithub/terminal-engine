import React, { useEffect, useRef } from 'react';

const GlitchCursor: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<any[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    const createParticle = (x: number, y: number) => {
      // Sadece 3 parça oluştur (Patlamayı engellemek için sayı az tutuldu)
      for (let i = 0; i < 3; i++) {
        particles.current.push({
          x,
          y,
          size: Math.random() * 3 + 1,
          speedX: (Math.random() - 0.5) * 5,
          speedY: (Math.random() - 0.5) * 5,
          life: 1.0, // Yaşam süresi (opacity gibi düşünebilirsin)
          color: '#00ff41' // Matrix yeşili
        });
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      createParticle(e.clientX, e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      // clearRect yerine çok ince bir siyah katman atarak "trail" (iz) efekti veriyoruz
      ctx.fillStyle = 'rgba(0, 0, 0, 0.15)'; 
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.current.forEach((p, index) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.life -= 0.02; // Her karede %2 azalır

        if (p.life <= 0) {
          particles.current.splice(index, 1);
        } else {
          ctx.strokeStyle = p.color;
          ctx.lineWidth = p.size;
          // Glitch efekti: Kareler çiz
          ctx.strokeRect(p.x, p.y, p.size * 2, p.size * 2);
        }
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        pointerEvents: 'none', // Sayfadaki butonlara tıklayabilmen için ŞART
        zIndex: 9999, // En üstte durması için
        mixBlendMode: 'screen' // Alttaki arka planla karışması için
      }}
    />
  );
};

export default GlitchCursor;