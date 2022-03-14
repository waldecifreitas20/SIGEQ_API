const fs = require('fs');
const {resolve : getPath} = require('path');

describe('Create equipment test', () => {
    it('should return true', () => {
        const file = fs.readFileSync(getPath('__tests__/mouse.jpg'));
        console.log(file[1]);

        expect(file != null).toBe(true);

    });
});

describe('Delete equipment test', () => {});
describe('Get by heritage equipment test', () => {});
describe('Get all equipment test', () => {});
describe('Update equipment test', () => {});