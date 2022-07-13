describe('Factory test', () => {
    const { hasKeys } = require('../../src/utils/shorts');

    it('should generate a new user with all him properties', () => {
        const factory = require('../factory');
        const newUser = factory.generateUser();

        const keysExpected = ['firstName', 'surname', 'email', 'cpf', 'password'];

        expect(hasKeys(newUser, keysExpected)).toBe(keysExpected.length);
    });

    it('should generate a new equipment with all its properties', () => {
        const factory = require('../factory');
        const newEquipment = factory.generateEquipment();

        const keysExpected = [
            'title', 'manufacturerId',
            'categoryId', 'model', 'image',
            'locationId', 'statusId',
            'heritage', 'warrantyExpireAt',
        ];

        expect(hasKeys(newEquipment, keysExpected)).toBe(keysExpected.length);

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