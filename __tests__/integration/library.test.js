/* 
# library tested
    - BcryptJS                                          1
    - Json Web Token                                    1

# Situations tested:

  bcryptJS: 
    - Hash generation                                   1
    - hash comparasion with true password               1
    - hash comparasion with wrong password              1

  
 
*/
const bcrypt = require('bcryptjs');


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

