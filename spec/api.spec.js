process.env.NODE_ENV = 'test';

const expect = require('chai').expect;
const request = require('supertest');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const saveTestData = require('../seed/test.seed');

const PORT = require('../config').PORT.test;
const ROOT = `http://localhost:${PORT}/api`;

require('../server');

describe('API ROUTES', () => {
    // Get some sample ids to use for future requests in the tests
    let sampleIds, invalidId, incorrectId;

    before(done => {
        mongoose.connection.once('connected', () => {
            mongoose.connection.db.dropDatabase();
        });
        saveTestData((idObj) => {
            sampleIds = idObj;

            // also save some invalid IDs to test for errors
            // explain the difference between an invalid/incorrect ID
            invalidId = sampleIds.article_id.toString().split('');
            invalidId[invalidId.length - 1] = '5345';
            invalidId = invalidId.join('');

            // take an ID from another database
            incorrectId = '5841a06fed9db244975922c3';
            console.log('***************');
            console.log(sampleIds);
            console.log('***************');
            done();
        });
    });

    // Drop the database after test suite runs
    after(done => {
        mongoose.connection.db.dropDatabase(() => {
            done();
        });
    });

    describe('GET /', () => {
        it('should return the status is ok', (done) => {
            request(ROOT)
                .get('/')
                .end((err, res) => {
                    if (err) throw err;
                    expect(res.statusCode).to.equal(200);
                    expect(res.body.status).to.equal('OK');

                    done();
                });
        });
    });
    
    describe('GET /topics', () => {
        it('should return ')
    });
});