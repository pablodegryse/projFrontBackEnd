import { Component } from "@angular/core";

@Component({
    selector: 'pe-logout',
    template: `
        <div class="col-md-8 col-md-offset-2">
            <button class="btn btn-danger" >Logout</button>
        </div>
    `
})
export class LogoutComponent {
    constructor() {}

}