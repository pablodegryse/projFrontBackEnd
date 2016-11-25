import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";

import { User } from "./user.model";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
    selector: 'pe-register',
    templateUrl: './views/componentViews/register.component.html'
})
export class RegisterComponent implements OnInit {
    myForm: FormGroup;

    constructor(private _authService: AuthService, private _router:Router) {}

    onSubmit() {
        const user = new User(
            this.myForm.value.email,
            this.myForm.value.password,
            this.myForm.value.nickName,
            this.myForm.value.firstName,
            this.myForm.value.lastName
        );
        console.log("register comp:" + user);

        this._authService.register(user).subscribe(
            data => this.signIn(user)
        );

        this.myForm.reset();
    }

    signIn(user){
        this._authService.signin(user)
            .subscribe(
                data=>{
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('userId', data.userId);
                    this._router.navigateByUrl('/')
                }
            )
    }

    ngOnInit() {
        this.myForm = new FormGroup({
            nickName: new FormControl(null, Validators.required),
            firstName: new FormControl(null, Validators.required),
            lastName: new FormControl(null, Validators.required),
            email: new FormControl(null, [
                Validators.required,
                Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
            ]),
            password: new FormControl(null, Validators.required)
        });
    }
}