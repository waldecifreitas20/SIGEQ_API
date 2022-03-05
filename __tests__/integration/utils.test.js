describe('Finder.js test', () => {
    const finder = require('../../src/utils/finder');
    const { resolve : getPath } = require('path');

    it('should return an array of filenames by a specific folder without their index.js', () => {
        const folderPath = getPath('src', 'api', 'controllers');
        const filenames = finder.getFilesName(folderPath);

        console.log(filenames);

        expect(filenames.length > 0).toBe(true);
    });
});