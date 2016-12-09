import {Component, ViewChild, Input, AfterViewInit} from '@angular/core';

@Component({
    selector:"pe-queue",
    template:`<div class="centreContentContainerColumn">
                <div class="loaderWrapper">
                      <div class="loader"></div>          
                </div>
                <h2 class="centreSubtitle">{{message}}</h2>
              </div>`
})

export class QueueComponent{
    message:string="You are in the queue, searching for a game...";
}
