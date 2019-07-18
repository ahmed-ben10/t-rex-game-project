class Main{
    constructor(){
        this.canvas = document.querySelector('canvas');
        this.setCanvas();
        this.player = null;
        this.highScore = 0;
        this.obstacle = [];
        this.numOfObstacles = 3;
        this.obstacleSpeed = 25;
        this.i = 0;
        this.keyUp = false;
        this.beginGame = false;
        this.gameOverSoundCount = 0;
        this.start();
        this.init();
        setInterval(()=>this.animate(),50)
        setInterval(()=> this.createObstacles(),1000);

    }

    setCanvas(){
        this.canvas.width = 600;
        this.canvas.height = 150;
        let marginWidth = (window.innerWidth - this.canvas.width) / 2; 
        let marginHeight = (window.innerHeight - this.canvas.height) / 5; 
        this.canvas.style.marginLeft = marginWidth+"px";
        this.canvas.style.marginTop = marginHeight+"px";
        this.c = this.canvas.getContext('2d');
        this.clearCanvas();
    }

    start(){
        window.addEventListener('keyup',()=> this.beginGame= true);
    }

    init(){
        this.i = 0;
        this.obstacle = [];
        this.numOfObstacles = 3;
        this.player = new Player(30,this.canvas.height - 50.1,35, 50,50,this.highScore,this.canvas,this.c);
        this.createObstacles();
        this.eventListeners();
    }
    
    animate(){
        this.clearCanvas();
        this.background();
        this.createLine();
        if(this.beginGame) {
            this.player.update(this.keyUp);
            if(Math.floor(this.player.score) % 100 == 0) this.setObstacleSpeed();
        }
        else  this.player.draw();
        this.addObstacles();
    }
    
    eventListeners(){
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
            if( this.player.GameOver && e.keyCode == 82) {
                this.init();  
                this.gameOverSoundCount = 0;
            }
        });
    }

    clearCanvas(){
        this.c.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    createLine(){
        this.c.beginPath();
        this.c.moveTo(0, this.canvas.height -2);
        this.c.lineTo(this.canvas.width,this.canvas.height -2);
        this.c.stroke();
    }

    createObstacles(){
        if(this.beginGame){
            this.numOfObstacles+= 1;
            while (this.i < this.numOfObstacles) {
                let x =  (this.i+1)*500 - Math.random()*100 + this.canvas.width;
                let obstacleImg = new Image();
                let obstacleNum = Math.floor(Math.random()*4+1);
                obstacleImg.src = "./assets/obstacle/spike_0"+obstacleNum+".png";
                this.obstacle.push(new Obstacle(x,this.canvas.height - 50,obstacleImg,this.c)); 
                this.i++
            }
        }
    }

    addObstacles(){
        for (let i = 0; i < this.obstacle.length; i++) {
            if(this.beginGame) this.obstacle[i].update();
            else this.obstacle[i].draw();
            let i2 = i-1;
            let theDistance = this.distance(this.player.x, this.player.y, this.obstacle[i].x, this.obstacle[i].y) < this.player.w ;
            this.player.checkIfTouchObstacle(theDistance);
            this.stopGame(theDistance);
        }
    }

    setObstacleSpeed(){
        this.obstacleSpeed+=1;
        for (let i = 0; i < this.obstacle.length; i++) this.obstacle[i].speed = this.obstacleSpeed;
    }

    distance(x1, y1, x2, y2) {
        const xDist = x2 - x1
        const yDist = y2 - y1
        return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2))
    }

    stopGame(GameOver){
        if(GameOver) {
            this.gameOverText();
            for (let i = 0; i < this.obstacle.length; i++) this.obstacle[i].speed = 0;
            this.player.GameOver = true;
            if(this.player.setHighScore()) this.highScore = this.player.setHighScore();
            this.player.highScore = this.highScore;
            this.player.drawScore(); 
            this.playGameOverSound();
            this.beginGame = false;
        }     
    }

    playGameOverSound(){
        if(this.gameOverSoundCount == 0){
            let gameOverSound = new Audio('./assets/audio/gameover.mp3');
            gameOverSound.play();
            this.gameOverSoundCount +=1;
        }
    }

    background(){
        this.c.fillStyle ="white";
        this.c.fillRect(0,0, this.canvas.width,this.canvas.height);
        this.c.fill();
    }

    gameOverText(){
        this.c.fillStyle ="rgb(0,0,0)";
        this.c.font = '30px serif';
        this.c.fillText("GAME OVER",this.canvas.width/3, this.canvas.height/3);
        this.c.font = '15px serif';
        this.c.fillText("PRESS (R) KEY TO PLAY AGAIN",this.canvas.width/3.3, this.canvas.height/2.4);
    }
}
var a = new Main();