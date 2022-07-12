describe('Factory test', () => {
    const {hasKeys} = require('../../src/utils/shorts');

    it('should generate a new user with all him properties', () => {
        const factory = require('../factory');
        const newUser = factory.generateUser();

        expect(newUser.first_name.length > 0).toBe(true);
        expect(newUser.surname.length > 0).toBe(true);
        expect(newUser.email.length > 0).toBe(true);
        expect(newUser.password.length > 0).toBe(true);
        expect(newUser.cpf.length > 0).toBe(true);
    });

    it('should generate a new equipment with all its properties', () => {
        const factory = require('../factory');
        const newEquipment = factory.generateEquipment();

        expect(newEquipment.title != null).toBe(true);
        expect(newEquipment.manufacturerId != null).toBe(true);
        expect(newEquipment.categoryId != null).toBe(true);
        expect(newEquipment.model != null).toBe(true);
        expect(newEquipment.locationId != null).toBe(true);
        expect(newEquipment.statusId > 0).toBe(true);
        expect(newEquipment.heritage != null).toBe(true);
        expect(newEquipment.warrantyExpireAt != null).toBe(true);
        expect(newEquipment.image != null).toBe(true);
    });

    it('should generate permissions', () => {
        const { generatePermissions } = require('../factory');
        const permissions = generatePermissions({
            create: true, 
            read: true, 
            update: true,
            remove: true,
        });
        const permissionsExpected = ['create', 'delete', 'read', 'update'];

        permissions.forEach(permission => {
            const hasPermission = permissionsExpected.indexOf(permission.name) != -1;
            expect(hasPermission).toBe(true)
        });
       
    });
});