import {Injectable, EventEmitter} from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import {Room} from "../components/room/room.model";
import {User} from "../components/auth/user.model";


@Injectable()
export class RoomService {
    private rooms : Room[] =[];
    roomIsUpdated = new EventEmitter<Room>();

    constructor(private http: Http) {}

    createRoom(room: Room) {
        const body = JSON.stringify(room);
        const headers = new Headers({'Content-Type': 'application/json'});
        const token = localStorage.getItem('token')? '?token=' + localStorage.getItem('token') : '';

        return this.http.post('http://localhost:8080/room' + token , body, {headers: headers})
            .map((response: Response) => {
                const result = response.json();
                const room = new Room(
                    result.obj.name,
                    result.obj.users,
                    result.obj._id);
                return room;
            });
    }

    getRooms() {
        this.rooms =[];
        return this.http.get('http://localhost:8080/room')
            .map((response: Response) => {
                console.log(response);
                const rooms = response.json().obj;
                for(let room of rooms){
                    this.rooms.push(new Room(
                        room.name,
                        room.users,
                        room._id
                    ));
                }
                return this.rooms;

            });
    }

    editRoom(room:Room){
        console.log("emmit room edit");
        this.roomIsUpdated.emit(room);
    }

    updateRoom(room:Room){
        const body = JSON.stringify(room);
        const headers = new Headers({'Content-Type': 'application/json'});

        const user = localStorage.getItem('userId')? '?user=' + localStorage.getItem('userId'):'';

        return this.http.patch('http://localhost:8080/room/' + room.roomId + user , body, {headers: headers})
            .map((response: Response) => response.json());
    }

}