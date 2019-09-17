function Bullet () {
    this.x;
    this.y;
    this.xSpeed;
    this.ySpeed;
    this.id;

    this.defaultShotSpeed = 2;
    
    this.update = () =>{
        this.x += this.xSpeed;
        this.y += this.ySpeed;
    }
}