import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";

import { User } from "./user.model";

@Component({
    selector: 'pe-register',
    templateUrl: './views/componentViews/register.component.html'
})
export class RegisterComponent implements OnInit {
    myForm: FormGroup;

    constructor() {}

    onSubmit() {
        const user = new User(
            this.myForm.value.email,
            this.myForm.value.password,
            this.myForm.value.nickName,
            this.myForm.value.firstName,
            this.myForm.value.lastName
        );

        this.myForm.reset();
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