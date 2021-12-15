class ThrownBottle extends MovableObject {
  name = 'thrown bottle';
  IMAGES_ROTATING = [
    './img/6.botella/Rotacion/Mesa de trabajo 1 copia 3.png',
    './img/6.botella/Rotacion/Mesa de trabajo 1 copia 4.png',
    './img/6.botella/Rotacion/Mesa de trabajo 1 copia 5.png',
    './img/6.botella/Rotacion/Mesa de trabajo 1 copia 6.png',
  ];
  IMAGES_SALSA = [
    './img/6.botella/Rotacion/Splash de salsa/Mesa de trabajo 1 copia 7.png',
    './img/6.botella/Rotacion/Splash de salsa/Mesa de trabajo 1 copia 8.png',
    './img/6.botella/Rotacion/Splash de salsa/Mesa de trabajo 1 copia 9.png',
    './img/6.botella/Rotacion/Splash de salsa/Mesa de trabajo 1 copia 10.png',
    './img/6.botella/Rotacion/Splash de salsa/Mesa de trabajo 1 copia 11.png',
    './img/6.botella/Rotacion/Splash de salsa/Mesa de trabajo 1 copia 12.png',
  ];
  explode = false;
  destroyed = false;

  constructor(worldCanvas, x, y, startspeed_x, toTheLeft) {
    super(worldCanvas).loadImage(this.IMAGES_ROTATING[0]);
    super.loadAllImages(this.IMAGES_ROTATING);
    super.loadAllImages(this.IMAGES_SALSA);
    this.setDimensions(x, y, startspeed_x);
    this.animate(toTheLeft);
    this.applyGravity(100);
  }

  setDimensions(x, y, startspeed_x) {
    this.x = x;
    this.y = y;
    this.height = 0.1 * this.worldCanvas.height;
    this.width = 0.1 * this.worldCanvas.height;
    this.moveX = this.worldCanvas.width / 50 + startspeed_x;
    this.y_landing = this.worldCanvas.height;
  }

  getCollisionCoordinates() {
    this.setCollisionCoordinates(
      0.2 * this.width,
      0.8 * this.width,
      0.2 * this.width,
      0.8 * this.width,
      0.2 * this.width,
      0.8 * this.width,
      this.changeDirection
    );
  }

  animate(toTheLeft) {
    this.moveUp(13);
    let bottleInterval = setInterval(() => {
      if (!pause) {
        if (!this.explode) {
          this.playAnimation(this.IMAGES_ROTATING);
          if(this.y == this.y_landing){
            this.clearBottleIntervals(bottleInterval);
          }
          if (toTheLeft) {
            this.moveLeft();
          } else {
            this.moveRight();
          }
        } else {
          this.bottleExplode(bottleInterval);
        }
      }
    }, 1000 / 25);
  }

  bottleExplode(bottleInterval) {
    this.height = 0.2 * this.worldCanvas.height;
    this.width = 0.2 * this.worldCanvas.height;
    this.y_landing = this.y;
    this.playAnimation(this.IMAGES_SALSA);
    if (this.img.src.includes('12.png')) {
      this.clearBottleIntervals(bottleInterval);
    }
  }

  clearBottleIntervals(bottleInterval){
    [bottleInterval, this.gravityInterval].forEach(i => clearInterval(i));
    setTimeout(() => {
      this.destroyed = true;
    }, 100);
  }
}
