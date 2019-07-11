class Main{
    constructor(){
        this.canvas = document.querySelector('canvas');
        this.setCanvas();
        this.player = null;
        this.highScore = 0;
        this.obstacle = [];
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
        this.obstacle = [];
        this.player = new Player(50,innerHeight/2,10, 50,50,this.highScore,this.c);
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
            if( this.player.GameOver && e.keyCode == 32) this.init();
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
    }
    
    clearCanvas(){
        this.c.clearRect(0, 0, innerWidth, innerHeight);
    }

    createLine(){
        this.c.beginPath();
        this.c.moveTo(0, innerHeight/2+50);
        this.c.lineTo(innerWidth,innerHeight/2+50);
        this.c.stroke();
    }

    createObstacles(){
        for (let i = 0; i < 20 ; i++) {
            let x =  (i+1)*500;
            this.obstacle.push(new Obstacle(x,innerHeight/2,this.c)); 
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

    stopGame(theDistance){
        if(theDistance) {
            for (let i = 0; i < this.obstacle.length; i++) this.obstacle[i].speed = 0;
            this.player.GameOver = true;
            if(this.player.setHighScore()) this.highScore = this.player.setHighScore();
        }     
    }

    background(){
        this.c.fillStyle ="#ADD8E6";
        this.c.fillRect(0,0, this.canvas.width,this.canvas.height);
        this.c.fill();
    }
}

new Main();
