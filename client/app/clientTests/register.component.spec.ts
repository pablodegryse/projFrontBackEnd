
import {RegisterComponent} from "../components/auth/register.component";
import {ComponentFixture, async, TestBed, inject} from "@angular/core/testing";
import {ReactiveFormsModule} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {authMockService} from "./authMock.service";
import {RouterTestingModule} from "@angular/router/testing";
import {User} from "../components/auth/user.model";
describe('RegisterComponent',()=>{
    let authService:AuthService;
    let comp : RegisterComponent;
    let fixture: ComponentFixture<RegisterComponent>;
    let isLoggedIn:boolean;
    let user:User;

    beforeEach(async(()=>{
        TestBed.configureTestingModule({
            declarations:[RegisterComponent],
            imports:[ReactiveFormsModule, RouterTestingModule],
            providers:[{provide:AuthService,useClass:authMockService}]
        });
        TestBed.compileComponents();
    }));
    beforeEach(inject([AuthService],(authService:AuthService)=>{
        this.authService = authService;
    }));

    it('should be created',()=>{
        fixture = TestBed.createComponent(RegisterComponent);
        comp = fixture.componentInstance;
        expect(comp).toBeTruthy();
    });

    it('should login user on signup',()=>{
        fixture = TestBed.createComponent(RegisterComponent);
        comp = fixture.componentInstance;
        this.isLoggedIn = this.authService.signIn('John');
        expect(this.isLoggedIn).toBeTruthy();
    });

    it('should make a new user when submitting the form',()=>{
        this.user = this.authService.onSubmit();
        expect(this.user).isPrototypeOf(User);
    });

    it('user should be "online" when submitting',()=>{
        this.user = this.authService.onSubmit();
        expect(this.user.status).toContain('online');
    })

});