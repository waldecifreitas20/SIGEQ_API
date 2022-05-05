const { resolve: getPath } = require('path');

const factory = require('../../factory');
const request = require('./requestTester');
const { generateToken } = require(getPath('src', 'utils', 'security.js'));

describe('Nonexistent endpoint', () => {
  
});