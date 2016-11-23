import { Component } from "@angular/core";

@Component({
    selector: 'pe-authentication',
    template: `
    <div class="col-md-6">
        <h2>Register</h2>
        <pe-register></pe-register>    
    </div><div class="col-md-6">
        <h2>Sign in</h2>
        <pe-signin></pe-signin>    
    </div>
`
    // template: `
    //     <header class="row spacing">
    //         <nav class="col-md-8 col-md-offset-2">
    //             <ul class="nav nav-tabs">
    //                 <li routerLinkActive="active"><a [routerLink]="['register']">Register</a></li>
    //                 <li routerLinkActive="active"><a [routerLink]="['signin']">Signin</a></li>
    //             </ul>
    //         </nav>
    //     </header>
    //     <div class="row spacing">
    //        <router-outlet></router-outlet>
    //     </div>
    // `
})
export class AuthenticationComponent {
    constructor() {}

}