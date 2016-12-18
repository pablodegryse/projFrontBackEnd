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
        return this._http.get('http://localhost:8080/user')
            .map((response:Response)=> {
                const users = response.json().obj;
                let transformedUsers: User[] = [];
                for (let user of users) {
                    transformedUsers.push(new User(
                        user.email,
                        user.password,
                        user.nickName,
                        user.firstName,
                        user.lastName,
                        user.points,
                        user._id,
                        user.status,
                        user.friends
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

    updateUser(userToChange:User){
        const body = JSON.stringify(userToChange);
        const headers = new Headers({'Content-Type': 'application/json'});
        const userId = localStorage.getItem('user')? JSON.parse(localStorage.getItem('user'))._id:'';

        return this._http.patch('http://localhost:8080/user/' + userId , body, {headers: headers})
            .map((response: Response) => response.json());
    }

    getFriends(user:any){
        //noinspection TypeScriptUnresolvedVariable
        var userId = user._id;
        return this._http.get('http://localhost:8080/user/' + userId)
            .map((response:Response)=>{
                const user = response.json().obj;
                let transformedFriends : User[] =[];
                for(let friend of user.friends){
                    transformedFriends.push(new User(
                        friend.email,
                            friend.password,
                            friend.nickName,
                            friend.firstName,
                            friend.lastName,
                            friend.points,
                            friend._id,
                        friend.status,
                        friend.friends
                    ));
                }
                return transformedFriends;
            })
    }
}