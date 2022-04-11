describe('Factory', () => {
    
    it('should generate a new user', () => {
        const factory = require('../factory');
        const newUser = factory.generateUser();

        expect(newUser.first_name.length > 0).toBe(true);
        expect(newUser.surname.length > 0).toBe(true);
        expect(newUser.email.length > 0).toBe(true);
        expect(newUser.password.length > 0).toBe(true);
        expect(newUser.cpf.length > 0).toBe(true);
    });
    
    it('should generate a new equipment', () => {
        const factory = require('../factory');
        const newEquipment = factory.generateEquipment();

        expect(newEquipment.company.length > 0).toBe(true);
        expect(newEquipment.current_location.length > 0).toBe(true);
        expect(newEquipment.heritage > 0).toBe(true);
        expect(newEquipment.image != null).toBe(true);
        expect(newEquipment.status.length > 0).toBe(true);
        expect(newEquipment.warrantyExpireAt != null).toBe(true);
    });
});