import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../app';
import db from '../../models/db';

chai.should();
chai.use(chaiHttp);

describe('GET: /api/v1/orders/<orderId> API route', () => {
  beforeEach((done) => {
    db('DELETE FROM users', () => {
      done();
    });
  });
  afterEach((done) => {
    db('DELETE FROM users', () => {
      done();
    });
  });
  beforeEach((done) => {
    db('DELETE FROM orders', () => {
      done();
    });
  });
  describe('Authentication errors', () => {
    it("should throw an error if there's no token provided", (done) => {
      const registrationDetails = {
        firstName: 'Tee',
        lastName: 'Yooo',
        email: 'extremeDiffT@test.com',
        password: 'testPassword',
        reEnterPassword: 'testPassword'
      };
      chai.request(server)
        .post('/api/v1/auth/signup')
        .send(registrationDetails)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.have.property('token');
          chai.request(server)
            .get('/api/v1/orders/555a5728-677a-4056-b7fc-bad11eb6e822') // unlikely UUID
            .end((err, res) => {
              res.should.have.status(401);
              res.should.be.json;
              res.body.should.be.a('object');
              res.body.should.have.property('success');
              res.body.success.should.eql('false');
              res.body.should.have.property('message');
              res.body.message.should.eql('No token provided');
              done();
            });
        });
    });
    it('should throw an error if an invalid token is provided', (done) => {
      const registrationDetails = {
        firstName: 'Tee',
        lastName: 'Yooo',
        email: 'extremeDiffT@test.com',
        password: 'testPassword',
        reEnterPassword: 'testPassword'
      };
      chai.request(server)
        .post('/api/v1/auth/signup')
        .send(registrationDetails)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.have.property('token');
          const token = `${res.body.token} 2`; // concatenate an extra number to make token invalid
          chai.request(server)
            .get('/api/v1/orders/555a5728-677a-4056-b7fc-bad11eb6e822') // unlikely UUID
            .set('token', token)
            .end((err, res) => {
              res.should.have.status(401);
              res.should.be.json;
              res.body.should.be.a('object');
              res.body.should.have.property('error');
              res.body.error.should.eql('Invalid token');
              done();
            });
        });
    });
  });
  describe('Validation errors', () => {
    it('it should respond with an error message if id is not a UUID', (done) => {
      const registrationDetails = {
        firstName: 'Tee',
        lastName: 'Yooo',
        email: 'extremeDiffT@test.com',
        password: 'testPassword',
        reEnterPassword: 'testPassword'
      };
      chai.request(server)
        .post('/api/v1/auth/signup')
        .send(registrationDetails)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.have.property('token');
          const { token } = res.body;
          chai.request(server)
            .get('/api/v1/orders/a')
            .set('token', token)
            .end((err, res) => {
              res.should.have.status(400);
              res.body.should.be.a('object');
              res.body.should.have.property('errors');
              res.body.errors.should.be.a('object');
              res.body.errors.should.have.property('id');
              res.body.errors.id.should.eql('Invalid Id');
              done();
            });
        });
    });
  });
});
