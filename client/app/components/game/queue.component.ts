import {Component, ViewChild, Input, AfterViewInit} from '@angular/core';

@Component({
    selector:"pe-queue",
    template:`<div>
                <p>{{message}}</p>
              </div>`
})

export class QueueComponent{
    message:string="You are in the queue, searching for a game...";
}
