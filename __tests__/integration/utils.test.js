describe('Finder.js test', () => {
    const finder = require('../../src/utils/shorts');
    const { resolve: getPath } = require('path');

    it('should return an array of filenames by a specific folder without their index.js', () => {
        const folderPath = getPath('src', 'api', 'controllers');
        const filenames = finder.getFilesName(folderPath);

        expect(filenames.length > 0).toBe(true);
    });

    it('should return -1 when check if array of filenames has index.js inside it', () => {
        const folderPath = getPath('src', 'api', 'controllers');
        const filenames = finder.getFilesName(folderPath);

        expect(filenames.indexOf('index.js')).toBe(-1);
    });
});

describe('security.js test', () => {
    const { generateToken } = require('../../src/utils/security');

    it('should return a JWT', () => {
        const userData = require('../factory').generateUser();
        const token = generateToken(userData);

        expect(token.length > 0).toBe(true);
    });

    it('should return true when compare a password with a hash of itself', () => {

    });

    it('should return false when compare a password with a hash of anything', () => {

    });



});

