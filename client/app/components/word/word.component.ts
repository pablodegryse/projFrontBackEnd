import {Component, OnInit} from "@angular/core";

@Component({
    selector: 'pe-word',
    templateUrl: './views/componentViews/word.component.html'
})
export class WordComponent implements OnInit{
    word:string;
    words:string[];
    refreshCounter:boolean = true;

    ngOnInit(){
    }



}