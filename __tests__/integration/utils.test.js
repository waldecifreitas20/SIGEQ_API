
describe('shorts.js test', () => {
    const { getFilesName, isEmptyArray } = require('../../src/utils/shorts');
    const { resolve: getPath } = require('path');

    it('should return an array of filenames by a specific folder without their index.js', () => {
        const folderPath = getPath('src', 'api', 'controllers');
        const filenames = getFilesName(folderPath);

        expect(filenames.length > 0).toBe(true);
    });

    it('should return -1 when check if array of filenames has index.js inside it', () => {
        const folderPath = getPath('src', 'api', 'controllers');
        const filenames = getFilesName(folderPath);

        expect(filenames.indexOf('index.js')).toBe(-1);
    });

    it('should return true when check if a array is empty', () => {
        const emptyArray = [];
        const IS_EMPTY = isEmptyArray(emptyArray);

        expect(IS_EMPTY).toBe(true);
    });
    
    it('should return false when check if a array is empty', () => {
        const notEmptyArray = ['1', '2', '3'];
        const IS_EMPTY = isEmptyArray(notEmptyArray);

        expect(IS_EMPTY).toBe(false);
    });
});

describe('security.js test', () => {
    const { generateToken } = require('../../src/utils/security');

    it('should return a JWT', () => {
        const userData = require('../factory').generateUser();
        const token = generateToken(userData);

        expect(token.length > 0).toBe(true);
    });

});

