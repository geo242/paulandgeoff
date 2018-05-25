'use strict';

var chai = require('chai');
var expect = chai.expect;
var request = require('supertest');
var paulandgeoff = require('../paulandgeoff');

describe('GET /api', function () {
    it('should respond with "Allons-y, Allonso!"', function (done) {
        request(paulandgeoff)
            .get('/api')
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function (error, response) {
                if (error) {
                    return done(error);
                }
                expect(response.body).to.be.an('object');
                expect(response.body).to.have.property('message');
                expect(response.body.message).to.equal('Allons-y, Allonso!');
                done();
            });
    });
});
