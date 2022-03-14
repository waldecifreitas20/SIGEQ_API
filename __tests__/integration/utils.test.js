describe('Finder.js test', () => {
    const finder = require('../../src/utils/finder');
    const { resolve : getPath } = require('path');

    it('should return an array of filenames by a specific folder without their index.js', () => {
        const folderPath = getPath('src', 'api', 'controllers');
        const filenames = finder.getFilesName(folderPath);

        expect(filenames.length > 0).toBe(true);
    });
});

describe('security.js test', () => {
    const { generateToken } = require('../../src/utils/security');
    
    it('should return a token', () => {
        const userData = require('../factory').generateUser();    
        const token = generateToken(userData);
        
        expect(token.length > 0).toBe(true);
    });
});