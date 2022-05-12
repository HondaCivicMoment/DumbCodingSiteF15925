import Pacman from"./Pacman.js";
import MovingDirection from "./MovingDirection.js";
import Enemy from "./Enemy.js";
export default class TileSheet{
    constructor(tileSize){
        this.tileSize=tileSize;

        this.Blank=new Image();
        this.Blank.src="../Assets/Blank.png";

        this.basicOrb=new Image();
        this.basicOrb.src="../Assets/BasicOrb.png";

        this.Brick=new Image();
        this.Brick.src="../Assets/Brick.png";

        this.powerOrbOne=new Image();
        this.powerOrbOne.src="../Assets/PowerOrb.png";

        this.ghostGreen=new Image();
        this.ghostGreen.src="../Assets/GhostGreen.png";

        this.ghostWhite=new Image();
        this.ghostWhite.src="../Assets/GhostWhite.png";

        this.ghostWeak=new Image();
        this.ghostWeak.src="../Assets/GhostWeak.png";

        this.powerOrb = this.powerOrbOne; 
        this.powerOrbOneAnimationTimerDefault = 20;
        this.powerOrbOneAnimationTimer = this.powerOrbOneAnimationTimerDefault;

    }
    /*
    0 - orb
    1 - wall
    2 - blank
    3 - power orb
    4 - pacman 
    5 - enemy
    */
    sheet = 
    [
        [1,1,1,1,1,1,1,1,1,1,1,1,1],//0
        [1,5,0,0,0,0,1,0,0,0,0,0,1],//1
        [1,0,1,1,1,0,1,0,1,1,1,0,1],//2
        [1,0,3,1,0,0,0,0,0,1,1,0,1],//3
        [1,1,0,1,1,1,0,1,0,0,0,5,1],//4
        [1,1,0,0,0,0,4,1,1,1,1,0,1],//5
        [1,0,0,1,1,0,1,1,0,0,0,0,1],//6
        [1,0,1,1,1,0,1,1,0,1,1,0,1],//7
        [1,0,0,0,0,0,0,0,5,0,0,3,1],//8
        [1,1,1,1,1,1,1,1,1,1,1,1,1],//9
    ]
    draw(ctx){
        for(let row=0; row < this.sheet.length; row++){
            for(let column = 0; column < this.sheet[row].length; column++){
                let tile = this.sheet[row][column];
                if(tile===1){
                    this.#drawBrick(ctx, column, row, this.tileSize);
                } else if(tile===0){
                    this.#drawbasicOrb(ctx, column, row, this.tileSize);
                } else if(tile===3){
                    this.#drawPowerOrb(ctx, column, row, this.tileSize);
                } else if(tile===4){
                    this.#drawbasicOrb(ctx, column, row, this.tileSize);
                } 
                    else{
                        this.#drawBlank(ctx, column, row, this.tileSize);
                    }
                /*ctx.strokeStyle="yellow"
                ctx.strokeRect(column* this.tileSize, row*this.tileSize, this.tileSize,this.tileSize);
            */}
        }
    }
    #drawBlank(ctx, column, row, size){
       ctx.fillStyle ="black";
       ctx.fillRect(column * this.tileSize, row * this.tileSize, size, size);
    }
    #drawBrick(ctx, column, row, size){
        ctx.drawImage(this.Brick, column * this.tileSize, row * this.tileSize, size, size);
    }
    #drawbasicOrb(ctx, column, row, size){
        ctx.drawImage(this.basicOrb, column * this.tileSize, row * this.tileSize, size, size);
    }
    #drawPowerOrb(ctx, column, row, size){
        this.powerOrbOneAnimationTimer--;
        if(this.powerOrbOneAnimationTimer===0){
            this.powerOrbOneAnimationTimer = this.powerOrbOneAnimationTimerDefault;
            if(this.powerOrb == this.powerOrbOne){this.powerOrb = this.basicOrb} else {this.powerOrb = this.powerOrbOne}
        }
        ctx.drawImage(this.powerOrb,column*size, row*size, size, size);
    }
    /*#drawBrick(ctx, column, row, size){
        ctx.drawImage(this.Brick, column * this.tileSize, row * this.tileSize, size, size);
    }*/

    getPacman(velocity){
        for(let row=0; row<this.sheet.length;row++){
            for(let column=0;column<this.sheet.length;column++){
                let tile=this.sheet[row][column]
                if(tile===4){
                    this.sheet[row][column]=0;
                    return new Pacman(column*this.tileSize,row*this.tileSize, this.tileSize, velocity, this);
                }
            }
        }
    }

    getEnemies(velocity){
        const enemies = [];
        for(let row = 0; row < this.sheet.length; row++){
            for(let column =0; column < this.sheet[row].length; column++){
                const tile = this.sheet[row][column];
                if(tile==5){
                    this.sheet[row][column] = 0;
                    enemies.push(new Enemy(column * this.tileSize, row * this.tileSize, this.tileSize, velocity, this));
                }
            }
        }
        return enemies;
    }

    setCanvasSize(canvas){
        canvas.width=this.sheet[0].length*this.tileSize;
        canvas.height=this.sheet.length*this.tileSize;
    }
    didCollideWithEnvironment(x,y,direction){

        if(direction==null){return;}
        
        if(Number.isInteger(x/this.tileSize)&&Number.isInteger(y/this.tileSize)){
            let column=0;
            let row=0;
            let nextColumn=0;
            let nextrow=0;
            switch(direction){
                case MovingDirection.right:
                    nextColumn = x + this.tileSize;
                    column = nextColumn/this.tileSize;
                    row = y/this.tileSize;
                    
                    break;

                case MovingDirection.left:
                    nextColumn = x - this.tileSize;
                    column = nextColumn/this.tileSize;
                    row = y/this.tileSize;
                    break;

                case MovingDirection.down:
                    nextrow = y + this.tileSize;
                    row = nextrow/this.tileSize
                    column = x/this.tileSize;
                    break;

                case MovingDirection.up:
                    nextrow = y - this.tileSize;
                    row = nextrow/this.tileSize
                    column = x/this.tileSize;
                    break;

            }
        
            const tile = this.sheet[row][column];
            if(tile===1){
            return true;
            }
        }
        return false;
    }
    eatDot(x,y){
        const row = y/this.tileSize;
        const column = x/this.tileSize;
        if(Number.isInteger(row) && Number.isInteger(column)){
            if(this.sheet[row][column]===0){
                this.sheet[row][column]=2;
                return true
            }
        }
        return false
    }
    eatPowerDot(x,y){
        const row = y/this.tileSize;
        const column = x/this.tileSize;
        if(Number.isInteger(row) && Number.isInteger(column)){
            const tile = this.sheet[row][column];
            if(tile===3){
                this.sheet[row][column]=2;
                return true
            }
        }
        return false
    }
}
