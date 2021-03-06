import {Component, OnInit} from "@angular/core";
import {SocketService} from "../../services/socket.service";

@Component({
    selector: 'pe-word',
    templateUrl: './views/componentViews/word.component.html'
})
export class WordComponent implements OnInit{
    selectedIndex:number = 0;
    selectedWord:string;
    words:string[];
    canRefresh:boolean = true;
    hideListForSelected:boolean = false;
    globalSocket:any;
    foldStatus:boolean=false;
    foldClass:string="unfolded";
    constructor(private socketService:SocketService){
        this.globalSocket=socketService.getSocket();
        this.setWordSocketEvent(this);
        this.requestWordBatch();
    }

    ngOnInit(){
        // uncomment for offline testing =====> verwijderen voor release build
        // this.words = []; this.words.push("test"); this.words.push("car"); this.words.push("tree");
    }

    setWordSocketEvent(component){
        this.globalSocket.off("deliverWordBatch");
        this.globalSocket.on("deliverWordBatch",function (data) {
           component.canRefresh = data.rollStatus;
           component.words = [];
           for(let word of data.words){
               component.words.push(word.word);
           }
        });
        this.globalSocket.off("wordChoiceConfirmed");
        this.globalSocket.on("wordChoiceConfirmed",function (word) {
           component.selectedWord = word;
           component.hideListForSelected = true;
        });
    }

    updateSelectedIndex(event){
        this.selectedIndex=event.target.value;
    }

    requestWordBatch(){
        if(this.canRefresh){
            this.globalSocket.emit("requestWordBatch");
        }
    }

    confirmWordChoice(){
        this.globalSocket.emit("confirmWordChoice",this.words[this.selectedIndex]);
    }

}