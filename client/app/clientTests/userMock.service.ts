import {Injectable} from "@angular/core";
import {User} from "../components/auth/user.model";
@Injectable()

export class userMockService{
    users:any = [new User('test@test.test','test')];

    getUsers(){
        return this.users;
    }
}