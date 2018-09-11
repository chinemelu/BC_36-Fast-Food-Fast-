import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../app';

chai.should();
chai.use(chaiHttp);

describe('POST: /api/v1/orders API route', () => {
  describe('Bad request', () => {
    it('it should respond with an error message if there are no items in the cart', (done) => {
      chai.request(server)
        .get('/api/v1/cart/remove/51')
        .end(() => {
          chai.request(server)
            .get('/api/v1/cart/remove/52')
            .end(() => {
              chai.request(server)
                .get('/api/v1/cart/remove/53')
                .end(() => {
                  chai.request(server)
                    .post('/api/v1/orders')
                    .end((err, res) => {
                      res.should.have.status(400);
                      res.body.should.be.a('object');
                      res.body.should.have.property('message');
                      res.body.message.should.be.a('string');
                      res.body.message.should.eql('There are no items in the shopping cart');
                      done();
                    });
                });
            });
        });
    });
});
  describe('A successful order', () => {
    it('it should order if there are no errors', (done) => {
      chai.request(server)
        .get('/api/v1/cart/add-to-cart/51')
        .end(() => {
          chai.request(server)
            .get('/api/v1/cart/add-to-cart/55')
            .end(() => {
              chai.request(server)
                .post('/api/v1/orders')
                .end((err, res) => {
                  res.should.have.status(201);
                  res.body.should.be.a('object');
                  res.body.should.have.property('message');
                  res.body.message.should.be.a('string');
                  res.body.message.should.eql('You have successfully ordered the item(s)');
                  res.body.should.have.property('newOrder');
                  res.body.newOrder.should.have.property('status');
                  res.body.newOrder.status.should.be.a('string');
                  res.body.newOrder.status.should.eql('pending');
                  res.body.newOrder.should.have.property('cart');
                  res.body.newOrder.cart.should.be.a('array');
                  res.body.newOrder.cart[0].item.id.should.eql(51);
                  res.body.newOrder.cart[0].item.name.should.eql('Spaghetti');
                  res.body.newOrder.cart[0].item.unitPrice.should.eql(650);
                  res.body.newOrder.cart[1].item.id.should.eql(55);
                  res.body.newOrder.cart[1].item.name.should.eql('Pancake');
                  res.body.newOrder.cart[1].item.unitPrice.should.eql(350);
                  done();
                });
            });
        });
    });
  });
});
