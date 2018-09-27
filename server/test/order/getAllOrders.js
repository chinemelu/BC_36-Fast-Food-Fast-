import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../app';
import db from '../../models/db';

chai.should();
chai.use(chaiHttp);

describe('GET: /api/v1/orders API route', () => {
  const adminInsertText = `INSERT INTO users (first_name, last_name, email, role, password) VALUES 
  ('test', 'admin', 'admin@food-direct.com', 'admin', '$2b$10$YhTWYrBS5PSoxbRaoueNkuL573wAr/seqmkNAsbpDyuzBBNBBgfnu')`;
  beforeEach((done) => {
    db(adminInsertText, () => {
      done();
    });
  });
  beforeEach((done) => {
    db('DELETE FROM orders', () => {
      done();
    });
  });
  afterEach((done) => {
    db('DELETE FROM USERS', () => {
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
            .get('/api/v1/orders')
            .end((err, res) => {
              res.should.have.status(403);
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
          const token = `${res.body.token} 222`; // invalid token
          chai.request(server)
            .get('/api/v1/orders')
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
    it('should throw an error if user is not an admin', (done) => {
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
            .get('/api/v1/orders')
            .set('token', token)
            .end((err, res) => {
              res.should.have.status(403);
              res.should.be.json;
              res.body.should.be.a('object');
              res.body.should.have.property('message');
              res.body.message.should.eql('You are not authorised to perform this action');
              done();
            });
        });
    });
    describe('Request success', () => {
      it('should indicate if the database is empty', (done) => {
        const loginDetails = {
          email: 'admin@food-direct.com',
          password: process.env.ADMIN_PASSWORD
        };
        chai.request(server)
          .post('/api/v1/auth/login')
          .send(loginDetails)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property('token');
            const { token } = res.body;
            chai.request(server)
              .get('/api/v1/orders')
              .set('token', token)
              .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('message');
                res.body.message.should.eql('There are no available food orders');
                done();
              });
          });
      });
    });
  });
});
