import {Injectable} from "@angular/core";
import {User} from "../components/auth/user.model";
@Injectable()

export class authMockService{
    user:User;

    onSubmit(){
        this.user = new User('test@test.test','test','testUser','testFirstName','testLastName',0,'','online');
        return this.user;
    }

    signIn(user){
        return this.isLoggedIn();
    }

    isLoggedIn(){
        return true;
    }
}