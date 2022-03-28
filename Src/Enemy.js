import MovingDirection from "./MovingDirection.js";

export default class Enemy{
    constructor(x,y,tileSize,velocity,tileSheet){
        this.x = x;
        this.y = y;
        this.tileSize = tileSize;
        this.velocity = velocity;
        this.tileSheet = tileSheet;
        

        this.#loadImages();

        this.movingDirection = Math.floor(Math.random() * Object.keys(MovingDirection).length);
        this.directionTimerDefault = this.#random(10,50);
        this.directionTimer = this.directionTimerDefault;
    }
    draw(ctx){
        ctx.drawImage(this.image, this.x, this.y, this.tileSize, this.tileSize);
        this.#move();
    }
    #move(){
        if(!this.tileSheet.didCollideWithEnvironment(this.x, this.y, this.movingDirection)){
            switch (this.movingDirection){
                case this.MovingDirection.up:
                    this.y -= this.velocity;
                    break;
                case this.MovingDirection.down:
                    this.y += this.velocity;
                    break;
                case this.movingDirection.right:
                    this.x += this.velocity;
                    break;
                case this.MovingDirection.left:
                    this.x -= this.velocity;
                    break;
            }
        }
    }
    #random(min, max){
        return Math.floor(Math.random() * (max - min + 1))+min;
    }
    #loadImages(){
        this.normalGhost1 = new Image();
        this.normalGhost1.src= "../Assets/GhostBlue.png";

        this.scaredGhostA = new Image();
        this.scaredGhostA.src= "../Assets/GhostWeak.png";

        this.scaredGhostB = new Image();
        this.scaredGhostB.src= "../Assets/GhostWhite.png";

        this.image = this.normalGhost1;
    }
}