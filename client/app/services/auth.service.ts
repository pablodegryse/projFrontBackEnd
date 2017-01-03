import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import 'rxjs/Rx';
import 'rxjs/add/operator/map';

import {User} from "../components/auth/user.model";
import {UserService} from "./user.service";

@Injectable()
export class AuthService {
    user:User;
    constructor(private _http: Http,
                private _userService:UserService
    ) {}

    register(user: User) {
        const body = JSON.stringify(user);
        const headers = new Headers({'Content-Type': 'application/json'});
        return this._http.post('http://localhost:8080/user', body, {headers: headers})
            .map((response: Response) => response.json());
    }
    signin(user: User) {
        user.status = 'online';
        const body = JSON.stringify(user);
        const headers = new Headers({'Content-Type': 'application/json'});
        return this._http.post('http://localhost:8080/user/signin', body, {headers: headers})
            .map((response: Response) => response.json());
    }

    logout() {
        this.user = JSON.parse(localStorage.getItem('user'));
        this.user.status = "offline";
        this._userService.updateUser(this.user).subscribe();
        localStorage.clear();
    }

    isLoggedIn() {
        return localStorage.getItem('token') !== null;
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