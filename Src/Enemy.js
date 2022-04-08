import MovingDirection from "./MovingDirection.js";

export default class Enemy{
    constructor(x,y,tileSize,velocity,tileSheet){
        this.x = x;
        this.y = y;
        this.tileSize = tileSize;
        this.velocity = velocity;
        this.tileSheet = tileSheet;
        

        this.#loadImages();

        this.MovingDirection = Math.floor(Math.random() * Object.keys(MovingDirection).length);
        this.directionTimerDefault = this.#random(10,50);
        this.directionTimer = this.directionTimerDefault;
    }
    draw(ctx){
        ctx.drawImage(this.image, this.x, this.y, this.tileSize, this.tileSize);
        this.#move();
        this.#changeDirection();
    }
    #changeDirection(){
        this.directionTimer--;
        let newMoveDirection = null;
        if(this.directionTimer==0){
            this.directionTimer = this.directionTimerDefault;
            newMoveDirection =Math.floor(Math.random()*Object.keys(MovingDirection).length);{
                if(newMoveDirection != null && this.MovingDirection != newMoveDirection){
                    if(Number.isInteger(this.x / this.tileSize)&&(Number.isInteger(this.y / this.tileSize))){
                        if(!this.tileSheet.didCollideWithEnvironment(this.x, this.y, newMoveDirection)){
                            this.MovingDirection = newMoveDirection;
                        }
                    }
                }
            }
        }
    }
    #move(){
        if(!this.tileSheet.didCollideWithEnvironment(this.x, this.y, this.MovingDirection)){
            switch (this.MovingDirection){
                case MovingDirection.up:
                    this.y -= this.velocity;
                    break;
                case MovingDirection.down:
                    this.y += this.velocity;
                    break;
                case MovingDirection.right:
                    this.x += this.velocity;
                    break;
                case MovingDirection.left:
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
