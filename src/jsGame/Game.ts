import { Bird } from "../../applic/pkg/applic";

export const worldWidth=600;
export const worldHeight=400;

export class BirdJs{
    x:number;
    y: number;
    size:number;
    velocity: number;
    constructor(){
        this.x= worldWidth/2, 
        this.y= worldHeight/2,
        this.size= 15, 
        this.velocity= -1
    }
    update(){
        this.y=this.y+0.5;
        if(this.y>worldHeight){
            this.y=worldHeight;
        }
    }
    flyUpwards(){
        this.y=this.y-30;
       
    }
}

export class PipeJs{
    x: number;
    width: number;
    top: number;
    bottom: number;
    pipe_spawn_rate: number;
    constructor(){
        this.x=worldWidth;
        this.width=100;
        this.top=Date.now()%worldHeight;
        this.bottom=Date.now()%worldHeight;
        this.pipe_spawn_rate=worldWidth
    }
}