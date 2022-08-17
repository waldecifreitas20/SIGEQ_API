describe('Factory test', () => {
    const { hasManyKeys } = require('../../src/utils/shorts');
    const factory = require('../factory');

    it('should generate a new user with all him properties', () => {
        const newUser = factory.generateUser();
        const keysExpected = ['firstName', 'surname', 'email', 'cpf', 'password'];

        expect(hasManyKeys(newUser, keysExpected)).toBe(keysExpected.length);
    });

    it('should generate a new equipment with all its properties', () => {
        const newEquipment = factory.generateEquipment();
        const keysExpected = [
            'title', 'manufacturerId',
            'categoryId', 'model', 'image',
            'locationId', 'statusId',
            'warrantyExpiresAt',
        ];

        expect(hasManyKeys(newEquipment, keysExpected)).toBe(keysExpected.length);

    });

    it('should generate permissions', () => {       
        const permissions = factory.generatePermissions({
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