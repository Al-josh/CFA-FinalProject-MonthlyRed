var expect = require('chai').expect;
var request = require('supertest');
var app = require('../app');
app.listen(3000);

describe('simple test', function () {
  it('always true', function () {
    expect(true).to.be.true;
  });
});

describe('text test', function () {
  it('check /dashboard', function (done) {
    request(app)
    .get('/dashboard')
    .expect('Content-Type', /text/)
    .end(function (err, res) {
      console.log('Reached end', res.body);
      done(err);
    });
  });
});

describe('text test', function () {
  it('check /profile', function (done) {
    request(app)
    .get('/profile')
    .expect('Content-Type', /text/)
    .end(function (err, res) {
      console.log('Reached end', res.body);
      done(err);
    });
  });
});

describe('text test', function () {
  it('post /profile', function (done) {
    request(app)
    .post('/profile')
    .query({ name: 'Test Product' }, { description: 'Test description' }, { price: 10 })
    .expect('Content-Type', /text/)
    .end(function (err, res) {
      console.log('Reached end of adding the product', res.body);
      done(err);
    });
  });
});
