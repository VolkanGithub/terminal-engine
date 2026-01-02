import { useEffect, useRef } from 'react';
import { engine } from './core/Engine';

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // React bileşeni ekrana geldiğinde Motoru çalıştır
    if (canvasRef.current) {
      engine.init(canvasRef.current);
    }

    // Temizlik (Component unmount olursa motoru durdur)
    return () => {
      engine.stop();
    };
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* Motorun Render Alanı.
        Tüm "Eastward" ve "Metal Slug" dünyası bu canvas içinde dönecek.
      */}
      <canvas 
        ref={canvasRef} 
        className="block w-full h-full"
      />

      {/* UI Katmanı (React)
        Puzzle formları, menüler ve yazılar Canvas'ın ÜZERİNDE yüzecek.
      */}
      <div className="absolute top-0 left-0 p-4 text-white pointer-events-none">
        <h1 className="text-2xl font-bold font-mono">TERMINAL ENGINE <span className="text-green-500">v1.0</span></h1>
        <p className="text-xs text-gray-500">System Status: ONLINE</p>
      </div>
    </div>
  );
}

export default App;