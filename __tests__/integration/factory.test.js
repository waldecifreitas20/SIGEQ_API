describe('Factory', () => {
    
    it('should get a new user', () => {
        const factory = require('../factory');
        const newUser = factory.generateUser();

        expect(newUser.fullName.length > 0).toBe(true);
        expect(newUser.email.length > 0).toBe(true);
        expect(newUser.password.length > 0).toBe(true);
        expect(newUser.cpf.length > 0).toBe(true);
    });
});