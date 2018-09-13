import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../app';

chai.should();
chai.use(chaiHttp);

describe('PUT: /api/v1/cart/update-quantity/itemId API route', () => {
  describe('Bad request', () => {
    it('it should respond with an error message if id is not an integer', (done) => {
      chai.request(server)
        .put('/api/v1/cart/update-quantity/a')
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('errors');
          res.body.errors.should.be.a('Object');
          res.body.errors.should.have.property('id');
          res.body.errors.id.should.be.a('string');
          res.body.errors.id.should.eql('Invalid Id');
          done();
        });
    });
    it('should respond with an error message if quantity is undefined', (done) => {
      chai.request(server)
        .put('/api/v1/cart/update-quantity/52')
        .send({
          
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.message.should.be.a('string');
          res.body.message.should.eql('Quantity is required');
          done();
        });
    });
    it('should respond with an error message if quantity field is empty', (done) => {
      chai.request(server)
        .put('/api/v1/cart/update-quantity/52')
        .send({
          quantity: ''
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.message.should.be.a('string');
          res.body.message.should.eql('Quantity is required');
          done();
        });
    });
    it("should respond with an error message if quantity isn't an integer", (done) => {
      chai.request(server)
        .put('/api/v1/cart/update-quantity/52')
        .send({
          quantity: '10a'
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.message.should.be.a('string');
          res.body.message.should.eql('Quantity must be an integer');
          done();
        });
    });
  });
  describe('Item not found', () => {
    it("should respond with an error message if item doesn't exist", (done) => {
      chai.request(server)
        .put('/api/v1/cart/update-quantity/0')
        .end((err, res) => {
          res.should.have.status(404);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.message.should.be.a('string');
          res.body.message.should.eql('Item not found');
          done();
        });
    });
    it("should respond with a message if item to be updated isn't in cart", (done) => {
      chai.request(server)
        .put('/api/v1/cart/update-quantity/55')
        .end((err, res) => {
          res.should.have.status(404);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.message.should.be.a('string');
          res.body.message.should.eql('Item not in cart');
          done();
        });
    });
  });

  describe('Successful request', () => {
    it('it should update the item quantity in the cart if there are no errors', (done) => {
      chai.request(server)
        .put('/api/v1/cart/update-quantity/52')
        .send({
          quantity: 100
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('total');
          res.body.should.have.property('items');
          res.body.items.should.have.property('52')
          res.body.items['52'].should.be.a('object');
          res.body.items['52'].item.id.should.eql(52);
          res.body.items['52'].item.name.should.eql('Chicken burrito');
          res.body.items['52'].item.unitPrice.should.eql(250);
          res.body.items['52'].quantity.should.eql(100);
          done();
        });
    });
  });
});
