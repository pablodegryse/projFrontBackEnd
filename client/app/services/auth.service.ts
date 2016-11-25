import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import 'rxjs/Rx';
import 'rxjs/add/operator/map';

import {User} from "../components/auth/user.model";

@Injectable()
export class AuthService {
    constructor(private _http: Http) {}

    register(user: User) {
        console.log("inside authservice" + user);
        const body = JSON.stringify(user);
        const headers = new Headers({'Content-Type': 'application/json'});
        return this._http.post('http://localhost:8080/user', body, {headers: headers})
            .map((response: Response) => response.json());
    }
    signin(user: User) {
        const body = JSON.stringify(user);
        const headers = new Headers({'Content-Type': 'application/json'});
        return this._http.post('http://localhost:8080/user/signin', body, {headers: headers})
            .map((response: Response) => response.json());
    }

    logout() {
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