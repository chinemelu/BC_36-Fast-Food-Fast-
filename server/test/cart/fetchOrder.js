import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../app';

chai.should();
chai.use(chaiHttp);

describe('GET: /api/v1/orders/orderId API route', () => {
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
        .post('/api/v1/orders')
        .send({
          userId: 230,
          items: [{
            itemId: 54,
            name: 'Ewedu ati Amala',
            quantity: 2,
            price: 1000
          }]
        })
        .end(() => {
          chai.request(server)
            .get('/api/v1/orders/2')
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('id');
              res.body.should.have.property('status');
              res.body.should.have.property('total');
              res.body.should.have.property('userId');
              res.body.should.have.property('items');
              res.body.id.should.eql(2);
              res.body.status.should.eql('pending');
              res.body.total.should.eql(2000);
              res.body.userId.should.eql(230);
              res.body.items[0].itemId.should.eql(54);
              res.body.items[0].name.should.eql('Ewedu ati Amala');
              res.body.items[0].price.should.eql(1000);
              res.body.items[0].quantity.should.eql(2);
              done();
            });
        });
    });
  });
});
