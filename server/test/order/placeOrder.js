import chai from 'chai';
import chaiHttp from 'chai-http';
import db from '../../models/db';
import server from '../../app';

chai.should();
chai.use(chaiHttp);

describe('POST: /api/v1/orders API route', () => {
  beforeEach((done) => {
    db('DELETE FROM users', () => {
      done();
    });
  });
  beforeEach((done) => {
    db('DELETE FROM orders', () => {
      done();
    });
  });
  afterEach((done) => {
    db('DELETE FROM users', () => {
      done();
    });
  });
  describe('Validation Errors', () => {
    it('should respond with an error message if address field is undefined', (done) => {
      const order = {
        phoneNumber: '08174318740'
      };
      chai.request(server)
        .post('/api/v1/orders')
        .send(order)
        .end((err, res) => {
          res.should.have.status(400);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('errors');
          res.body.errors.should.be.a('object');
          res.body.errors.should.have.property('address');
          res.body.errors.address.should.be.a('string');
          res.body.errors.address.should.eql('Address is required');
          done();
        });
    });
    it('should respond with an error message if address field is empty', (done) => {
      const order = {
        address: '',
        phoneNumber: '08174318740'
      };
      chai.request(server)
        .post('/api/v1/orders')
        .send(order)
        .end((err, res) => {
          res.should.have.status(400);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('errors');
          res.body.errors.should.be.a('object');
          res.body.errors.should.have.property('address');
          res.body.errors.address.should.be.a('string');
          res.body.errors.address.should.eql('Address is required');
          done();
        });
    });
    it('should respond with an error message if mobile number is present but contain alphabets', (done) => {
      const order = {
        address: 'House A8, Manilla Estate, 12 Adebakin street, Ketu',
        mobileNumber: '0817431874a'
      };
      chai.request(server)
        .post('/api/v1/orders')
        .send(order)
        .end((err, res) => {
          res.should.have.status(400);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('errors');
          res.body.errors.should.be.a('object');
          res.body.errors.should.have.property('mobileNumber');
          res.body.errors.mobileNumber.should.be.a('string');
          res.body.errors.mobileNumber.should.eql('Phone number must be 11 digits');
          done();
        });
    });
    it('should respond with an error message if mobile number is present but is less than 11 digits', (done) => {
      const order = {
        address: 'house A8, Manilla Estate, 12 Adebakin street, Ketu',
        mobileNumber: '0817431874'
      };
      chai.request(server)
        .post('/api/v1/orders')
        .send(order)
        .end((err, res) => {
          res.should.have.status(400);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('errors');
          res.body.errors.should.be.a('object');
          res.body.errors.should.have.property('mobileNumber');
          res.body.errors.mobileNumber.should.be.a('string');
          res.body.errors.mobileNumber.should.eql('Phone number must be 11 digits');
          done();
        });
    });
    it('should respond with an error message if mobile number is present but is more than 11 digits', (done) => {
      const order = {
        address: 'house A8, Manilla Estate, 12 Adebakin street, Ketu',
        mobileNumber: '081743187400'
      };
      chai.request(server)
        .post('/api/v1/orders')
        .send(order)
        .end((err, res) => {
          res.should.have.status(400);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('errors');
          res.body.errors.should.be.a('object');
          res.body.errors.should.have.property('mobileNumber');
          res.body.errors.mobileNumber.should.be.a('string');
          res.body.errors.mobileNumber.should.eql('Phone number must be 11 digits');
          done();
        });
    });
    it('should respond with an error message if there are no items in the cart', (done) => {
      const order = {
        address: 'House A8, Manilla Estate, 12 Adebakin street, Ketu',
        mobileNumber: '08174318740'
      };
      const registrationDetails = {
        firstName: 'test',
        lastName: 'admin',
        email: 'test@test.com',
        password: 'testPassword',
        reEnterPassword: 'testPassword'
      };
      chai.request(server)
        .post('/api/v1/auth/signup')
        .send(registrationDetails)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.have.property('token');
          const token = `${res.body.token}`;
          chai.request(server)
            .post('/api/v1/orders')
            .send(order)
            .set('token', token)
            .end((err, res) => {
              res.should.have.status(400);
              res.should.be.json;
              res.body.should.be.a('object');
              res.body.should.have.property('message');
              res.body.message.should.be.a('string');
              res.body.message.should.eql('Please add at least one item to order');
              done();
            });
        });
    });

    // describe('Post order successfully', () => {
    //   before((done) => {
    //     db('INSERT INTO items (name, price, img_url) values (eguisi, 500, eguisi.jpg)', () => {
    //       done();
    //     });
    //   });
    //   it('should post an order if there are no errors', (done) => {
    //     const order = {
    //       address: 'house A8, Manilla Estate, 12 Adebakin street, Ketu',
    //       phoneNumber: '081743187400'
    //     };
    //     chai.request(server)
    //       .post('/api/v1/auth/signup')
    //       .send(registrationDetails)
    //       .end((err, res) => {
    //         res.should.have.status(201);
    //         res.body.should.have.property('token');
    //         const { token } = res.body;
    //         chai.request(server)
    //           .post('/api/v1/entries')
    //           .set('token', token)
    //           .send(diaryEntry)
    //           .end((err, res) => {
    //             res.should.have.status(201);
    //             res.should.be.json;
    //             res.body.should.be.a('object');
    //             res.body.should.have.property('message');
    //             res.body.message.should.eql('You have successfully posted the diary entry');
    //             res.body.should.have.property('data');
    //             res.body.data.should.have.property('title');
    //             res.body.data.title.should.be.a('string');
    //             res.body.data.title.should.eql('A boy has no name');
    //             res.body.data.should.have.property('description');
    //             res.body.data.description.should.be.a('string');
    //             res.body.data.description.should.eql('Game of Thrones reference');
    //             res.body.data.should.have.property('privacy');
    //             res.body.data.privacy.should.be.a('string');
    //             res.body.data.privacy.should.eql('private');
    //             done();
    //           });
    //       });
    //   });
    // });
  });
});
