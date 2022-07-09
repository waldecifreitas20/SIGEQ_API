describe('errors.js test', () => {
    const { getErrorResponse } = require('../../src/utils/errors');

    const json = {
        status: 404,
        error: 'Page not found',
        description: 'Unable reach page',
        details: 'Page requested does not exist'
    };
    const response = getErrorResponse(json);

    it('should returns true when comparing status of objects', () => {
        expect(response.status).toBe(json.status);
    });

    it('should returns true when comparing error of objects', () => {
        expect(response.error).toBe(json.error);
    });
    it('should returns true when comparing description of objects', () => {
        expect(response.description).toBe(json.description);
    });
    it('should returns true when comparing details of objects', () => {
        expect(response.details).toBe(json.details);
    });

});