import chai from 'chai';
import chaiHttp from 'chai-http';
import db from '../../models/db';
import server from '../../app';

chai.should();
chai.use(chaiHttp);

describe('POST: /api/v1/auth/login API route', () => {
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
  describe('Validation errors', () => {
    it('should respond with an error if the email field is undefined', (done) => {
      const loginDetails = {
        password: 'encryptedpassword',
      };
      chai.request(server)
        .post('/api/v1/auth/login')
        .send(loginDetails)
        .end((err, res) => {
          res.should.have.status(400);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('errors');
          res.body.errors.should.be.a('object');
          res.body.errors.should.have.property('email');
          res.body.errors.email.should.be.a('string');
          res.body.errors.email.should.eql('Email field is required');
          done();
        });
    });
    it('should respond with an error if the email field is empty', (done) => {
      const registrationDetails = {
        email: '',
        password: 'IAMawesome'
      };
      chai.request(server)
        .post('/api/v1/auth/login')
        .send(registrationDetails)
        .end((err, res) => {
          res.should.have.status(400);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('errors');
          res.body.errors.should.be.a('object');
          res.body.errors.should.have.property('email');
          res.body.errors.email.should.be.a('string');
          res.body.errors.email.should.eql('Email field is required');
          done();
        });
    });
    it('should respond with an error if the password field is undefined', (done) => {
      const loginDetails = {
        email: 'teejay2k4@yahoo.com',
      };
      chai.request(server)
        .post('/api/v1/auth/login')
        .send(loginDetails)
        .end((err, res) => {
          res.should.have.status(400);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('errors');
          res.body.errors.should.be.a('object');
          res.body.errors.should.have.property('password');
          res.body.errors.password.should.be.a('string');
          res.body.errors.password.should.eql('Password field is required');
          done();
        });
    });
    it('should respond with an error if the password field is empty', (done) => {
      const loginDetails = {
        email: 'teejay2k4@yahoo.com',
        password: ''
      };
      chai.request(server)
        .post('/api/v1/auth/login')
        .send(loginDetails)
        .end((err, res) => {
          res.should.have.status(400);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('errors');
          res.body.errors.should.be.a('object');
          res.body.errors.should.have.property('password');
          res.body.errors.password.should.be.a('string');
          res.body.errors.password.should.eql('Password field is required');
          done();
        });
    });
  });
  describe('Authentication errors', () => {
    it('should respond with an error if email is invalid', (done) => {
      const registrationDetails = {
        firstName: 'Tony',
        lastName: 'Nwosu',
        email: 'teejay2k4@yahoo.com',
        password: 'iAMAwesome',
        reEnterPassword: 'iAMAwesome'
      };
      const loginDetails = {
        email: 'tee2k4@yahoo.com',
        password: 'iAMAwesome'
      };
      chai.request(server)
        .post('/api/v1/auth/signup')
        .send(registrationDetails)
        .end(() => {
          chai.request(server)
            .post('/api/v1/auth/login')
            .send(loginDetails)
            .end((err, res) => {
              res.should.have.status(401);
              res.should.be.json;
              res.body.should.be.a('object');
              res.body.should.have.property('error');
              res.body.error.should.eql('Invalid email or password');
              done();
            });
        });
    });
    it('should respond with an error if paswword is invalid', (done) => {
      const registrationDetails = {
        firstName: 'Tony',
        lastName: 'Nwosu',
        email: 'teejay2k4@yahoo.com',
        password: 'iAMAwesome',
        reEnterPassword: 'iAMAwesome'
      };
      const loginDetails = {
        email: 'teejay2k4@yahoo.com',
        password: 'iAMAwesom'
      };
      chai.request(server)
        .post('/api/v1/auth/signup')
        .send(registrationDetails)
        .end(() => {
          chai.request(server)
            .post('/api/v1/auth/login')
            .send(loginDetails)
            .end((err, res) => {
              res.should.have.status(401);
              res.should.be.json;
              res.body.should.be.a('object');
              res.body.should.have.property('error');
              res.body.error.should.eql('Invalid email or password');
              done();
            });
        });
    });
  });
  describe('Login success', () => {
    it('should login a user if there are no validation errors', (done) => {
      const registrationDetails = {
        firstName: 'Tony',
        lastName: 'Nwosu',
        email: 'teejay2k4@yahoo.com',
        password: 'iAMAwesome',
        reEnterPassword: 'iAMAwesome'
      };
      const loginDetails = {
        email: 'teejay2k4@yahoo.com',
        password: 'iAMAwesome'
      };
      chai.request(server)
        .post('/api/v1/auth/signup')
        .send(registrationDetails)
        .end(() => {
          chai.request(server)
            .post('/api/v1/auth/login')
            .send(loginDetails)
            .end((err, res) => {
              res.should.have.status(200);
              res.should.be.json;
              res.body.should.be.a('object');
              res.body.should.have.property('token');
              res.body.should.have.property('email');
              res.body.email.should.eql('teejay2k4@yahoo.com');
              res.body.should.have.property('message');
              res.body.message.should.eql('Tony, you have successfully logged in');
              done();
            });
        });
    });
  });
});
