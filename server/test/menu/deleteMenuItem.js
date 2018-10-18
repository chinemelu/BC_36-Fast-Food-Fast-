import chai from 'chai';
import chaiHttp from 'chai-http';
import db from '../../models/db';
import server from '../../app';

chai.should();
chai.use(chaiHttp);

describe('DELETE: /api/v1/menu/itemId API route', () => {
  const adminInsertText = `INSERT INTO users (first_name, last_name, email, password) VALUES 
  ('test', 'admin', 'admin@food-direct.com', 'admin', '${process.env.INSERTED_ADMIN_PASSWORD}')`;

  const itemInsertText = "INSERT INTO food_items (name, price, img_url) VALUES ('Ogbonno', 2000, 'ogbonno.png')";

  beforeEach((done) => {
    db(adminInsertText, () => {
      done();
    });
  });
  beforeEach((done) => {
    db(itemInsertText, () => {
      done();
    });
  });
  afterEach((done) => {
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
            .delete('/api/v1/menu/a')
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
            .get('/api/v1/menu')
            .end((err, res) => {
              const itemId = res.body.data[0].id;
              chai.request(server)
                .delete(`/api/v1/menu/${itemId}`)
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
          const token = `${res.body.token} 2`; // create an invalid token
          chai.request(server)
            .get('/api/v1/menu')
            .end((err, res) => {
              const itemId = res.body.data[0].id;
              chai.request(server)
                .delete(`/api/v1/menu/${itemId}`)
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
