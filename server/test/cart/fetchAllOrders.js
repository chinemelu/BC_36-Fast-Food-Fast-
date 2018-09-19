import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../app';

chai.should();
chai.use(chaiHttp);

describe('GET: /api/v1/orders', () => {
  describe('Successful request', () => {
    it('it should indicate if there are no orders in the database', (done) => {
      chai.request(server)
        .get('/api/v1/orders')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.message.should.be.a('string');
          res.body.message.should.eql('There are no available food orders');
          done();
        });
    });
    it('it should fetch all food orders if database has orders', (done) => {
      chai.request(server)
        .post('/api/v1/orders')
        .send({
          userId: 20,
          items: [{
            itemId: 51,
            name: 'burrito',
            quantity: 24,
            price: 700
          }, {
            itemId: 52,
            name: 'Meat Pie',
            quantity: 2,
            price: 200
          }, {
            itemId: 53,
            name: 'Truffles',
            quantity: 1,
            price: 200
          }]
        })
        .end(() => {
          chai.request(server)
            .get('/api/v1/orders')
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('array');
              res.body[0].should.have.property('id');
              res.body[0].should.have.property('status');
              res.body[0].should.have.property('total');
              res.body[0].should.have.property('userId');
              res.body[0].should.have.property('items');
              res.body[0].id.should.eql(1);
              res.body[0].total.should.eql(17400);
              res.body[0].status.should.eql('pending');
              res.body[0].items[0].itemId.should.eql(51);
              res.body[0].items[0].name.should.eql('burrito');
              res.body[0].items[0].price.should.eql(700);
              res.body[0].items[0].quantity.should.eql(24);
              res.body[0].items[1].itemId.should.eql(52);
              res.body[0].items[1].name.should.eql('Meat Pie');
              res.body[0].items[1].price.should.eql(200);
              res.body[0].items[1].quantity.should.eql(2);
              res.body[0].items[2].itemId.should.eql(53);
              res.body[0].items[2].name.should.eql('Truffles');
              res.body[0].items[2].price.should.eql(200);
              res.body[0].items[2].quantity.should.eql(1);
              done();
            });
        });
    });
  });
});
