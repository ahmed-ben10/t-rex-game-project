class Main{
    constructor(){
        this.canvas = document.querySelector('canvas');
        this.setCanvas();
        this.player = null;
        this.highScore = 0;
        this.obstacle = [];
        this.numOfObstacles = 3;
        this.i = 0;
        this.keyUp = false;
        this.beginGame = false;
        this.start();
        this.init();
        this.animate();
    }

    setCanvas(){
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.c = this.canvas.getContext('2d');
        this.clearCanvas();
    }

    start(){
        window.addEventListener('keyup',()=> this.beginGame = true);
    }

    init(){
        this.i = 0;
        this.obstacle = [];
        this.numOfObstacles = 3;
        this.player = new Player(this.canvas.width/10,this.canvas.height/2,10, 50,50,this.highScore,this.c);
        this.createObstacles();
        window.addEventListener('resize',()=> {
            this.setCanvas();
            this.init()
        });
        window.addEventListener('keydown',(e)=> {
            switch (e.keyCode) {
                case 32:
                case 38:
                    if(!this.player.GameOver) this.keyUp= true;
                    break;
                default:
                    this.keyUp = false;
                    break;   
            }
        });
        window.addEventListener('keyup',(e)=> {
            this.keyUp = false
            if( this.player.GameOver && e.keyCode == 82) this.init();
        });
    }
    
    animate(){
        requestAnimationFrame(()=>this.animate());
        this.clearCanvas();
        this.background();
        this.createLine();
        if(this.beginGame) this.player.update(this.keyUp);
        else  this.player.draw();
        this.addObstacles();
        if(this.beginGame) setTimeout(this.createObstacles(),10000);
    }
    
    clearCanvas(){
        this.c.clearRect(0, 0, innerWidth, innerHeight);
    }

    createLine(){
        this.c.beginPath();
        this.c.moveTo(0, this.canvas.height/2+50);
        this.c.lineTo(this.canvas.width,this.canvas.height/2+50);
        this.c.stroke();
    }

    createObstacles(){
        this.numOfObstacles+= 1;
        while (this.i < this.numOfObstacles) {
            let x =  (this.i+1)*500 -Math.random()*300;
            if(this.i == 0)  x =(this.i+1)*500;
            this.obstacle.push(new Obstacle(x,this.canvas.height/2,this.c)); 
            this.i++
        }
    }

    addObstacles(){
        for (let i = 0; i < this.obstacle.length; i++) {
            if(this.beginGame) this.obstacle[i].update();
            else this.obstacle[i].draw();
            let theDistance = this.distance(this.player.x, this.player.y, this.obstacle[i].x, this.obstacle[i].y) < this.player.w;
            this.player.checkIfTouchObstacle(theDistance);
            this.stopGame(theDistance);
        }
    }

    distance(x1, y1, x2, y2) {
        const xDist = x2 - x1
        const yDist = y2 - y1
        return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2))
    }

    stopGame(GameOver){
        if(GameOver) {
            this.GameOverText();
            for (let i = 0; i < this.obstacle.length; i++) this.obstacle[i].speed = 0;
            this.player.GameOver = true;
            if(this.player.setHighScore()) this.highScore = this.player.setHighScore();
            this.player.highScore = this.highScore;
            this.player.drawScore(); 
        }     
    }

    background(){
        this.c.fillStyle ="#ADD8E6";
        this.c.fillRect(0,0, this.canvas.width,this.canvas.height);
        this.c.fill();
    }

    GameOverText(){
        this.c.fillStyle ="rgb(0,0,0)";
        this.c.font ="5vw arial";
        this.c.fillText("GAME OVER",innerWidth/3, innerHeight/3);
        this.c.font ="2vw arial";
        this.c.fillText("PRESS (R) KEY TO PLAY AGAIN",innerWidth/2.95, innerHeight/2.5);
    }
}

new Main();
