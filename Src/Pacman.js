import MovingDirection from "./MovingDirection.js";

export default class Pacman{
constructor(x,y,tileSize,velocity,TileSheet) {
    this.x=x;
    this.y=y;
    this.tileSize=tileSize;
    this.velocity=velocity;
    this.TileSheet=TileSheet;
    this.currentMovingDirection=null;
    this.requestMovingDirection=null;
    this.pacmanAnimationTimerDefualt=10;
    this.pacmanAnimationTimer=null;
    document.addEventListener("keydown", this.#keydown)
    this.#loadPacmanAssets();
    }
    draw(ctx){
        this.#move();
        //this.#animate();
        ctx.drawImage(
            this.pacmanAssets[this.pacmanAssetIndex],
            this.x,
            this.y,
            this.tileSize,
            this.tileSize
            )
    }
    #loadPacmanAssets(){
        const pacmanAsset1= new Image();
        pacmanAsset1.src="../Assets/PacmanOne.png";
        const pacmanAsset2= new Image();
        pacmanAsset2.src="../Assets/PacmanTwo.png";
        const pacmanAsset3= new Image();
        pacmanAsset3.src="../Assets/PacmanThree.png";
        const pacmanAsset4= new Image();
        pacmanAsset4.src="../Assets/PacmanThree.png";

        this.pacmanAssets = [
            pacmanAsset1,
            pacmanAsset2,
            pacmanAsset3,
            pacmanAsset4,
        ];
        this.pacmanAssetIndex=0;

    }
    #keydown=(event)=>{
        //up
        if(event.keyCode==38){
            if(this.currentMovingDirection==MovingDirection.down)
                this.currentMovingDirection=MovingDirection.up
            this.requestMovingDirection=MovingDirection.up
            
        }
        //down
        if(event.keyCode==40){
            if(this.currentMovingDirection==MovingDirection.up)
                this.currentMovingDirection=MovingDirection.down
            this.requestMovingDirection=MovingDirection.down
        }
        //left
        if(event.keyCode==37){
            if(this.currentMovingDirection==MovingDirection.right)
                this.currentMovingDirection=MovingDirection.left
            
            this.requestMovingDirection=MovingDirection.left
        }
        //right
        if(event.keyCode==39){
            if(this.currentMovingDirection==MovingDirection.left)
                this.currentMovingDirection=MovingDirection.right
            
            this.requestMovingDirection=MovingDirection.right
        }
    }
    #move(){
        if(this.currentMovingDirection!==this.requestMovingDirection){
            if(Number.isInteger(this.x / this.tileSize)&&Number.isInteger(this.y / this.tileSize)){
                if(!this.TileSheet.didCollideWithEnvironment(this.x, this.y, this.requestMovingDirection))
                    this.currentMovingDirection =this.requestMovingDirection;  
            }
        }
        if(this.TileSheet.didCollideWithEnvironment(this.x, this.y, this.currentMovingDirection)){
            return;
        }
       /* else if(this.currentMovingDirection!=null&&this.pacmanAnimationTimer== null){
            this.pacmanAnimationTimer=this.pacmanAnimationTimerDefualt;
        }*/
        switch(this.currentMovingDirection){

            case MovingDirection.up:
                this.y -= this.velocity; 
                break;

            case MovingDirection.down:
                this.y += this.velocity; 
                break;
            
            case MovingDirection.left:
                this.x -= this.velocity; 
                break;

            case MovingDirection.right:
                this.x += this.velocity; 
                break;
        }
    }
    /*#animate(){
        if(this.pacmanAnimationTimer==null){return;}
        this.pacmanAnimationTimer--;
        if(this.pacmanAnimationTimer==0){
            this.pacmanAnimationTimer = this.pacmanAnimationTimerDefualt;
            this.pacmanAssetIndex++;
            if(this.pacmanAssetIndex==this.pacmanAssets.length){
                this.pacmanAssetIndex==0;
            }

        }
    }*/
}


