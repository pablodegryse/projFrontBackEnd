import {Component} from "@angular/core";
import {FormGroup, Validators, FormControl} from "@angular/forms";
import {Room} from "./room.model";
import {RoomService} from "../../services/room.service";
import {NavService} from "../../services/nav.service";

@Component({
    selector: 'pe-create-room',
    templateUrl: './views/componentViews/create-room.component.html'
})
export class CreateRoomComponent {
    myForm: FormGroup;

    constructor(private _roomService:RoomService,private _navService:NavService){
        _navService.changeNavSelection("Create Room");
    }

    onSubmit(){
        const room = new Room(
            this.myForm.value.name
        );
        this._roomService.createRoom(room)
            .subscribe(
                data => console.log(data),
                error => console.log(error)
            );

        this.myForm.reset();
    }

    ngOnInit() {
        this.myForm = new FormGroup({
            name: new FormControl(null, Validators.required),
        });
    }

}
