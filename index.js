var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth - 2;
canvas.height = window.innerHeight - 6;
var c = canvas.getContext('2d');


var player;
var obstacle = [];
var keyUp = false;

function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);
    c.beginPath();
    c.moveTo(0, 350);
    c.lineTo(innerWidth,350);
    c.stroke();
    player.update(keyUp);
    for (let i = 0; i < obstacle.length; i++) {
        obstacle[i].update();
        let theDistance = distance(player.x, player.y, obstacle[i].x, obstacle[i].y) < player.w+ obstacle[i].w -15;
        player.checkIfTouchObstacle(theDistance);
        stopGame(theDistance)
    }
}

function init(){
    obstacle = [];
    player = new Player(50,300,10, 50,50,c);
    for (let i = 0; i < 20 ; i++) {
        let x =  (i+1)*300;
        obstacle.push(new Obstacle(x,300,c)); 
        console.log(obstacle)
    }
    window.addEventListener('keydown',(e)=> {
        switch (e.keyCode) {
            case 27:
                init();
                break;
            case 32:
                keyUp= true;
                break;
            default:
                keyUp = false;
                break;   
        }
    });
    window.addEventListener('keyup',(e)=> keyUp =false);
}


function distance(x1, y1, x2, y2) {
    const xDist = x2 - x1
    const yDist = y2 - y1
    return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2))
}

function stopGame(theDistance){
    if(theDistance) {
        for (let i = 0; i < obstacle.length; i++) obstacle[i].speed = 0;
        player.GameOver = true;
    }     
    
}
init();
animate();