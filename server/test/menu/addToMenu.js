import chai from 'chai';
import chaiHttp from 'chai-http';
import db from '../../models/db';
import server from '../../app';

chai.should();
chai.use(chaiHttp);

describe('POST: /api/v1/menu API route', () => {
  const adminInsertText = `INSERT INTO users (first_name, last_name, email, password) VALUES 
  ('test', 'admin', 'admin@food-direct.com', 'admin', '${process.env.INSERTED_ADMIN_PASSWORD}')`;

  beforeEach((done) => {
    db(adminInsertText, () => {
      done();
    });
  });
  beforeEach((done) => {
    db('DELETE FROM carts_fooditems', () => {
      done();
    });
  });
  beforeEach((done) => {
    db('DELETE FROM carts', () => {
      done();
    });
  });
  beforeEach((done) => {
    db('DELETE FROM food_items', () => {
      done();
    });
  });
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
  describe('Validation Errors', () => {
    it('should respond with an error message if name field is undefined', (done) => {
      const item = {
        price: '2000',
        imgUrl: 'eba.png'
      };
      chai.request(server)
        .post('/api/v1/menu')
        .send(item)
        .end((err, res) => {
          res.should.have.status(400);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('errors');
          res.body.errors.should.be.a('object');
          res.body.errors.should.have.property('name');
          res.body.errors.name.should.be.a('string');
          res.body.errors.name.should.eql('Name field is required');
          done();
        });
    });
    it('should respond with an error message if name field is empty', (done) => {
      const item = {
        name: '',
        price: '2000',
        imgUrl: 'eba.png'
      };
      chai.request(server)
        .post('/api/v1/menu')
        .send(item)
        .end((err, res) => {
          res.should.have.status(400);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('errors');
          res.body.errors.should.be.a('object');
          res.body.errors.should.have.property('name');
          res.body.errors.name.should.be.a('string');
          res.body.errors.name.should.eql('Name field is required');
          done();
        });
    });
    it('should respond with an error message if name field consists of invalid characters', (done) => {
      const item = {
        name: 'eba 1',
        price: '2000',
        imgUrl: 'eba.png'
      };
      chai.request(server)
        .post('/api/v1/menu')
        .send(item)
        .end((err, res) => {
          res.should.have.status(400);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('errors');
          res.body.errors.should.be.a('object');
          res.body.errors.should.have.property('name');
          res.body.errors.name.should.be.a('string');
          res.body.errors.name.should.eql('Name field must consist of only alphabets');
          done();
        });
    });
    it('should respond with an error message if price field is undefined', (done) => {
      const item = {
        name: 'chicken burrito',
        imgUrl: 'eba.png'
      };
      chai.request(server)
        .post('/api/v1/menu')
        .send(item)
        .end((err, res) => {
          res.should.have.status(400);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('errors');
          res.body.errors.should.be.a('object');
          res.body.errors.should.have.property('price');
          res.body.errors.price.should.be.a('string');
          res.body.errors.price.should.eql('Price field is required');
          done();
        });
    });
    it('should respond with an error message if price field is empty', (done) => {
      const item = {
        name: 'Dorritos',
        price: '',
        imgUrl: 'dorritos.png'
      };
      chai.request(server)
        .post('/api/v1/menu')
        .send(item)
        .end((err, res) => {
          res.should.have.status(400);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('errors');
          res.body.errors.should.be.a('object');
          res.body.errors.should.have.property('price');
          res.body.errors.price.should.be.a('string');
          res.body.errors.price.should.eql('Price field is required');
          done();
        });
    });
    it('should respond with an error message if price input is not a number', (done) => {
      const item = {
        name: 'Chicken burger',
        price: '2000a',
        imgUrl: 'chicken-burg.png'
      };
      chai.request(server)
        .post('/api/v1/menu')
        .send(item)
        .end((err, res) => {
          res.should.have.status(400);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('errors');
          res.body.errors.should.be.a('object');
          res.body.errors.should.have.property('price');
          res.body.errors.price.should.be.a('string');
          res.body.errors.price.should.eql('Please enter a valid price');
          done();
        });
    });
    it('should respond with an error message if image url is undefined', (done) => {
      const item = {
        name: 'Rice and beans',
        price: '2000',
      };
      chai.request(server)
        .post('/api/v1/menu')
        .send(item)
        .end((err, res) => {
          res.should.have.status(400);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('errors');
          res.body.errors.should.be.a('object');
          res.body.errors.should.have.property('imgUrl');
          res.body.errors.imgUrl.should.be.a('string');
          res.body.errors.imgUrl.should.eql('Image url is required');
          done();
        });
    });
    it('should respond with an error message if image url is empty', (done) => {
      const item = {
        name: 'Rice and beans',
        price: '2000',
        imgUrl: ''
      };
      chai.request(server)
        .post('/api/v1/menu')
        .send(item)
        .end((err, res) => {
          res.should.have.status(400);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('errors');
          res.body.errors.should.be.a('object');
          res.body.errors.should.have.property('imgUrl');
          res.body.errors.imgUrl.should.be.a('string');
          res.body.errors.imgUrl.should.eql('Image url is required');
          done();
        });
    });
    it('should respond with an error message if image url is an invalid type', (done) => {
      const item = {
        name: 'Rice and beans',
        price: '2000',
        imgUrl: 'rice-and-beans.docx'
      };
      chai.request(server)
        .post('/api/v1/menu')
        .send(item)
        .end((err, res) => {
          res.should.have.status(400);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('errors');
          res.body.errors.should.be.a('object');
          res.body.errors.should.have.property('imgUrl');
          res.body.errors.imgUrl.should.be.a('string');
          res.body.errors.imgUrl.should.eql('Please enter a valid image file');
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
        const item = {
          name: 'Rice and beans',
          price: '2000',
          imgUrl: 'rice-and-beans.png'
        };
        chai.request(server)
          .post('/api/v1/auth/signup')
          .send(registrationDetails)
          .end((err, res) => {
            res.should.have.status(201);
            res.body.should.have.property('token');
            chai.request(server)
              .post('/api/v1/menu')
              .send(item)
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
        const item = {
          name: 'Rice and beans',
          price: '2000',
          imgUrl: 'rice-and-beans.png'
        };
        chai.request(server)
          .post('/api/v1/auth/signup')
          .send(registrationDetails)
          .end((err, res) => {
            res.should.have.status(201);
            res.body.should.have.property('token');
            const token = `${res.body.token} 2`; // create an invalid token
            chai.request(server)
              .post('/api/v1/menu')
              .set('token', token)
              .send(item)
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
    it('should throw an error if user is not an admin', (done) => {
      const registrationDetails = {
        firstName: 'Tee',
        lastName: 'Yooo',
        email: 'extremeDiffT@test.com',
        password: 'testPassword',
        reEnterPassword: 'testPassword'
      };
      const item = {
        name: 'Rice and beans',
        price: '2000',
        imgUrl: 'rice-and-beans.png'
      };
      chai.request(server)
        .post('/api/v1/auth/signup')
        .send(registrationDetails)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.have.property('token');
          const { token } = res.body;
          chai.request(server)
            .post('/api/v1/menu')
            .send(item)
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
  });
});
