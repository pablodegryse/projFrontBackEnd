import { Component } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import {User} from "./user.model";


@Component({
    selector: 'pe-signin',
    templateUrl: './views/componentViews/signin.component.html'
})
export class SigninComponent {
    myForm: FormGroup;

    constructor() {}

    onSubmit() {
        const user = new User(this.myForm.value.email, this.myForm.value.password);
        console.log(user);
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