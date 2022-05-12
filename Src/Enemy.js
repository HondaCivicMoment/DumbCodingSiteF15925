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
        this.scaredAboutToExpireTimerDefault = 10;
        this.scaredAboutToExpireTimer = this.scaredAboutToExpireTimerDefault;
    }
    draw(ctx, pause, pacman){
        if(!pause){
            this.#move();
            this.#changeDirection();
        }
        this.#setImage(ctx, pacman);
    }
    #setImage(ctx, pacman){
        if(pacman.powerDotActive){this.#setImageWhenPowerDotIsActive(pacman)}else{this.image=this.normalGhost1;}
        ctx.drawImage(this.image, this.x, this.y, this.tileSize, this.tileSize);
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
    #setImageWhenPowerDotIsActive(pacman){
        if(pacman.powerDotAboutToExpire){
            this.scaredAboutToExpireTimer--;
            if(this.scaredAboutToExpireTimer===0){
                this.scaredAboutToExpireTimer = this.scaredAboutToExpireTimerDefault;
                if(this.image===this.scaredGhostA){
                    this.image = this.scaredGhostB
                }
                else{
                    this.image = this.scaredGhostA; 
                }
            }
        }
        else{
            this.image = this.scaredGhostA;
        }
    }
    #random(min, max){
        return Math.floor(Math.random() * (max - min + 1))+min;
    }
    #loadImages(){
        this.normalGhost1 = new Image();
        this.normalGhost1.src= "../Assets/GhostGreen.png";

        this.scaredGhostA = new Image();
        this.scaredGhostA.src= "../Assets/GhostWeak.png";

        this.scaredGhostB = new Image();
        this.scaredGhostB.src= "../Assets/GhostWhite.png";

        this.image = this.normalGhost1;
    }
    collideWith(pacman) {
        const size = this.tileSize / 2;
        if (
          this.x < pacman.x + size &&
          this.x + size > pacman.x &&
          this.y < pacman.y + size &&
          this.y + size > pacman.y
        ) {
          return true;
        } else {
          return false;
        }
      }
    
}