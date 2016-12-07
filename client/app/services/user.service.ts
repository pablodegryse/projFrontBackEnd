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
        //this.users =[];
        return this._http.get('http://localhost:8080/user')
            .map((response:Response)=> {
                console.log(response);
                const users = response.json().obj;
                let transformedUsers: User[] = [];
                for (let user of users) {
                    transformedUsers.push(new User(
                        user.email,
                        user.password,
                        user.nickName,
                        user.firstName,
                        user.lastName,
                        user.points
                    ));
                }
                this.users = transformedUsers;
                return transformedUsers;
            })
    };

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