import { Component } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import {User} from "./user.model";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";

@Component({
    selector: 'pe-signin',
    templateUrl: './views/componentViews/signin.component.html'
})
export class SigninComponent {
    myForm: FormGroup;

    constructor(private _authService: AuthService,
                private _router: Router,
                private _userService:UserService
    ) {}

    onSubmit() {
        const user = new User(this.myForm.value.email, this.myForm.value.password);
        this._authService.signin(user)
            .subscribe(
                data => {
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('user', JSON.stringify(data.user));
                    this._userService.updateUser(data.user).subscribe();
                    this._router.navigateByUrl('/');
                },
                error => console.error(error)
            );
        this.myForm.reset();
    }

    ngOnInit() {
        this.myForm = new FormGroup({
            email: new FormControl(null, [
                Validators.required,
                Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
            ]),
            password: new FormControl(null, Validators.required)
        });
    }
}