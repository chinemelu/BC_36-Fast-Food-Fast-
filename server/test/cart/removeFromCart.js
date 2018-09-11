import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../app';

chai.should();
chai.use(chaiHttp);

describe('GET: /api/v1/cart/remove/itemId API route', () => {
  describe('Bad request', () => {
    it('it should respond with an error message if id is not an integer', (done) => {
      chai.request(server)
        .get('/api/v1/cart/remove/a')
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
  describe('Item not found', () => {
    it("should respond with an error message if item doesn't exist", (done) => {
      chai.request(server)
        .get('/api/v1/cart/remove/0')
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
    it("should respond with a message if item to be removed isn't in cart", (done) => {
      chai.request(server)
        .get('/api/v1/cart/remove/55')
        .end(() => {
          chai.request(server)
            .get('/api/v1/cart/remove/51')
            .end(() => {
              chai.request(server)
                .get('/api/v1/cart/remove/52')
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
    });
  });
  describe('Successful removal of an item from the cart', () => {
    it('it should remove an item from the cart', (done) => {
      chai.request(server)
        .get('/api/v1/cart/add-to-cart/53')
        .end(() => {
          chai.request(server)
            .get('/api/v1/cart/add-to-cart/52')
            .end(() => {
              chai.request(server)
                .get('/api/v1/cart/remove/53')
                .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  res.body.should.have.property('items');
                  res.body.items.should.have.property('52');
                  res.body.items['52'].should.be.a('object');
                  res.body.items['52'].item.unitPrice.should.eql(250);
                  res.body.items['52'].item.name.should.eql('Chicken burrito');
                  done();
                });
            });
        });
    });
  });
});
