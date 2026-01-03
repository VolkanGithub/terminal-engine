export const vertexShaderSource = `
    attribute vec2 a_position;
    attribute vec3 a_color;
    attribute float a_life;

    varying vec4 v_color;

    void main() {
        gl_Position = vec4(a_position, 0.0, 1.0);
        
        // --- GÖRSEL VİZYON ---
        // Referans resimdeki gibi irili ufaklı kareler olsun.
        // Canlıyken büyük (15.0), ölürken küçülsün.
        gl_PointSize = a_life * 15.0 + 2.0;
        
        // Renk canlı kalsın ama ölürken şeffaflaşsın
        v_color = vec4(a_color, a_life);
    }
`;

export const fragmentShaderSource = `
    precision mediump float;
    varying vec4 v_color;

    void main() {
        // WebGL varsayılan olarak KARE çizer. 
        // Glitch efekti için bu mükemmel. Dokunmuyoruz.
        gl_FragColor = v_color;
    }
`;