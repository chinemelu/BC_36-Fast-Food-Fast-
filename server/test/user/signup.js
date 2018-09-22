import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../app';
import db from '../../models/db';

chai.should();
chai.use(chaiHttp);

describe('POST: /api/v1/auth/signup API route', () => {
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
  describe('Conflict errors', () => {
    it('should respond with a conflict error if the email already exists', (done) => {
      const registrationDetails = {
        firstName: 'Tony',
        lastName: 'Nwosu',
        email: 'emailexists@yahoo.com',
        password: 'iAMAwesome',
        reEnterPassword: 'iAMAwesome'
      };
      const newRegistrationDetails = {
        firstName: 'ijeoma',
        lastName: 'udumukwu',
        email: 'emailexists@yahoo.com',
        password: 'iAMAwesome',
        reEnterPassword: 'iAMAwesome'
      };
      chai.request(server)
        .post('/api/v1/auth/signup')
        .send(registrationDetails)
        .end((err, res) => {
          res.should.have.status(201);
          chai.request(server)
            .post('/api/v1/auth/signup')
            .send(newRegistrationDetails)
            .end((err, res) => {
              res.should.have.status(409);
              res.should.be.json;
              res.body.should.be.a('object');
              res.body.should.have.property('errors');
              res.body.errors.should.be.a('object');
              res.body.errors.should.have.property('emailExists');
              res.body.errors.emailExists.should.be.a('string');
              res.body.errors.emailExists.should.eql('email exists');
              done();
            });
        });
    });
  });
  describe('Validation errors', () => {
    it('should respond with an error if the first name field is undefined', (done) => {
      const registrationDetails = {
        lastName: 'Nwosu',
        email: 'teejay2k4@yahoo.com',
        password: 'iAMAwesome',
        reEnterPassword: 'iAMAwesome'
      };
      chai.request(server)
        .post('/api/v1/auth/signup')
        .send(registrationDetails)
        .end((err, res) => {
          res.should.have.status(400);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('errors');
          res.body.errors.should.be.a('object');
          res.body.errors.should.have.property('firstName');
          res.body.errors.firstName.should.be.a('string');
          res.body.errors.firstName.should.eql('First name field must not be empty');
          done();
        });
    });
    it('should respond with an error if the first name field is empty', (done) => {
      const registrationDetails = {
        firstName: '',
        lastName: 'Nwosu',
        email: 'teejay2k4@yahoo.com',
        password: 'iAMAwesome',
        reEnterPassword: 'iAMAwesome'
      };
      chai.request(server)
        .post('/api/v1/auth/signup')
        .send(registrationDetails)
        .end((err, res) => {
          res.should.have.status(400);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('errors');
          res.body.errors.should.be.a('object');
          res.body.errors.should.have.property('firstName');
          res.body.errors.firstName.should.be.a('string');
          res.body.errors.firstName.should.eql('First name field must not be empty');
          done();
        });
    });
    it('should respond with an error if the first name field contains non alphabets', (done) => {
      const registrationDetails = {
        firstName: 'Anthony1',
        lastName: 'Nwosu',
        email: 'teejay2k4@yahoo.com',
        password: 'iAMAwesome',
        reEnterPassword: 'iAMAwesome'
      };
      chai.request(server)
        .post('/api/v1/auth/signup')
        .send(registrationDetails)
        .end((err, res) => {
          res.should.have.status(400);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('errors');
          res.body.errors.should.be.a('object');
          res.body.errors.should.have.property('firstName');
          res.body.errors.firstName.should.be.a('string');
          res.body.errors.firstName.should.eql('First name must consist of only alphabets \n'
          + 'and must contain no spaces between characters');
          done();
        });
    });
    it('should respond with an error if the first name field contains spaces between alphabets', (done) => {
      const registrationDetails = {
        firstName: 'Anth ony',
        lastName: 'Nwosu',
        email: 'teejay2k4@yahoo.com',
        password: 'iAMAwesome',
        reEnterPassword: 'iAMAwesome'
      };
      chai.request(server)
        .post('/api/v1/auth/signup')
        .send(registrationDetails)
        .end((err, res) => {
          res.should.have.status(400);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('errors');
          res.body.errors.should.be.a('object');
          res.body.errors.should.have.property('firstName');
          res.body.errors.firstName.should.be.a('string');
          res.body.errors.firstName.should.eql('First name must consist of only alphabets \n'
          + 'and must contain no spaces between characters');
          done();
        });
    });
    it('should respond with an error if the first name field contains more than 50 valid characters', (done) => {
      const registrationDetails = {
        firstName: 'Anthonyhastomakeupalongnamewhichisreallyreallyreallyannoying',
        lastName: 'Nwosu',
        email: 'teejay2k4@yahoo.com',
        password: 'iAMAwesome',
        reEnterPassword: 'iAMAwesome'
      };
      chai.request(server)
        .post('/api/v1/auth/signup')
        .send(registrationDetails)
        .end((err, res) => {
          res.should.have.status(400);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('errors');
          res.body.errors.should.be.a('object');
          res.body.errors.should.have.property('firstName');
          res.body.errors.firstName.should.be.a('string');
          res.body.errors.firstName.should.eql('First name must be fewer than 50 characters');
          done();
        });
    });
    it('should respond with an error if the last name field is undefined', (done) => {
      const registrationDetails = {
        firstName: 'Tony',
        email: 'teejay2k4@yahoo.com',
        password: 'iAMAwesome',
        reEnterPassword: 'iAMAwesome'
      };
      chai.request(server)
        .post('/api/v1/auth/signup')
        .send(registrationDetails)
        .end((err, res) => {
          res.should.have.status(400);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('errors');
          res.body.errors.should.be.a('object');
          res.body.errors.should.have.property('lastName');
          res.body.errors.lastName.should.be.a('string');
          res.body.errors.lastName.should.eql('Last name field must not be empty');
          done();
        });
    });
    it('should respond with an error if the last name field is empty', (done) => {
      const registrationDetails = {
        firstName: 'Tony',
        lastName: '',
        email: 'teejay2k4@yahoo.com',
        password: 'iAMAwesome',
        reEnterPassword: 'iAMAwesome'
      };
      chai.request(server)
        .post('/api/v1/auth/signup')
        .send(registrationDetails)
        .end((err, res) => {
          res.should.have.status(400);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('errors');
          res.body.errors.should.be.a('object');
          res.body.errors.should.have.property('lastName');
          res.body.errors.lastName.should.be.a('string');
          res.body.errors.lastName.should.eql('Last name field must not be empty');
          done();
        });
    });
    it('should respond with an error if the last name field contains non alphabets', (done) => {
      const registrationDetails = {
        firstName: 'Anthony',
        lastName: 'Nwosu1',
        email: 'teejay2k4@yahoo.com',
        password: 'iAMAwesome',
        reEnterPassword: 'iAMAwesome'
      };
      chai.request(server)
        .post('/api/v1/auth/signup')
        .send(registrationDetails)
        .end((err, res) => {
          res.should.have.status(400);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('errors');
          res.body.errors.should.be.a('object');
          res.body.errors.should.have.property('lastName');
          res.body.errors.lastName.should.be.a('string');
          res.body.errors.lastName.should.eql('Last name must consist of only alphabets \n'
          + 'and must contain no spaces between characters');
          done();
        });
    });
    it('should respond with an error if the last name field contains spaces between alphabets', (done) => {
      const registrationDetails = {
        firstName: 'Anthony',
        lastName: 'Nwos u',
        email: 'teejay2k4@yahoo.com',
        password: 'iAMAwesome',
        reEnterPassword: 'iAMAwesome'
      };
      chai.request(server)
        .post('/api/v1/auth/signup')
        .send(registrationDetails)
        .end((err, res) => {
          res.should.have.status(400);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('errors');
          res.body.errors.should.be.a('object');
          res.body.errors.should.have.property('lastName');
          res.body.errors.lastName.should.be.a('string');
          res.body.errors.lastName.should.eql('Last name must consist of only alphabets \n'
          + 'and must contain no spaces between characters');
          done();
        });
    });
    it('should respond with an error if the last name field contains more than 50 valid characters', (done) => {
      const registrationDetails = {
        firstName: 'Anthony',
        lastName: 'Nwosuhastomakeupalongnamewhichisreallyreallyreallyannoying',
        email: 'teejay2k4@yahoo.com',
        password: 'iAMAwesome',
        reEnterPassword: 'iAMAwesome'
      };
      chai.request(server)
        .post('/api/v1/auth/signup')
        .send(registrationDetails)
        .end((err, res) => {
          res.should.have.status(400);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('errors');
          res.body.errors.should.be.a('object');
          res.body.errors.should.have.property('lastName');
          res.body.errors.lastName.should.be.a('string');
          res.body.errors.lastName.should.eql('Last name must be fewer than 50 characters');
          done();
        });
    });
    it('should respond with an error if the email field is undefined', (done) => {
      const registrationDetails = {
        firstName: 'Anthony',
        lastName: 'Nwosu',
        password: 'superstrongpassword',
        reEnterPassword: 'superstrongpassword'
      };
      chai.request(server)
        .post('/api/v1/auth/signup')
        .send(registrationDetails)
        .end((err, res) => {
          res.should.have.status(400);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('errors');
          res.body.errors.should.be.a('object');
          res.body.errors.should.have.property('email');
          res.body.errors.email.should.be.a('string');
          res.body.errors.email.should.eql('Email field must not be empty');
          done();
        });
    });
    it('should respond with an error if the email field is empty', (done) => {
      const registrationDetails = {
        firstName: 'Anthony',
        lastName: 'Nwosu',
        email: '',
        password: 'superstrongpassword',
        reEnterPassword: 'superstrongpassword'
      };
      chai.request(server)
        .post('/api/v1/auth/signup')
        .send(registrationDetails)
        .end((err, res) => {
          res.should.have.status(400);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('errors');
          res.body.errors.should.be.a('object');
          res.body.errors.should.have.property('email');
          res.body.errors.email.should.be.a('string');
          res.body.errors.email.should.eql('Email field must not be empty');
          done();
        });
    });
    it('should respond with an error if the email input is invalid', (done) => {
      const registrationDetails = {
        firstName: 'Anthony',
        lastName: 'Nwosu',
        email: 'teejay2k4@',
        password: 'superstrongpassword',
        reEnterPassword: 'superstrongpassword'
      };
      chai.request(server)
        .post('/api/v1/auth/signup')
        .send(registrationDetails)
        .end((err, res) => {
          res.should.have.status(400);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('errors');
          res.body.errors.should.be.a('object');
          res.body.errors.should.have.property('email');
          res.body.errors.email.should.be.a('string');
          res.body.errors.email.should.eql('The email you entered is invalid');
          done();
        });
    });
    it('should respond with an error if the password field is undefined', (done) => {
      const registrationDetails = {
        firstName: 'Anthony',
        lastName: 'Nwosu',
        email: 'teejay2k4@yahoo.com',
        reEnterPassword: 'Brutal password'
      };
      chai.request(server)
        .post('/api/v1/auth/signup')
        .send(registrationDetails)
        .end((err, res) => {
          res.should.have.status(400);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('errors');
          res.body.errors.should.be.a('object');
          res.body.errors.should.have.property('password');
          res.body.errors.password.should.be.a('string');
          res.body.errors.password.should.eql('Password field must not be empty');
          done();
        });
    });
    it('should respond with an error if the password field is empty', (done) => {
      const registrationDetails = {
        firstName: 'Anthony',
        lastName: 'Nwosu',
        email: 'teejay2k4@yahoo.com',
        password: '',
        reEnterPassword: 'Brutal password'
      };
      chai.request(server)
        .post('/api/v1/auth/signup')
        .send(registrationDetails)
        .end((err, res) => {
          res.should.have.status(400);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('errors');
          res.body.errors.should.be.a('object');
          res.body.errors.should.have.property('password');
          res.body.errors.password.should.be.a('string');
          res.body.errors.password.should.eql('Password field must not be empty');
          done();
        });
    });
    it('should respond with an error if the password field contains more than 20 characters', (done) => {
      const registrationDetails = {
        firstName: 'Anthony',
        lastName: 'Nwosu',
        email: 'teejay2k4@yahoo.com',
        password: 'morethantwentycharacters',
        reEnterPassword: 'morethantwentycharacters'
      };
      chai.request(server)
        .post('/api/v1/auth/signup')
        .send(registrationDetails)
        .end((err, res) => {
          res.should.have.status(400);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('errors');
          res.body.errors.should.be.a('object');
          res.body.errors.should.have.property('password');
          res.body.errors.password.should.be.a('string');
          res.body.errors.password.should.eql('Password must be between 8 - 20 characters');
          done();
        });
    });
    it('should respond with an error if the password field contains fewer than 8 characters', (done) => {
      const registrationDetails = {
        firstName: 'Anthony',
        lastName: 'Nwosu',
        email: 'teejay2k4@yahoo.com',
        password: 'fewer',
        reEnterPassword: 'fewer'
      };
      chai.request(server)
        .post('/api/v1/auth/signup')
        .send(registrationDetails)
        .end((err, res) => {
          res.should.have.status(400);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('errors');
          res.body.errors.should.be.a('object');
          res.body.errors.should.have.property('password');
          res.body.errors.password.should.be.a('string');
          res.body.errors.password.should.eql('Password must be between 8 - 20 characters');
          done();
        });
    });
    it('should respond with an error if the re-enter password field is undefined', (done) => {
      const registrationDetails = {
        firstName: 'Anthony',
        lastName: 'Nwosu',
        email: 'teejay2k4@yahoo.com',
        password: 'I am a boss',
      };
      chai.request(server)
        .post('/api/v1/auth/signup')
        .send(registrationDetails)
        .end((err, res) => {
          res.should.have.status(400);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('errors');
          res.body.errors.should.be.a('object');
          res.body.errors.should.have.property('reEnterPassword');
          res.body.errors.reEnterPassword.should.be.a('string');
          res.body.errors.reEnterPassword.should.eql('Re-enter password');
          done();
        });
    });

    it('should respond with an error if the re-enter password field is empty', (done) => {
      const registrationDetails = {
        firstName: 'Anthony',
        lastName: 'Nwosu',
        email: 'teejay2k4@yahoo.com',
        password: 'Brutal password',
        reEnterPassword: ''
      };
      chai.request(server)
        .post('/api/v1/auth/signup')
        .send(registrationDetails)
        .end((err, res) => {
          res.should.have.status(400);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('errors');
          res.body.errors.should.be.a('object');
          res.body.errors.should.have.property('reEnterPassword');
          res.body.errors.reEnterPassword.should.be.a('string');
          res.body.errors.reEnterPassword.should.eql('Re-enter password');
          done();
        });
    });
    it('should respond with an error if the passwords do not match', (done) => {
      const registrationDetails = {
        firstName: 'Anthony',
        lastName: 'Nwosu',
        email: 'teejay2k4@yahoo.com',
        password: 'Brutal password',
        reEnterPassword: 'Brutal pass'
      };
      chai.request(server)
        .post('/api/v1/auth/signup')
        .send(registrationDetails)
        .end((err, res) => {
          res.should.have.status(400);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('errors');
          res.body.errors.should.be.a('object');
          res.body.errors.should.have.property('reEnterPassword');
          res.body.errors.reEnterPassword.should.be.a('string');
          res.body.errors.reEnterPassword.should.eql('Passwords do not match');
          done();
        });
    });
    it("should respond with an error if the route doesn't exist", (done) => {
      const registrationDetails = {
        firstName: 'Anthony',
        lastName: 'Nwosu',
        email: 'teejay2k4@yahoo.com',
        password: 'Brutal password',
        reEnterPassword: 'Brutal pass'
      };
      chai.request(server)
        .post('/api/v1/auth/sign')
        .send(registrationDetails)
        .end((err, res) => {
          res.should.have.status(404);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.message.should.be.a('string');
          res.body.message.should.eql('This page is not available');
          done();
        });
    });
    describe('Signup Success', () => {
      it('should register a user if there are no validation errors', (done) => {
        const registrationDetails = {
          firstName: 'chinemelu',
          lastName: 'Nwosu',
          email: 'chinemelunwosu@gmail.com',
          password: 'iAMAwesome',
          reEnterPassword: 'iAMAwesome'
        };
        chai.request(server)
          .post('/api/v1/auth/signup')
          .send(registrationDetails)
          .end((err, res) => {
            res.should.have.status(201);
            res.should.be.json;
            res.body.should.be.a('object');
            res.body.should.have.property('firstName');
            res.body.firstName.should.be.a('string');
            res.body.firstName.should.eql('Chinemelu');
            res.body.lastName.should.eql('Nwosu');
            res.body.email.should.eql('chinemelunwosu@gmail.com');
            res.body.should.have.property('token');
            res.body.should.have.property('message');
            res.body.message.should.eql('Chinemelu, you have successfully created an account');
            done();
          });
      });
    });
  });
});
