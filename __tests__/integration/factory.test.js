describe('Factory', () => {
    const factory = require('../factory');
    const newUser = factory.generateUser();

    it('should get a new user', () => {

        console.log(newUser);

        expect(newUser.fullName.length > 0).toBe(true);
        expect(newUser.email.length > 0).toBe(true);
        expect(newUser.password.length > 0).toBe(true);
        expect(newUser.cpf.length > 0).toBe(true);
    });
});