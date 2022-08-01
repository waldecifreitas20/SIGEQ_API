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


    it('should return false when comparing a wrong password with the hash', async () => {
        const wrongPassword = '5987';
        const isEquals = await bcrypt.compare(wrongPassword, hash);
        expect(isEquals).toBe(false);
    });
    
    it('should catch a exception when comparing a not string value with the hash', async () => {
        const notString = 5987;
        let isEquals;
        try {
            isEquals = await bcrypt.compare(notString, hash);
        } catch (error) {
            isEquals = false;
        }
        expect(isEquals).toBe(false);
    });
});

describe('JWT test', () => {
    const payload = {
        userID : 1,
        user : factory.generateUser()
    }

    it('should generate a JWT', () => {
        const token = jwt.sign(payload, process.env.API_SECRET);
        
        expect(token.length > 0).toBe(true);
    });
    
    it('should generate a valid token', () => {
        const token = security.generateToken(factory.generateUser());
        const result = security.checkToken(token);

         expect(result != null).toBe(true);
    });

    it('should catch an exception when sending a integer value as a token', () => {
        const falseToken = 123;
        let isValidtoken;
        
        try {
            isValidtoken = security.checkToken(falseToken);
        } catch (error) {
            isValidtoken = false;
        }

        expect(isValidtoken).toBe(false);
    });
    
    it('should return false as response when sending invalid token', () => {
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
