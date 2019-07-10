class Player{

    constructor(x, y,vy, w, h, c){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.c = c;
        this.vy = vy;
        this.maxJumpHeight = y - h*2;
        this.isJumping = false;
        this.reachedTop = false;
        this.checkReachedTop = false;
        this.startPlace = y;
    }

    draw(){
        this.c.beginPath();
        this.c.fillStyle = 'rgb(0,0,255)';
        document.getElementById('x').innerHTML = this.x+"-"+ this.y;
        this.c.fillRect(this.x,this.y,this.w,this.h);
    }

    update(keyUp){
        if(!this.touchedObstacle){
            if(keyUp)this.isJumping = true;
            if(this.isJumping && !this.checkReachedTop) this.jump();
            else this.jumpBack();
            if(!this.isJumping) this.jumpBack();
            this.draw(); 
        } else this.draw();
        
    }

    jump(){
        this.reachedTop = this.y >= this.maxJumpHeight;
        if(!this.reachedTop) this.checkReachedTop = true;
        if(this.reachedTop) this.y-= this.vy*0.5;
        else this.isJumping = true;  
    }

    jumpBack(){  
        if(this.y < this.startPlace) this.y+=this.vy*0.3;
        else {this.isJumping= false; this.checkReachedTop = false};
    }

    checkIfTouchObstacle(isDead){
        if(isDead){
            this.touchedObstacle = true;
        }
    }

}
