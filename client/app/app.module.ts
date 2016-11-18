//this is the entry point to the application , we add our components here
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './components/app.component';

@NgModule({
    imports:[BrowserModule],
    declarations:[AppComponent],
    bootstrap:[AppComponent]
})

export class AppModule{
}