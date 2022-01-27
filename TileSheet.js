import Pacman from"./Pacman.js";
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

    }
    /*
    0 - orb
    1 - wall
    2 - blank
    3 - power orb
    4 - pacman 
    */
    sheet = 
    [
        [1,1,1,1,1,1,1,1,1,1,1,1,1],//0
        [1,0,0,0,0,0,1,0,0,0,0,0,1],//1
        [1,0,1,1,1,0,1,0,1,1,1,0,1],//2
        [1,0,3,1,0,0,0,0,0,1,1,0,1],//3
        [1,1,0,1,1,1,0,1,0,0,0,0,1],//4
        [1,1,0,0,0,0,4,1,1,1,1,0,1],//5
        [1,0,0,1,1,0,1,1,0,0,0,0,1],//6
        [1,0,1,1,1,0,1,1,0,1,1,0,1],//7
        [1,0,0,0,0,0,0,0,0,0,0,3,1],//8
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
                    this.#drawpowerOrbOne(ctx, column, row, this.tileSize);
                } else if(tile===2){
                    this.#drawBlank(ctx, column, row, this.tileSize);
                } else if(tile===4){
                    this.#drawbasicOrb(ctx, column, row, this.tileSize);
                }
                /*ctx.strokeStyle="yellow"
                ctx.strokeRect(column* this.tileSize, row*this.tileSize, this.tileSize,this.tileSize);
            */}
        }
    }
    #drawBlank(ctx, column, row, size){
        ctx.drawImage(this.Blank, column * this.tileSize, row * this.tileSize, size, size);
    }
    #drawBrick(ctx, column, row, size){
        ctx.drawImage(this.Brick, column * this.tileSize, row * this.tileSize, size, size);
    }
    #drawbasicOrb(ctx, column, row, size){
        ctx.drawImage(this.basicOrb, column * this.tileSize, row * this.tileSize, size, size);
    }
    #drawpowerOrbOne(ctx, column, row, size){
        ctx.drawImage(this.powerOrbOne, column * this.tileSize, row * this.tileSize, size, size);
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

    setCanvasSize(canvas){
        canvas.width=this.sheet[0].length*this.tileSize;
        canvas.height=this.sheet.length*this.tileSize;
    }
}
