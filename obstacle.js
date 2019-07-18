class Obstacle{
    constructor(x,y,img, c){
        this.x = x;
        this.y = y;
        this.w = 70;
        this.h = 70;
        this.c = c;
        this.speed = 25;
        this.gameOver = false;
        this.obstacleImg = img;
    }

    draw(){
        this.c.drawImage(this.obstacleImg,this.x, this.y, this.w, this.h);
    }

    update() {
        if(!this.gameOver){
            this.x-= this.speed;
            this.draw();
        }
    }
}
