import {UserService} from "../services/user.service";
import {Http, ConnectionBackend} from '@angular/http';
import {User} from "../components/auth/user.model";
import {TestBed, inject} from "@angular/core/testing";
import {userMockService} from "./userMock.service";

describe('UserService test',()=>{
    let userService:UserService;
    let http : Http;
    let users:any;
    let user:User;

    beforeEach(()=>{
        TestBed.configureTestingModule({
            providers: [
                { provide : UserService, useClass: userMockService}
            ]
        });
    });
    beforeEach(inject([UserService],(userService:UserService)=>{
        this.userService=userService;
    }));

    it('should should be created', ()=>{
        expect(this.userService).toBeTruthy();
    });
    it('should have "getUsers" function',()=>{
        expect(this.userService.getUsers).toBeTruthy();
    });
    it('should return Users',()=>{
        this.users = this.userService.getUsers();
       expect(this.users).isPrototypeOf(User);
        });
});