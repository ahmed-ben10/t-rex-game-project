class Player{

    constructor(x, y,vy, w, h,hs, c){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.c = c;
        this.score = 0; 
        this.highScore = hs;
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
        this.c.fillRect(this.x,this.y,this.w,this.h);
        this.drawText();
    }

    drawText(){
        this.c.font = '25px serif';
        let score = Math.floor(this.score).toString();
        let highScore = Math.floor(this.highScore).toString();
        for( let i = 7; i> highScore.length; i--) highScore = "0"+highScore;          
        for( let i = 7; i>score.length; i--) score = "0"+score;          
        let scoreDisplay = "HI "+highScore+" "+ score;
        this.c.fillText(scoreDisplay , innerWidth-200, 90);
        this.c.fill();
    }

    update(keyUp){
        if(!this.touchedObstacle){
            if(keyUp)this.isJumping = true;
            if(this.isJumping && !this.checkReachedTop) this.jump();
            else this.jumpBack();
            if(!this.isJumping) this.jumpBack();
            this.setScore();
            this.draw(); 
        } else {
             this.draw();
        }
        
    }

    setScore(){
        this.score+= 0.3;
    }

    setHighScore(){
        if(this.score > this.highScore) return this.score;
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
