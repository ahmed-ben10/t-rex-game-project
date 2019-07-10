class Obstacle{
    constructor(x,y, c){
        this.x = x;
        this.y = y;
        this.w = 10;
        this.h = 50;
        this.c = c;
        this.speed = 5;
        this.gameOver = false;
    }

    draw(){
        this.c.beginPath();
        this.c.fillStyle = 'rgb(255,0,0)';
        this.c.fillRect(this.x, this.y, this.w, this.h);
    }

    update() {
        if(!this.gameOver){
            this.x-= this.speed;
            this.draw();
        }
    }
}
