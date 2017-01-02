
import {Injectable} from "@angular/core";
//declare var CanvasDrawer:any;

@Injectable()
export class socketMockService{
    CanvasDrawer:any;

    getCanvasDrawer(){
        this.CanvasDrawer = '';
        return this.CanvasDrawer;
    }

    getSocket(){
        return {name:'testSocket'}
    }
}