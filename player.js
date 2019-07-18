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
        this.isRunning = false;
        this.numRunning = 1
        this.maxJumpHeight = y - h*2.5;
        this.isJumping = false;
        this.reachedTop = false;
        this.checkReachedTop = false;
        this.startPlace = y;
        this.image = new Image();
    }

    draw(){
        this.c.beginPath();
        this.drawImage();
        this.drawScore();
    }

    drawImage(){
        if(this.isJumping) this.image.src = "./assets/dino/dino.png";
        else if(this.isRunning){
            this.image.src ="./assets/dino/dino_run"+this.numRunning+".png";
            if(this.numRunning == 1) this.numRunning +=1;
            else this.numRunning =1;
        } else  this.image.src ="./assets/dino/dino.png";
        this.c.drawImage(this.image,this.x,this.y, this.w, this.h);
    }

    drawScore(){
        this.c.fillStyle = 'rgb(0,0,0)';
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
            this.isRunning = true;
            if(keyUp)this.isJumping = true;
            if(this.isJumping && !this.checkReachedTop) this.jump();
            else this.jumpBack();
            if(!this.isJumping) this.jumpBack();
            this.setScore();
            this.draw(); 
        } else {
            this.isRunning = false;
             this.draw();
        }
        
    }

    setScore(){
        this.score+= 1;
    }

    setHighScore(){
        if(this.score > this.highScore) return this.score;
    }

    jump(){
        this.reachedTop = this.y >= this.maxJumpHeight;
        if(!this.reachedTop) this.checkReachedTop = true;
        if(this.reachedTop) this.y-= this.vy;
        else this.isJumping = true;  
    }

    jumpBack(){  
        if(this.y < this.startPlace) this.y+=this.vy;
        else {this.isJumping= false; this.checkReachedTop = false};
    }

    checkIfTouchObstacle(isDead){
        if(isDead){
            this.touchedObstacle = true;
        }
    }

}
