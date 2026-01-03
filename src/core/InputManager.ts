export class InputManager {
  // BAŞLANGIÇ DEĞERLERİNİ DEĞİŞTİRDİK
  // 0 yaparsak merkezde başlar. 9999 yaparsak ekranın çok uzağında başlar.
  public mouseX: number = 9999; 
  public mouseY: number = 9999;
  
  public pixelX: number = 0;
  public pixelY: number = 0;

  public isMoving: boolean = false;

  constructor() {
    window.addEventListener('mousemove', this.handleMouseMove);
  }

  private handleMouseMove = (e: MouseEvent) => {
    this.pixelX = e.clientX;
    this.pixelY = e.clientY;
    this.isMoving = true;

    // WebGL Koordinat Dönüşümü
    this.mouseX = (e.clientX / window.innerWidth) * 2 - 1;
    this.mouseY = -((e.clientY / window.innerHeight) * 2 - 1);
  };
}

export const inputManager = new InputManager();