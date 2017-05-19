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

   describe('GET /api', () => {
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
    describe('GET /api/', () => {
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
    describe('GET /api/topics', () => {
        it('should return the status is ok and contain topic titles', (done) => {
            request(ROOT)
                .get('/topics')
                .end((err, res) => {
                    if (err) throw err;
                    expect(res.statusCode).to.equal(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body.topics).to.be.an('array');
                    expect(res.body.topics[0]).to.have.property('title');
                    done();
                });
        });
    });
     describe('GET /api/articles', () => {
        it('should return the status is ok and contain getAllArticles with the comment count', (done) => {
            request(ROOT)
                .get('/articles')
                .end((err, res) => {
                    if (err) throw err;
                    expect(res.statusCode).to.equal(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body.articles).to.be.an('array');
                    expect(res.body.articles[0]).to.have.property('title');
                     expect(res.body.articles[0].comments_count).to.be.a('number');
                    done();
                });
        });
    });
     describe('GET /api/topics/:topic_id', () => {
        it('should return the status is ok return all articles for the article id', (done) => {
            request(ROOT)
                .get('/topics/cats')
                .end((err, res) => {
                    if (err) throw err;
                    expect(res.statusCode).to.equal(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body.articles).to.be.an('array');
                    expect(res.body.articles[0].belongs_to).to.equal('cats');
                    done();
                });
        });
    });
    describe('GET /api/:article_id/comments', () => {
        it('should return the status is ok return all articles for the article id', (done) => {
            request(ROOT)
                .get(`/articles/${sampleIds.article_id}/comments`)
                .end((err, res) => {
                    if (err) throw err;
                    expect(res.statusCode).to.equal(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body.comments).to.be.an('array');
                    done();
                });
        });
    });
    describe('POST /api/comments', () => {
        it('returns the created comment and status code 201', (done) => {
            request(ROOT)
                .post(`/articles/${sampleIds.article_id}/comments`)
                .send({'comment': 'test'})
                .set('Accept', 'application/json')
                .end((error, res) => {
                    expect(res.statusCode).to.equal(201);
                    expect(res.body.body.comment).to.eql('test');
                    done();
            });
        });
    });

    describe('PUT /api/articles/:article_id', () => {
    it('returns status code 201 and up for incrementing a vote by 1', (done) => {
      request(ROOT)
        .put(`/articles/${sampleIds.article_id}?vote=up`)
        .end((error, res) => {
          expect(res.statusCode).to.equal(201);
          expect(res.body.votes).to.equal('up');
          done();
        });
    });

    it('returns status code 201 and down for decrementing a vote by 1', (done) => {
      request(ROOT)
        .put(`/articles/${sampleIds.article_id}?vote=down`)
        .end((error, res) => {
          expect(res.statusCode).to.equal(201);
          expect(res.body.votes).to.equal('down');
          done();
        });
    });
      
  });

    describe('PUT /api/comments/:comment_id', () => {
    it('returns status code 201 and up for incrementing a vote by 1', (done) => {
      request(ROOT)
        .put(`/comments/${sampleIds.comment_id}?vote=up`)
        .end((error, res) => {
          expect(res.statusCode).to.equal(201);
          expect(res.body.votes).to.equal('up');
          done();
        });
    });

    it('returns status code 201 and down for decrementing a vote by 1', (done) => {
      request(ROOT)
        .put(`/comments/${sampleIds.comment_id}?vote=down`)
        .end((error, res) => {
          expect(res.statusCode).to.equal(201);
          expect(res.body.votes).to.equal('down');
          done();
        });
    });
      
  });

});