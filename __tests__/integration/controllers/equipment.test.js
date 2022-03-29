const {resolve : getPath} = require('path');

const request = require('supertest');

const factory = require('../../factory');
const app = require(getPath('src', 'app'));
const { generateToken } = require(getPath('src', 'utils', 'shorts.js'));


describe('Create equipment test', () => {

    it('should return status 200 OK when trying create new equipment into the database', async () => {

    });
    
    it('should return status 401 when trying create new equioment without token', async () => {

    });
    
    it('should return status 401 when trying create new equipment without create permission', async () => {

    });
});

describe('Delete equipment test', () => {});
describe('Get by heritage equipment test', () => {});
describe('Get all equipment test', () => {});
describe('Update equipment test', () => {});