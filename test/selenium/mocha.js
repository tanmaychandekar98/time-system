var request = require('supertest'),
  should = require('should'),
  app = require('../server');
 
var Cookies;
 
describe('Functional Test <Sessions>:', function () {
  it('should create user session for valid user', function (done) {
    request(app)
      .post('/v1/sessions')
      .set('Accept','application/json')
      .send({"email": "user_test@example.com", "password": "123"})
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        res.body.id.should.equal('1');
        res.body.short_name.should.equal('Test user');
        res.body.email.should.equal('user_test@example.com');
        // Save the cookie to use it later to retrieve the session
        Cookies = res.headers['set-cookie'].pop().split(';')[0];
        done();
      });
  });
  it('should get user session for current user', function (done) {
    var req = request(app).get('/v1/sessions');
    // Set cookie to get saved user session
    req.cookies = Cookies;
    req.set('Accept','application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        res.body.id.should.equal('1');
        res.body.short_name.should.equal('Test user');
        res.body.email.should.equal('user_test@example.com');
        done();
      });
  });
});