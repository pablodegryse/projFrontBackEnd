import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import 'rxjs/Rx';
import 'rxjs/add/operator/map';

import {User} from "../components/auth/user.model";

@Injectable()
export class UserService {
    private users:User[];
    constructor(private _http: Http) {}

    getUsers(){
        this.users =[];
        return this._http.get('http://localhost:8080/user')
            .map((response:Response)=>{
                console.log("response inside getUsers() : " + response);
                const usersReceived = response.json().obj;
                console.log("users inside getUsers(): " + usersReceived);
                for(let user of usersReceived){
                    this.users.push(new User(
                        user.email,
                        user.password,
                        user.nickName,
                        user.firstName,
                        user.lastName,
                        user.points
                    ));
                }
                return this.users;
            })
    }

    getUserById(id: string){
        return this._http.get('http://localhost:8080/user/' +id)
            .map((response: Response) => {
                const result = response.json();
                const user = new User(
                    result.obj.email,
                    result.obj.password,
                    result.obj.nickName,
                    result.obj.firstName,
                    result.obj.lastName,
                    result.obj.roomId
                );
                return user;
            });

    }
}