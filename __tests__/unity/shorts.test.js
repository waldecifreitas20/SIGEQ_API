describe('shorts.js test', () => {
    const shorts = require('../../src/utils/shorts');

    it('should returns true when sending a empty array', () => {
        const emptyArray = [];

        expect(shorts.isEmptyArray(emptyArray)).toBe(true)
    });
   
    it('should returns false when sending a no empty array', () => {
        const noEmptyArray = [1,2,3];

        expect(shorts.isEmptyArray(noEmptyArray)).toBe(false)
    });
    
    it('should returns true when sending a empty object', () => {
        const emptyObject = {};

        expect(shorts.isEmptyObject(emptyObject)).toBe(true)
    });
    
    it('should returns false when sending a no empty array', () => {
        const noEmptyObject = {key : 'value'};

        expect(shorts.isEmptyObject(noEmptyObject)).toBe(false)
    });

});