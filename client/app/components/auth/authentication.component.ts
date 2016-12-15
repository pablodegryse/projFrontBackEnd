import { Component } from "@angular/core";

@Component({
    selector: 'pe-authentication',
    template: `
        <div class="authBlock">
        <h2>Register</h2>
        <pe-register></pe-register>  
        </div>
        <div class="authBlock">  
        <h2>Sign in</h2>
        <pe-signin></pe-signin>
        </div>`
})
export class AuthenticationComponent {
    constructor() {}

}