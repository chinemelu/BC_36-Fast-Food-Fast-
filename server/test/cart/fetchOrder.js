import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../app';

chai.should();
chai.use(chaiHttp);

describe('GET: /api/v1/orders/itemId API route', () => {
  describe('Bad request', () => {
    it('it should respond with an error message if id is not an integer', (done) => {
      chai.request(server)
        .get('/api/v1/orders/a')
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
  });
  describe('Order not found', () => {
    it("should respond with an error message if order doesn't exist", (done) => {
      chai.request(server)
        .get('/api/v1/orders/0')
        .end((err, res) => {
          res.should.have.status(404);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.message.should.be.a('string');
          res.body.message.should.eql('Order not found');
          done();
        });
    });
  });
  describe('Successful request', () => {
    it('it should fetch a food order if there are no errors', (done) => {
      chai.request(server)
        .get('/api/v1/orders/1')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('id');
          res.body.should.have.property('status');
          res.body.should.have.property('cart');
          res.body.id.should.eql(1);
          res.body.status.should.eql('pending');
          res.body.cart[0].item.id.should.eql(51);
          res.body.cart[0].item.name.should.eql('Spaghetti');
          res.body.cart[0].item.unitPrice.should.eql(650);
          res.body.cart[0].quantity.should.eql(2);
          res.body.cart[1].item.id.should.eql(52);
          res.body.cart[1].item.name.should.eql('Chicken burrito');
          res.body.cart[1].item.unitPrice.should.eql(250);
          res.body.cart[2].item.id.should.eql(53);
          res.body.cart[2].item.name.should.eql('Coke');
          res.body.cart[2].item.unitPrice.should.eql(100);
          done();
        });
    });
  });
});
