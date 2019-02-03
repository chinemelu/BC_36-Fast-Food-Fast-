import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../app';
import db from '../../models/db';

chai.should();
chai.use(chaiHttp);

describe('PUT: /api/v1/orders/<orderId> API route', () => {
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
  describe('Validation Errors', () => {
    it('should respond with an error message if order status field is undefined', (done) => {
      chai.request(server)
        .put('/api/v1/orders/555a5728-677a-4056-b7fc-bad11eb6e822')
        .send({})
        .end((err, res) => {
          res.should.have.status(400);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('errors');
          res.body.errors.should.be.a('object');
          res.body.errors.should.have.property('orderStatus');
          res.body.errors.orderStatus.should.be.a('string');
          res.body.errors.orderStatus.should.eql('Order status is required');
          done();
        });
    });
    it('should respond with an error message if order status field is empty', (done) => {
      const orderStatus = {
        orderStatus: ''
      };
      chai.request(server)
        .put('/api/v1/orders/555a5728-677a-4056-b7fc-bad11eb6e822')
        .send(orderStatus)
        .end((err, res) => {
          res.should.have.status(400);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('errors');
          res.body.errors.should.be.a('object');
          res.body.errors.should.have.property('orderStatus');
          res.body.errors.orderStatus.should.be.a('string');
          res.body.errors.orderStatus.should.eql('Order status is required');
          done();
        });
    });
    it("should respond with an error message if order status is not one of  'new', 'processing', cancelled' or 'complete'", (done) => {
      const orderStatus = {
        orderStatus: 'complex'
      };
      chai.request(server)
        .put('/api/v1/orders/555a5728-677a-4056-b7fc-bad11eb6e822')
        .send(orderStatus)
        .end((err, res) => {
          res.should.have.status(400);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('errors');
          res.body.errors.should.be.a('object');
          res.body.errors.should.have.property('orderStatus');
          res.body.errors.orderStatus.should.be.a('string');
          res.body.errors.orderStatus.should.eql("Order status can either be 'new', 'processing', cancelled' or 'complete'");
          done();
        });
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
      const orderStatus = {
        orderStatus: 'complete'
      };
      chai.request(server)
        .post('/api/v1/auth/signup')
        .send(registrationDetails)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.have.property('token');
          chai.request(server)
            .put('/api/v1/orders/2167c143-fcfd-4ecf-b1eb-1ab1b97f429a') // unlikely UUID
            .send(orderStatus)
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
      const orderStatus = {
        orderStatus: 'new'
      };
      chai.request(server)
        .post('/api/v1/auth/signup')
        .send(registrationDetails)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.have.property('token');
          const token = `${res.body.token} 2`; // concatenate an extra number to make token invalid
          chai.request(server)
            .put('/api/v1/orders/2167c143-fcfd-4ecf-b1eb-1ab1b97f429a') // unlikely UUID
            .send(orderStatus)
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
            .put('/api/v1/orders/a')
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
