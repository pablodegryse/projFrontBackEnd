import { User } from '../components/auth/user.model';

describe('UserModel testing',()=>{

    let user:User;

    beforeEach(()=>{
      user = new User('test@test.test','test','test1','test1Fn','test1Ln',0,'','online',[],'');
    });

    it('should have an email property',()=>{
        expect(user.email).toBeTruthy();
    });

    it('should take atleast 2 properties',()=>{
        expect(user.constructor.length).toBeGreaterThan(2);
    })

});