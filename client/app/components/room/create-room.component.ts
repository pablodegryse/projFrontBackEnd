import {Component} from "@angular/core";
import {FormGroup, Validators, FormControl} from "@angular/forms";
import {Room} from "./room.model";

@Component({
    selector: 'pe-create-room',
    templateUrl: './views/componentViews/create-room.component.html'
})
export class CreateRoomComponent {
    myForm: FormGroup;

    constructor(){}

    onSubmit(){
        const room = new Room(
            this.myForm.value.name
        );
        console.log(room);

        this.myForm.reset();
    }

    ngOnInit() {
        this.myForm = new FormGroup({
            name: new FormControl(null, Validators.required),
        });
    }

}
