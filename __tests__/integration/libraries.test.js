const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

require('../../src/config/dotenv');

const factory = require('../factory');
const security = require('../../src/utils/security');


describe('bcrypt test', () => {
    const fakePassword = '5973';
    const hash = bcrypt.hashSync(fakePassword, 10);

    it('should generate a hash', () => {      
        expect(hash.length > 0).toBe(true);
    });
    
    
    it('should compare hash that returns true', async () => {
        const isEquals = await bcrypt.compare(fakePassword, hash);
        expect(isEquals).toBe(true);
    });


    it('should compare hash that returns true', async () => {
        const wrongPassword = '5987';
        const isEquals = await bcrypt.compare(wrongPassword, hash);
        expect(isEquals).toBe(false);
    });
});

describe('JWT test', () => {
    const payload = {
        userID : 1,
        user : factory.generateUser()
    }

    it('should give a token', () => {
        const token = jwt.sign(payload, process.env.API_SECRET);
        
        expect(token.length > 0).toBe(true);
    });
    
    it('should verify if token sent it is valid', () => {
        const token = security.genetateToken(factory.generateUser());
        const result = security.checkToken(token);

         expect(result != null).toBe(true);
    });

    it('must return false as response on send invalid token', () => {
        const falseToken = '15a21dsSaWRY4hsR';
        let isValidtoken;
        
        try {
            isValidtoken = security.checkToken(falseToken);
        } catch (error) {
            isValidtoken = false;
        }

        expect(isValidtoken).toBe(false);
    });
});
